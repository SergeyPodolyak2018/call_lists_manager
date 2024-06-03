import React, { useRef, useLayoutEffect, FC, Fragment, useState } from 'react';
import logger from '../../../helper/logger';
import styles from './DonotCallPopUp.module.scss';
import { useAppDispatch } from 'src/redux/hooks';
import { setEditPopUpAction } from 'src/redux/actions/callingLitssActions';
import { useTranslation } from 'react-i18next';
import { getCheckedRecords } from 'src/redux/selectors/callingListsSelectors';
import { useSelector } from 'react-redux';
import ButtonsGroup from '../ButtonsGroup';
import { DropDownTypes } from '../../../interfaces/dropDown';
import CustomDropdown from '../CustomDropDown';
import restApi from 'src/api/rest';
import Spinner from '@genesys/arkui-react/dist/components/Progress/LoadingSpinner';
import { useToast } from 'src/component/ToastProvider';
import ConfirmImport from '../ConfirmImportResult';
import ConfirmEditAll from '../ConfirmEditAll';
import SpinnerSmall from '../spinner';

type TDeleteListReccord = {
  type: string;
};

const DonotCallPopUp = (props: TDeleteListReccord) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState('append');
  const [confirm, setConfirm] = useState(false);
  const [confirmCallback, setConfirmCallback] = useState(() => () => {});
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [fileName, setFileName] = useState('');
  const [deleteFileName, setDeleteFileName] = useState('');
  const [importMode, setImportMode] = useState<'APPEND_ONLY' | 'APPEND_AND_UPDATE'>('APPEND_ONLY');
  const [deleteMode, setDeleteMode] = useState('all');
  const { addToast } = useToast();
  const [report, setReport] = useState<{ [key: string]: string | number } | null>(null);

  const buttons = [
    { caption: 'Append entries', name: 'append' },
    { caption: 'Delete entries', name: 'delete' },
  ];
  const list = {
    APPEND_ONLY: 'Append Only',
    APPEND_AND_UPDATE: 'Append and Update',
  };

  const list2 = {
    all: 'Delete all entries',
    external: 'Delete external entries',
    DELETE_FROM_FILE: 'Delete entries from file',
  };

  const sub = (s: any) => {
    try {
      if (active === 'append') {
        setFileName(s.target.files[0].name);
      } else {
        setDeleteFileName(s.target.files[0].name);
      }
    } catch (e) {
      if (active === 'append') {
        setFileName('');
      } else {
        setDeleteFileName('');
      }
    }
  };

  const closePopUp = () => {
    dispatch(
      setEditPopUpAction({
        open: false,
        type: '',
      }),
    );
  };
  const onSelectOption = (optionKey: any) => {
    if (active === 'append') {
      setImportMode(optionKey);
    } else {
      setDeleteMode(optionKey);
    }
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!loading) {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      if (active === 'append') {
        setLoading(true);
        formData.set('mode', importMode);
        importAction(formData);
      } else {
        if (deleteMode === 'DELETE_FROM_FILE') {
          setLoading(true);
          formData.set('mode', 'DELETE');
          const callback = ((formData: FormData) => () => {
            importAction(formData);
            setDeleteConfirm(false);
          })(formData);

          setConfirmCallback(() => callback);
        } else {
          const callback = ((deleteMode: string) => () => {
            deleteAction(deleteMode);
            setDeleteConfirm(false);
            setLoading(true);
          })(deleteMode);
          setConfirmCallback(() => callback);
        }
        setDeleteConfirm(true);
      }
    }
  };

  const importAction = async (formData: FormData) => {
    try {
      const initRes = await restApi.importDoNotCallingList(formData);
      if (initRes) {
        importStatus();
      }
    } catch (error) {
      logger.error(error);
    }
  };
  const deleteAction = async (mode: string) => {
    try {
      const initRes = await restApi.deleteDoNotCallingList(mode);
      if (initRes) {
        setReport({
          Result: 'SUCCESS',
          'Deleted Records': initRes.data.deletedRecords,
        });
        setConfirm(true);
      }
      //addToast('Delete from gsw_donotcall_list', 'Success', 200);
      //closePopUp();
    } catch (error) {
      logger.error(error);
    }
  };

  const importStatus = () => {
    restApi
      .getImportDoNotCallingList()
      .then(res => {
        if (res.data.state === 'STOP' || res.data.state === 'COMPLETED') {
          setReport({
            Result: res.data.result,
            ...(res.data.error && { Error: res.data.error }),
            ...(!res.data.error && { 'Total Lines': res.data.totalLines }),
            ...(!res.data.error && { 'Accepted Lines': res.data.acceptedLines }),
            ...(!res.data.error && { 'Rejected Lines': res.data.rejectedLines }),
            ...(!res.data.error && deleteMode === 'DELETE_FROM_FILE' && { 'Deleted Records': res.data.deletedRecords }),
          });
          setConfirm(true);
        } else {
          importStatus();
        }
      })
      .catch(err => {
        logger.error(err);
      });
  };
  const getDeleteMessage = (deleteMode: string): string => {
    if (deleteMode === 'all') return t('delete_confirm_message1');
    if (deleteMode === 'external') return t('delete_confirm_message2');
    if (deleteMode === 'DELETE_FROM_FILE') return t('delete_confirm_message3');
    return '';
  };

  const isDiasabeled = (): boolean => {
    if (confirm && report) return true;
    return false;
  };
  const changeNavigation = (nav: string) => {
    if (confirm && report) {
      return;
    } else {
      setActive(nav);
    }
  };

  return (
    <>
      {deleteConfirm && (
        <>
          <div className={styles.popUp} />
          <div className={styles.subPopUp}>
            <ConfirmEditAll
              close={() => {
                setDeleteConfirm(false);
              }}
              callBack={() => {
                confirmCallback();
              }}
              title={t('delete_confirm_header')}
              message={getDeleteMessage(deleteMode)}
            />
          </div>
        </>
      )}
      {/* {confirm && report && (
        <>
          <div className={styles.popUp} />
          <div className={styles.subPopUp}>
            <ConfirmImport
              close={() => {
                closePopUp();
              }}
              report={report}
              header={active === 'append' ? t('import_result') : t('delete_result')}
            />
          </div>
        </>
      )} */}
      <form onSubmit={handleOnSubmit}>
        <div className="modal-header">
          <div className="header-message-container">
            <h1 className="modal-title"> {t('do_not_call_list')}</h1>
          </div>
          <div className={styles.navigation}>
            <ButtonsGroup
              value={active}
              change={changeNavigation}
              buttons={buttons}
              disable={isDiasabeled()}
              width={270}
            />
          </div>
        </div>
        {/* {loading ? (
          <div className={`modal-body ${styles.body}`}>
            <div className={styles.holder}>
              <Spinner />
            </div>
          </div>
        ) : ( */}
        <div className={`modal-body ${styles.body}`}>
          {active === 'append' ? (
            <>
              <div className={styles.propertyContainer}>
                <span>Import Mode:</span>
                <div style={{ width: '200px' }}>
                  <CustomDropdown
                    validation={Object.values(list)}
                    disabled={isDiasabeled()}
                    type={DropDownTypes.IMPORT_MODE}
                    value={list[importMode as unknown as keyof typeof list]}
                    onSelectAction={onSelectOption}
                    options={Object.keys(list).map(mode => {
                      return { optionKey: mode, optionLabel: list[mode as unknown as keyof typeof list] };
                    })}
                  />
                </div>
              </div>

              <div className={`${styles.fileName} ${isDiasabeled() ? styles.disabled : ''}`} title={fileName}>
                {fileName || 'Input File'}
              </div>
              <label
                className={`btn btn-default ${isDiasabeled() ? 'disabled' : ''}`}
                style={{ height: '30px', lineHeight: '20px' }}
              >
                <input type="file" name="file" onChange={sub} accept=".csv" disabled={isDiasabeled()} />
                Browse
              </label>
            </>
          ) : (
            <>
              <div className={styles.propertyContainer}>
                <span>Delete Mode:</span>
                <div style={{ width: '200px' }}>
                  <CustomDropdown
                    validation={Object.values(list2)}
                    disabled={isDiasabeled()}
                    type={DropDownTypes.IMPORT_MODE}
                    value={list2[deleteMode as unknown as keyof typeof list2]}
                    onSelectAction={onSelectOption}
                    options={Object.keys(list2).map(mode => {
                      return { optionKey: mode, optionLabel: list2[mode as unknown as keyof typeof list2] };
                    })}
                  />
                </div>
              </div>
              {deleteMode === 'DELETE_FROM_FILE' && (
                <>
                  <div className={`${styles.fileName} ${isDiasabeled() ? styles.disabled : ''}`} title={deleteFileName}>
                    {deleteFileName || 'Input File'}
                  </div>
                  <label
                    className={`btn btn-default ${isDiasabeled() ? 'disabled' : ''}`}
                    style={{ height: '30px', lineHeight: '20px' }}
                  >
                    <input type="file" name="file" onChange={sub} accept=".csv" disabled={isDiasabeled()} />
                    Browse
                  </label>
                </>
              )}
            </>
          )}
        </div>
        {/* )} */}
        {confirm && report && (
          <>
            <div className={styles.subPopUpInternal}>
              <ConfirmImport
                close={() => {
                  closePopUp();
                }}
                report={report}
                header={active === 'append' ? t('import_result') : t('delete_result')}
              />
            </div>
          </>
        )}
        {!confirm && !report && (
          <div className="modal-footer">
            <button style={{ float: 'left' }} className="btn btn-default" onClick={closePopUp}>
              {t('cancel')}
            </button>
            {active === 'append' ? (
              <button
                focus-me="true"
                style={{ float: 'right' }}
                disabled={loading || !fileName}
                className={`btn btn-primary ${loading || !fileName ? 'disabled' : ''}`}
                onClick={() => {}}
              >
                {loading ? (
                  <span className={styles.spinnerWrap}>
                    <SpinnerSmall style={{ border: '2px solid #fff', borderTopColor: '#5081e1' }} />
                  </span>
                ) : (
                  t('import')
                )}
              </button>
            ) : (
              <button
                focus-me="true"
                style={{ float: 'right' }}
                disabled={loading || (deleteMode === 'DELETE_FROM_FILE' && !deleteFileName)}
                className={`btn btn-primary ${
                  loading || (deleteMode === 'DELETE_FROM_FILE' && !deleteFileName) ? 'disabled' : ''
                }`}
                onClick={() => {}}
              >
                {loading ? (
                  <span className={styles.spinnerWrap}>
                    <SpinnerSmall style={{ border: '2px solid #fff', borderTopColor: '#5081e1' }} />
                  </span>
                ) : (
                  t('delete')
                )}
              </button>
            )}
            <input type="submit" style={{ display: 'none' }} disabled={loading} />
          </div>
        )}
      </form>
    </>
  );
};

export default DonotCallPopUp;
