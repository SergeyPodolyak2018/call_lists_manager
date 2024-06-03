import React, { useEffect, useState } from 'react';
import styles from './tableMediator.module.scss';
import { CampaignStatusesMap, CampaignStatusesMapReverse } from 'src/api/ts/constants/codes';
import IconButton from '../IconButton';
import { useTranslation } from 'react-i18next';
import CustomDropdown from '../CustomDropDown';
import { DropDownTypes, IOption } from 'src/interfaces/dropDown';
import restApi from 'src/api/rest';
import SerchTrottled from '../TrotteledSearchField';
import { useAppDispatch } from 'src/redux/hooks';
import { useSelector } from 'react-redux';
import ContactServerName from '../contactServerName';
import {
  searchCampaignsObjects,
  setCampaignsSearchAction,
  setTotalCampaignsCount,
  setCampaingsToggle,
  setStatusFilterBy,
  setCampaignsStatuses,
} from 'src/redux/actions/campaignActions';

import {
  getTotalCampaignsCount,
  getCampaignsToggle,
  getCampaignsFilterByStatus,
  getAllStatusSelector,
  getFoundCampaignGroups,
} from 'src/redux/selectors/campaignSelectors';

import { getOCSSelector, getUserDataSelector } from 'src/redux/selectors/loginSelector';
import { webSocketManager } from 'src/utils/webSocketNotify';

const TableMediator = () => {
  const { t } = useTranslation();
  const [isInitialized, setInitialized] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [campaignsCount, setCampaignsCount] = useState(0);
  const [totalCampaignsCount, setTotalCampaigns] = useState(0);
  const dispatch = useAppDispatch();
  const toggle = useSelector(getCampaignsToggle);
  const filterCampaignsCount = useSelector(getTotalCampaignsCount);
  const campaignsToggle = useSelector(getCampaignsToggle);
  const campaignsFilter = useSelector(getCampaignsFilterByStatus);
  const [dropDownVal, setDropDownVal] = useState(campaignsFilter);
  const allStatuses = useSelector(getAllStatusSelector);
  const ocs = useSelector(getOCSSelector);
  const userInfo = useSelector(getUserDataSelector);

  useEffect(() => {
    if (campaignsFilter !== 'Any Status') {
      dispatch(
        setTotalCampaignsCount(
          allStatuses.filter(
            item =>
              CampaignStatusesMapReverse[campaignsFilter as keyof typeof CampaignStatusesMapReverse] ===
              item.campaignStatus.toString(),
          ).length,
        ),
      );
    } else {
      restApi.getCampaignsCount().then(data => {
        setCampaignsCount(data.data);
        setTotalCampaigns(data.data);
        dispatch(setTotalCampaignsCount(data.data));
      });
    }
  }, []);

  useEffect(() => {
    if (dropDownVal === 'Any Status') return;
    dispatch(
      setTotalCampaignsCount(
        allStatuses.filter(
          item =>
            CampaignStatusesMapReverse[dropDownVal as keyof typeof CampaignStatusesMapReverse] ===
            item.campaignStatus.toString(),
        ).length,
      ),
    );
  }, [allStatuses]);
  useEffect(() => {
    setCampaignsCount(filterCampaignsCount);
  }, [filterCampaignsCount]);

  const startSearch = (val: string) => {
    if (val.length !== 0) {
      setSearchValue(val);
      dispatch(searchCampaignsObjects({ name: val }));
    } else {
      setSearchValue(val);
      dispatch(setTotalCampaignsCount(totalCampaignsCount));
      if (campaignsFilter !== 'Any Status') {
        dispatch(searchCampaignsObjects({}));
        dispatch(
          setTotalCampaignsCount(
            allStatuses.filter(
              item =>
                CampaignStatusesMapReverse[campaignsFilter as keyof typeof CampaignStatusesMapReverse] ===
                item.campaignStatus?.toString(),
            ).length,
          ),
        );
      } else {
        dispatch(setCampaignsSearchAction({ campaigns: [], isSearching: false }));
      }
    }
  };

  const callback = (updatedCampaign: any, status: any) => {
    dispatch(
      setCampaignsStatuses({
        campaignId: updatedCampaign.campaignId,
        groupId: updatedCampaign.groupId,
        campaignStatus: status.campaignStatus,
      }),
    );
  };
  const dropDownChangeHandler = (e: any) => {
    if (!isInitialized) {
      setInitialized(true);
      restApi.getCampaignGroups({}).then(data => {
        data.data.forEach(x => {
          webSocketManager.subscribeCampaign(x, ocs.ocsId, callback);
        });
      });
    }
    setDropDownVal(e);
    dispatch(setStatusFilterBy(e));
    if (searchValue !== '') {
      dispatch(searchCampaignsObjects({ name: searchValue }));
    } else {
      dispatch(searchCampaignsObjects({}));
    }

    if (e !== 'Any Status') {
      dispatch(
        setTotalCampaignsCount(
          allStatuses.filter(
            item =>
              CampaignStatusesMapReverse[e as keyof typeof CampaignStatusesMapReverse] ===
              item.campaignStatus.toString(),
          ).length,
        ),
      );
      // dispatch(
      //   setCampaingsToggle({
      //     collapse: false,
      //     expand: true,
      //   }),
      // );
    } else {
      dispatch(setTotalCampaignsCount(allStatuses.length));
      dispatch(setCampaignsSearchAction({ campaigns: [], isSearching: searchValue !== '' }));
    }
  };
  const expanse: any = function (e: any, type: 'expand' | 'collapse') {
    if (type === 'expand' && campaignsToggle.expand) {
      return;
    }
    dispatch(
      setCampaingsToggle({
        collapse: !toggle.collapse ? type === 'collapse' : false,
        expand: !toggle.expand ? type === 'expand' : false,
      }),
    );
  };

  const types: IOption[] = Object.values(CampaignStatusesMap)
    .filter((statusValue: string) => statusValue !== 'Unloading' && statusValue !== 'In Active')
    .map((statusValue: string) => ({
      optionLabel: statusValue,
      optionKey: statusValue,
    }));
  types.unshift({ optionLabel: 'Any Status', optionKey: 'Any Status' });

  return (
    <div className={styles.container}>
      <div className={styles.container_subContainer}>
        <span className={styles.container_totalCampaignsLabel}>
          Total Campaign Groups: {totalCampaignsCount}, in filter {campaignsCount}
        </span>
        <div className={styles.container_buttonsContainer}>
          {['expand', 'collapse'].map((actionType: any, index) => (
            <div key={index}>
              <IconButton
                name={t(actionType)}
                key={actionType}
                style={{ width: 'initial' }}
                click={event => {
                  expanse(event, actionType);
                }}
                type={actionType}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.container_selectServerContainer}>
        <ContactServerName list={[userInfo.serverName]} />
      </div>
      <div className={styles.container_target}>
        <CustomDropdown
          disabled={ocs.ocsId === 0}
          type={DropDownTypes.OTHER}
          onSelectAction={dropDownChangeHandler}
          placeholder={'Select a type'}
          value={dropDownVal}
          options={types}
        />
      </div>
      <div className={styles.container_search}>
        <SerchTrottled height={32} width={350} callback={startSearch} isCaseSensetive={true} />
      </div>
    </div>
  );
};

export default TableMediator;
