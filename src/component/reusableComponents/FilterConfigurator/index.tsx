import React, { useRef, useLayoutEffect, FC, Fragment, useEffect, useState } from 'react';
import styles from './FilterConfigurator.module.scss';
import { useAppDispatch } from 'src/redux/hooks';
import { deleteListsRecord, putCallingList, setEditPopUpAction } from 'src/redux/actions/callingLitssActions';
import { useTranslation } from 'react-i18next';
import { getActiveListSelector, getCheckedRecords, getFilterSelector } from 'src/redux/selectors/callingListsSelectors';
import { useSelector } from 'react-redux';
import restApi from 'src/api/rest';
import { TFilter } from 'src/api/ts/interfaces/Filters.response';
import Spinner from '@genesys/arkui-react/dist/components/Progress/LoadingSpinner';
import SpinnerSmall from '../spinner';
import { TCallingListsExtendedResponse } from 'src/api/ts/interfaces/CallingLists.response';

const FilterConfigurator = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const selected = useSelector(getCheckedRecords);
  const filters = useSelector(getFilterSelector);
  const list = useSelector(getActiveListSelector) as TCallingListsExtendedResponse;
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [order, setOrder] = useState('');
  const [creteria, setCreteria] = useState('');

  const closePopUp = () => {
    dispatch(
      setEditPopUpAction({
        open: false,
        type: '',
      }),
    );
  };

  const applyFiltr = () => {
    setLoading(true);
    dispatch(putCallingList({ listId: list.id, filterId: selectedFilter })).then(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    const active = filters.find(el => el.id === list.filterId);
    if (active) {
      changeActive(active.id);
    }
  }, []);

  const changeActive = (id: number) => {
    const newActive = filters.find(el => el.id === id);
    setSelectedFilter(id);
    setOrder(newActive?.orderBy || '');
    setCreteria(newActive?.criteria || '');
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    closePopUp();
  };
  return (
    <>
      <div className="modal-header">
        <div className="header-message-container">
          <h1 className="modal-title">{t('filter_config_header')}</h1>
        </div>
      </div>
      <div className={`modal-body ${styles.body}`}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className={styles.list}>
              <div className={styles.header}>{`${t('list_format')} ${t('id')}: ${list.tableAccess.format.id}`}</div>

              <div className={styles.list_container}>
                <div className={styles.header_filters}>
                  <div>{t('filter_name')}</div>
                  <div>{t('format_name')}</div>
                </div>

                {filters.map(el => (
                  <div
                    key={el.id}
                    className={`${styles.name} ${selectedFilter === el.id ? styles.selected : ''} ${
                      list.filterId === el.id ? styles.active : ''
                    }`}
                    onClick={() => {
                      changeActive(el.id);
                    }}
                  >
                    <div>{el.name}</div>
                    <div>{list.tableAccess.format.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.criteria}>
              <div className={styles.header}>{t('criteria') + ':'}</div>
              <input
                className="form-control right-icon"
                type={'text'}
                value={creteria}
                onChange={e => {}}
                disabled={true}
              />
            </div>
            <div className={styles.order}>
              <div className={styles.header}>{t('order') + ':'}</div>
              <input
                className="form-control right-icon"
                type={'text'}
                value={order}
                disabled={true}
                onChange={e => {}}
              />
            </div>
          </>
        )}
      </div>
      <div className="modal-footer">
        <button style={{ float: 'left' }} className="btn btn-default" onClick={closePopUp}>
          {t('cancel')}
        </button>
        {/* <button
          style={{ float: 'right', width: '120px' }}
          onClick={applyFiltr}
          disabled={loading}
          className={`btn btn-primary ${loading}) ? 'disabled' : ''}`}
        >
          {loading ? (
            <span className={styles.spinnerWrap}>
              <SpinnerSmall style={{ border: '2px solid #fff', borderTopColor: '#5081e1' }} />
            </span>
          ) : (
            t('change_filter')
          )}
        </button> */}
      </div>
    </>
  );
};

export default FilterConfigurator;
