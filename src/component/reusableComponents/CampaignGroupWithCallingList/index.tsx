import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import '../FolderReusable/campaignGroup.scss';
import { TCfgCampaignGroup, TCallingLists } from '../../../api/ts/interfaces/FindFolders.response';
import { CampaignInfoComponent } from '../../../component/CampaignInfoComponent';
import { ICampaignGroupReusable } from '../CampaignGroupReusable';
import Utils from '../../../helper/utils';
import {
  getSavedProperties,
  getSelectedCampaignGroupProperties,
  getCampaignsFilterByStatus,
  getCampaignsToggle,
  getAllStatusSelector,
  getTotalCampaignsCount,
} from '../../../redux/selectors/campaignSelectors';
import { useAppDispatch } from '../../../redux/hooks';
import {
  setCampaignsStatusesSingle,
  selectCampaignGroup,
  setSelectedCampaignStatus,
  saveCampaignConfig,
  setCampaignsStatuses,
} from '../../../redux/actions/campaignActions';
import { CampaignStatuses, CampaignStatusesMapReverse } from '../../../api/ts/constants/codes';
import StatusBar from '../../StatusBar';
import { webSocketManager } from 'src/utils/webSocketNotify';
import { ICampaignStatus } from 'src/api/ts/interfaces/Campaigns.response';
import Accordion from 'src/component/Accordion';
import { ToolTip } from '../ToolTip';
import { getOCSSelector } from 'src/redux/selectors/loginSelector';
import restApi from 'src/api/rest';
import { useToast } from 'src/component/ToastProvider';
import { NotificationsError, ConnectionStatusNotification } from 'src/interfaces/webSocketsNotifyTypes';

interface ICampaignGroupWithCallingList {
  tableInfo: ICampaignGroupReusable['tableInfo'];
  campaign: TCfgCampaignGroup;
  callingList: any;
  parentMargin?: number;
  isSearch?: boolean;
}

