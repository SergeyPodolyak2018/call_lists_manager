import { useRef, useState, useEffect } from 'react';
import './campaignGroup.scss';
import { ITableInfo } from '../../../interfaces/tables';
import { TCfgCampaignFolder, TCfgFolder, EClass } from '../../../api/ts/interfaces/FindFolders.response';
import { CampaignGroupReusable } from '../CampaignGroupReusable';
import Utils from '../../../helper/utils';
import { useAppDispatch } from '../../../redux/hooks';
import { getPartCampaingsAction } from '../../../redux/actions/campaignActions';
import TypeCheckerMagasin from '../../../utils/typeChecker';
import { CampaignGroupWithCallingList } from '../CampaignGroupWithCallingList';
import { TCallingListsObjectsResponse } from 'src/api/ts/interfaces/CallingLists.response';
import { CallingListReusable } from '../CallingListReusable';
import { useSelector } from 'react-redux';
import { getCampaignsToggle, getDataSelector } from 'src/redux/selectors/campaignSelectors';
import Accordion from 'src/component/Accordion';

export interface IFolder {
  data: TCfgFolder | TCallingListsObjectsResponse | TCfgCampaignFolder;
  parentMargin: number;
  tableInfo: ITableInfo;
  callingList: any;
}

export const FolderReusable = (campaignData: IFolder) => {
  const { data, parentMargin, tableInfo, callingList } = campaignData;
  const [isExpanded, setIsExpanded] = useState(false);
  const toggle = useSelector(getCampaignsToggle);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const disabled = data.$class === EClass.FOLDER && data.state === 2;

  const classNames = ['headerContainer'];

  if (parentMargin > 0) {
    classNames.push('with-margin');
  }

  const getData = () => {
    if (data?.items.length !== 0) return;
    if (TypeCheckerMagasin.isCampaignFolder(data)) {
      dispatch(getPartCampaingsAction(false, 22, { limit: 25, parentId: data.id }));
      dispatch(getPartCampaingsAction(false, 27, { limit: 25, parentId: data.id }));
      dispatch(getPartCampaingsAction(false, 27, { limit: 25, parentId: data.id }, data.id, true));
    }
  };

  useEffect(() => {
    if (disabled) return;
    if (toggle.expand) {
      setIsExpanded(true);
      if (!data?.items?.length) {
        getData();
      }
    } else {
      setIsExpanded(false);
    }
  }, [toggle.expand]);

  return (
    <Accordion
      disabled={disabled}
      ml={`${parentMargin}px`}
      onClickCallBack={() => {
        if (disabled) return;
        setIsExpanded(!isExpanded);
        !isExpanded && getData();
      }}
      title={
        <h6
          ref={elementRef}
          className={classNames.join(' ') + (disabled ? ' disabled' : '')}
          style={{ marginTop: '5px', marginBottom: '5px', marginLeft: `${parentMargin}px`, padding: '0 !important' }}
          // onClick={e => {
          //   if (disabled) return;
          //   setIsExpanded(!isExpanded);
          //   !isExpanded && getData();
          // }}
        >
          {/* <span className={`icon-arrow-accordion custom-arrow ${isExpanded ? 'rotate-up' : 'rotate-down'}`}></span> */}

          <span slot="icon" className={`textIcon ${Utils.getIcon(data.$class)}`}></span>
          <span className="label">{data.name}</span>
        </h6>
      }
    >
      <div slot="content">
        {data?.items
          ? data?.items.map((el, index) =>
              TypeCheckerMagasin.isCampaign(el) ? (
                <CampaignGroupReusable key={index} tableInfo={tableInfo} data={el} parentMargin={parentMargin + 15} />
              ) : TypeCheckerMagasin.isCampaignGroup(el) ? (
                <CampaignGroupWithCallingList
                  key={index}
                  tableInfo={tableInfo}
                  campaign={el}
                  callingList={callingList}
                  parentMargin={parentMargin + 15}
                />
              ) : TypeCheckerMagasin.isCallingList(el) ? (
                <CallingListReusable key={index} data={el} parentMargin={parentMargin + 15} tableInfo={tableInfo} />
              ) : (
                <FolderReusable
                  callingList={callingList}
                  key={index}
                  data={el}
                  parentMargin={parentMargin + 15}
                  tableInfo={tableInfo}
                />
              ),
            )
          : ''}
      </div>
    </Accordion>
  );
};
