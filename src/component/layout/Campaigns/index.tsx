import React, { useEffect, useState } from 'react';
import styles from './campaigns.module.scss';
import { useSelector } from 'react-redux';
import { TableType } from '../../../constants/tablesTypes';
import { getTableInfoByType } from 'src/utils/tablesInfoManager';
import { getTable, ITableProps } from '../../TableGenerator';
import Spinner from '@genesys/arkui-react/dist/components/Progress/LoadingSpinner';
import { useAppDispatch } from '../../../redux/hooks';
import {
  getFoundCampaignGroups,
  getDataSelector,
  isLoadingSelector,
  getTotalCampaignsCount,
} from '../../../redux/selectors/campaignSelectors';
import { getPartCampaingsAction } from '../../../redux/actions/campaignActions';
import TableMediator from '../../reusableComponents/tableMediator';

import ResizableContainer from 'src/component/reusableComponents/ResizableContainer';
import { CampaignGroupProperties } from 'src/component/CampaignGroupProperties';

import { isAutorizedSelector } from 'src/redux/selectors/loginSelector';

const Campaigns = () => {
  const tableInfo = getTableInfoByType(TableType.Campaigns);
  const campaigns = useSelector(getDataSelector);
  const campaignsLoading = useSelector(isLoadingSelector);
  const isAutorized = useSelector(isAutorizedSelector);
  const foundCampaigns = useSelector(getFoundCampaignGroups);
  const totalCampaigns = useSelector(getTotalCampaignsCount);

  const info: ITableProps = {
    tableInfo: tableInfo,
    data: campaigns,
    foundCampaigns: foundCampaigns,
  };
  const table = getTable(info);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isAutorized) {
      if (campaigns.length) return;
      dispatch(getPartCampaingsAction(true, 22, { limit: 25 }));
      dispatch(getPartCampaingsAction(true, 27, { limit: 25 }));
    }
  }, []);

  return (
    <ResizableContainer initialHeight={600}>
      <div className={styles.mainWraper}>
        {campaignsLoading ? (
          <div className={styles.loaderWrapper}>
            <Spinner />
          </div>
        ) : (
          <>
            <TableMediator />
            {totalCampaigns ? (
              <div className={styles.mainWraper}>{table}</div>
            ) : (
              <div className={styles.noDataWrapper}>{'No data'}</div>
            )}
          </>
        )}
      </div>
      <div className={styles.footerWrapper}>
        <CampaignGroupProperties />
      </div>
    </ResizableContainer>
  );
};

export default Campaigns;