export const CampaignGroupWithCallingList = (campaignData: ICampaignGroupWithCallingList) => {
  const dispatch = useAppDispatch();
  const { addToast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const { campaign, parentMargin = 0, callingList, isSearch } = campaignData;
  const [localCallingLists, setCallingLists] = useState<any>(callingList);
  const [currentCampaign, setCurrentCampaign] = useState<TCfgCampaignGroup>();
  const [selected, setSelected] = useState(false);
  const [scheduleName, setSchedule] = useState('');
  const ocs = useSelector(getOCSSelector);
  const [statusBarIsDisabled, setDisabled] = useState(false);
  const filter = useSelector(getCampaignsFilterByStatus);

  const toggle = useSelector(getCampaignsToggle);
  const savedConfigs = useSelector(getSavedProperties);
  const allStatuses = useSelector(getAllStatusSelector);
  const disabled = campaign.state === 2;

  const [status, setStatus] = useState<ICampaignStatus>({
    campaignId: 0,
    campaignStatus: CampaignStatuses.NotLoaded,
    groupId: 0,
  });

  const data: any = {
    $class: currentCampaign?.$class || campaign.$class,
    id: currentCampaign?.id || campaign.id,
    dialMode: currentCampaign?.dialMode || campaign.dialMode,
    groupId: campaign.groupId,
    campaignId: campaign.campaignId,
    ivrProfile: campaign.ivrProfile,
    maxQueueSize: campaign.maxQueueSize,
    optMethod: currentCampaign?.optMethod || campaign.optMethod,
    schedule: campaign.schedule,
    statServer: campaign.statServer,
    target: currentCampaign?.target || campaign.target,
    trunkGroup: campaign.trunkGroup,
    voiceTransferDestination: campaign.voiceTransferDestination,
    interactionQueue: campaign.interactionQueue,
  };

  const ml = `${parentMargin}px`;
  const selectedCampaignGroup = useSelector(getSelectedCampaignGroupProperties);

  useEffect(() => {
    if (disabled || toggle.collapse || !toggle.expand) return;
    setIsExpanded(toggle.expand);
    if (isSearch) {
      restApi.getCampaign({ parentId: 0, id: campaign.campaignId, limit: 25 }).then(data => {
        setCallingLists(data.data[0].callingLists);
      });
    }
  }, [toggle, campaign]);

  useEffect(() => {
    if (disabled) return;
    setSelected(false);
    if (isSearch) {
      restApi.getCampaign({ parentId: 0, id: campaign.campaignId, limit: 25 }).then(data => {
        setCallingLists(data.data[0].callingLists);
      });
    }
  }, [campaign]);

  // useEffect(() => {
  //   console.log('useEffect');
  //   const notAvailable = webSocketManager.getOcsIsAvailable(ocs.ocsId) !== 'AVAILABLE';
  //   setDisabled(notAvailable);
  //   if (!notAvailable) {
  //     webSocketManager.subscribeCampaign(data, ocs.ocsId, onUpdateCallBack);
  //   }
  // }, [webSocketManager.getOcsIsAvailable(ocs.ocsId)]);

  const onUpdateCallBack = (
    updatedCampaign: any,
    status: any,
    error: NotificationsError,
    connectionStatus: ConnectionStatusNotification,
  ) => {
    if (connectionStatus.data.status === 'AVAILABLE') {
      webSocketManager.subscribeCampaign(data, ocs.ocsId, onUpdateCallBack);
      setDisabled(false);
    } else if (connectionStatus.data.status === 'UNAVAILABLE' || error?.name.includes('error')) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }

    if (error?.name.includes('error')) {
      addToast(error.name, error.data.message, 400);
      return;
    }
    if (status.campaignStatus === 'NotLoaded' && isSelectedCampaign(updatedCampaign, data)) {
      const unloadedCampaign = updatedCampaign.dialMode === 'NoDialMode';
      dispatch(
        saveCampaignConfig({
          ...updatedCampaign,
          dialMode: unloadedCampaign || !updatedCampaign.dialMode ? data.dialMode : updatedCampaign.dialMode,
          optMethod: unloadedCampaign || !updatedCampaign.optMethod ? data.optMethod : updatedCampaign.optMethod,
          optMethodValue:
            unloadedCampaign || !updatedCampaign.optMethodValue ? data.target : updatedCampaign.optMethodValue,
        }),
      );
    }
    if (updatedCampaign.dialMode !== 'NoDialMode' && isSelectedCampaign(updatedCampaign, data)) {
      setCurrentCampaign(updatedCampaign);
      if (updatedCampaign.dialMode) {
        dispatch(saveCampaignConfig(updatedCampaign));
      }
    }
    if (updatedCampaign.groupId === campaign.groupId && updatedCampaign.campaignId === campaign.campaignId) {
      setStatus(status);
    }
    if (isSelectedCampaign(updatedCampaign, selectedCampaignGroup)) {
      dispatch(setSelectedCampaignStatus(status.campaignStatus));
    }
    if (isSelectedCampaign(updatedCampaign, data)) {
      setSchedule(prevState => {
        return updatedCampaign.scheduleName;
      });
    }

    dispatch(
      setCampaignsStatuses({
        campaignId: updatedCampaign.campaignId,
        groupId: updatedCampaign.groupId,
        campaignStatus: status.campaignStatus,
      }),
    );
  };

  useEffect(() => {
    if (selected) {
      dispatch(setSelectedCampaignStatus(status.campaignStatus));
      if (status.campaignStatus === 'NotLoaded') {
        dispatch(selectCampaignGroup(campaign));
      }
    }
  }, [selected, status]);

  useEffect(() => {
    setSelected(
      selectedCampaignGroup?.groupId === data.groupId && selectedCampaignGroup?.campaignId === data.campaignId,
    );
  }, [selectedCampaignGroup]);
  useEffect(() => {
    if (ocs.ocsId === 0) {
      return;
    }
    webSocketManager.subscribeCampaign(data, ocs.ocsId, onUpdateCallBack);
  }, [ocs]);

  useEffect(() => {
    dispatch(
      setCampaignsStatusesSingle({
        groupId: data.groupId,
        campaignId: data.campaignId,
        campaignStatus: CampaignStatuses.NotLoaded,
      }),
    );
  }, []);

  const guxAccordionSectionRef = useRef(null);
  const savedConfig = savedConfigs.find(x => x.campaignId === data.campaignId && x.groupId === data.groupId);

  const mergedData = {
    ...savedConfig,
    ...data,
    schedule: scheduleName,
    target: savedConfig ? savedConfig.optMethodValue : data.target,
    optMethod: savedConfig ? savedConfig.optMethod : data.optMethod,
    dialMode: savedConfig ? savedConfig.dialMode : data.dialMode,
  };

  const setSelectedCampaignGroup = () => {
    if (!selected) {
      dispatch(selectCampaignGroup(data));
      dispatch(setSelectedCampaignStatus(status.campaignStatus));
      setSelected(isSelectedCampaign(selectedCampaignGroup, campaign));
    }
  };

  const isSelectedCampaign = (currentCampaign: any, selectedCampaign: any) => {
    return (
      currentCampaign?.campaignId === selectedCampaign?.campaignId &&
      currentCampaign?.groupId === selectedCampaign?.groupId
    );
  };

  const currentStatus = allStatuses.find(x => x.campaignId === campaign.campaignId && x.groupId === campaign.groupId);
  if (
    filter !== 'Any Status' &&
    CampaignStatusesMapReverse[filter as keyof typeof CampaignStatusesMapReverse] !==
      allStatuses
        .find(x => x.campaignId === campaign.campaignId && x.groupId === campaign.groupId)
        ?.campaignStatus.toString()
  ) {
    return <></>;
  }
  const classNames = ['headerContainer'];
  return (
    <Accordion
      disabled={disabled}
      selected={isSelectedCampaign(selectedCampaignGroup, campaign)}
      ml={ml}
      onClickCallBack={() => {
        if (disabled) return;
        setIsExpanded(!isExpanded);
        if (isSearch && !isExpanded) {
          restApi.getCampaign({ parentId: 0, id: campaign.campaignId, limit: 25 }).then(data => {
            setCallingLists(data.data[0].callingLists);
          });
        }
      }}
      title={
        <h6
          style={{
            marginTop: '5px',
            marginBottom: '5px',
          }}
          slot="header"
          className={classNames.join(' ')}
          ref={guxAccordionSectionRef}
          onClick={e => {
            if (disabled) return;
            setSelectedCampaignGroup();
          }}
        >
          <table id={'parametrsTable'}>
            <tbody>
              <tr
                // style={{
                //   backgroundColor: `${isSelectedCampaign(selectedCampaignGroup, campaign) ? 'lightgray' : '#f6f7f9'}`,
                // }}
                className={disabled ? 'disabled' : ''}
              >
                <td style={{ padding: 0, paddingLeft: '0px' }}>
                  {
                    <div className="textContainer scroll-container" style={{ marginLeft: ml }}>
                      <span slot="content" className={`textIcon ${Utils.getIcon(campaign.$class)}`}></span>
                      <span className="label ">{campaign.name}</span>
                    </div>
                  }
                </td>
                <td>
                  <StatusBar
                    status={currentStatus || status}
                    data={savedConfig ? mergedData : data}
                    instantDisable={disabled || statusBarIsDisabled}
                  />
                </td>
                <CampaignInfoComponent tableData={savedConfig ? mergedData : { ...data, schedule: scheduleName }} />
              </tr>
            </tbody>
          </table>
        </h6>
      }
    >
      <div slot="content">
        {localCallingLists?.map((item: TCallingLists, index: number) => (
          <table className="callingListTable" key={index}>
            <tbody>
              <tr>
                <td
                  className={campaign.state === 2 ? 'largeCell disabled' : 'largeCell'}
                  style={{ padding: 0, borderTop: 'none' }}
                >
                  <div className="callingListItemContainer">
                    <span
                      slot="content"
                      className={`textIcon ${Utils.getIcon(item.$class)}`}
                      style={{ marginLeft: `calc(${ml} + 40px)` }}
                    />{' '}
                    <div className="label">{item.name}</div>
                  </div>
                </td>
                <td style={{ padding: 0, borderTop: 'none' }} className="smallCell">
                  <div className="tdContainer">
                    <ToolTip label={'Calling list weight in campaign'} styles={{ width: 'fit-content' }}>
                      <div className="label-container">
                        <span className={'list-tag'}>{item.weight}</span>
                      </div>
                    </ToolTip>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </Accordion>
  );
};
