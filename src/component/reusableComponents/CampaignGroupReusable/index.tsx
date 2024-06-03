import { useRef, useEffect, useState } from 'react';

import '../FolderReusable/campaignGroup.scss';
import { ITableInfo } from '../../../interfaces/tables';

import {
  TFindFoldersResponseStandartPart,
  TCfgCampaignGroup,
  TCfgCampaign,
  EClass,
} from '../../../api/ts/interfaces/FindFolders.response';
import TypeCheckerMagazin from '../../../utils/typeChecker';
import { CampaignGroupWithCallingList } from '../CampaignGroupWithCallingList';
import { FolderReusable } from '../FolderReusable';
import Utils from '../../../helper/utils';
import { selectCampaignGroup, getPartCampaingsAction } from 'src/redux/actions/campaignActions';
import { useAppDispatch } from 'src/redux/hooks';
import { useSelector } from 'react-redux';
import { getCampaignsToggle } from 'src/redux/selectors/campaignSelectors';
import Accordion from 'src/component/Accordion';

export interface ICampaignGroupReusable {
  tableInfo: ITableInfo;
  data: TFindFoldersResponseStandartPart;
  parentMargin?: number;
}

export const CampaignGroupReusable = (campaignData: ICampaignGroupReusable) => {
  const { data, tableInfo, parentMargin = 0 } = campaignData;
  const [isExpanded, setIsExpanded] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [campaignGroup, setCampaingGroup] = useState<TCfgCampaignGroup>();
  const toggle = useSelector(getCampaignsToggle);
  const disabled = data.$class !== EClass.FOLDER && data.state === 2;

  useEffect(() => {
    if (disabled || data.items.length) return;
    if (toggle.expand) {
      setIsExpanded(toggle.expand);
      getData();
    }
  }, [toggle]);

  const dispatch = useAppDispatch();

  const classNames = ['headerContainer'];

  if (parentMargin > 0) {
    classNames.push('with-margin');
  }

  const setSelectedCampaignGroup = () => {
    if (campaignGroup) {
      dispatch(selectCampaignGroup(campaignGroup));
    }
  };

  const getData = () => {
    if (data.items.length !== 0) return;
    if (TypeCheckerMagazin.isCampaign(data)) {
      dispatch(getPartCampaingsAction(false, 38, { limit: 25, ownerId: data.id }, data.id));
      dispatch(getPartCampaingsAction(false, 38, { limit: 25, ownerId: data.id }, data.id, true));
    }
  };

  return (
    <Accordion
      disabled={disabled}
      ml={`${parentMargin}px`}
      onClickCallBack={() => {
        setIsExpanded(!isExpanded);
        !isExpanded && getData();
        setSelectedCampaignGroup();
      }}
      title={
        <h6
          slot="header"
          ref={elementRef}
          className={classNames.join(' scroll-container ') + (disabled ? ' disabled' : '')}
          style={{
            marginTop: '5px',
            marginBottom: '5px',
            marginLeft: `${parentMargin}px`,
            padding: 0,
          }}
          // onClick={e => {
          //   setIsExpanded(!isExpanded);
          //   !isExpanded && getData();
          //   setSelectedCampaignGroup();
          // }}
        >
          {/* <span className={`icon-arrow-accordion custom-arrow ${isExpanded ? 'rotate-up' : 'rotate-down'}`}></span> */}

          <span slot="icon" className={`textIcon ${Utils.getIcon(data.$class)}`}></span>
          <span className="label">{data.name}</span>
        </h6>
      }
    >
      <div slot="content" style={{ backgroundColor: '#f6f7f9' }}>
        {data.items?.map((el, index) => {
          if (TypeCheckerMagazin.isCampaign(el)) {
            return (
              <CampaignGroupReusable key={index} tableInfo={tableInfo} data={el} parentMargin={parentMargin + 15} />
            );
          }
          if (TypeCheckerMagazin.isCampaignGroup(el)) {
            const elInt = el as never as TCfgCampaignGroup;
            const campaignData = data as never as TCfgCampaign;
            return (
              <div key={index}>
                {campaignData.callingLists && campaignData.callingLists?.length !== 0 && (
                  <CampaignGroupWithCallingList
                    tableInfo={tableInfo}
                    campaign={elInt}
                    callingList={campaignData.callingLists}
                    parentMargin={parentMargin + 15}
                  />
                )}
              </div>
            );
          }
          if (TypeCheckerMagazin.isCampaignFolder(el)) {
            const campaignData = data as never as TCfgCampaign;
            return (
              <FolderReusable
                callingList={campaignData.callingLists}
                data={el}
                key={index}
                tableInfo={tableInfo}
                parentMargin={parentMargin + 15}
              />
            );
          }
        })}
      </div>
    </Accordion>
  );
};
