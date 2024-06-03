import React, { useRef, useLayoutEffect, FC, Fragment, useState, useEffect } from 'react';
import styles from './ShowListInfo.module.scss';
import { useAppDispatch } from 'src/redux/hooks';
import { setEditPopUpAction } from 'src/redux/actions/callingLitssActions';
import { useTranslation } from 'react-i18next';
import { getActiveListSelector, getCheckedRecords } from 'src/redux/selectors/callingListsSelectors';
import { useSelector } from 'react-redux';
import { ICampaignGroup } from 'src/api/ts/interfaces/Campaigns.response';
import restApi from 'src/api/rest';
import Spinner from '@genesys/arkui-react/dist/components/Progress/LoadingSpinner';
import { TCfgCampaignGroup } from 'src/api/ts/interfaces/FindFolders.response';
import { TCallingListsExtendedResponse } from 'src/api/ts/interfaces/CallingLists.response';

type TDeleteListReccord = {
  type: string;
};

const ShowListInfo = (props: TDeleteListReccord) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const activeList = useSelector(getActiveListSelector) as TCallingListsExtendedResponse;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [campaigns, setCampaigns] = useState<TCfgCampaignGroup[]>([]);

  const closePopUp = () => {
    dispatch(
      setEditPopUpAction({
        open: false,
        type: '',
      }),
    );
  };

  useEffect(() => {
    restApi
      .getCallingListRelatedCampaiogns({ listId: activeList.id })
      .then(resp => {
        setCampaigns(resp.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    closePopUp();
  };
  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div className="modal-header">
          <div className="header-message-container">
            <h1 className="modal-title"> {t('list_info')}</h1>
          </div>
        </div>
        <div className={`modal-body ${styles.body}`}>
          {loading && (
            <div className={styles.holder}>
              <Spinner />
            </div>
          )}
          {!loading && (
            <div className={styles.content}>
              <div>{t('info')}</div>
              <div className={styles.list_info}>
                <div>{t('table_name')}</div>
                <div>{activeList.tableAccess.name}</div>
                <div>{t('format_name')}</div>
                <div>{activeList.tableAccess.format.name}</div>
                <div>{t('database_name')}</div>
                <div>{activeList.tableAccess.dbTableName}</div>
              </div>
              <div style={{ marginTop: '15px' }}>{t('campaign_groups')}</div>
              <div className={styles.campaigns}>
                {!loading && error && <div className={styles.holder}>Request error</div>}
                {!loading && !error && campaigns.length === 0 && <div className={styles.holder}>No data available</div>}
                {!error && campaigns.length > 0 && campaigns.map((el, key) => <div key={key}>{el.name}</div>)}
              </div>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button style={{ float: 'left' }} className="btn btn-default" onClick={closePopUp}>
            {t('ok')}
          </button>
          <input type="submit" style={{ display: 'none' }} />
        </div>
      </form>
    </>
  );
};

export default ShowListInfo;
