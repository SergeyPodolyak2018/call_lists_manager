import React, { useState } from 'react';
import styles from './ImportCallingList.module.scss';
import { useAppDispatch } from 'src/redux/hooks';
import { importListsRecord, setEditPopUpAction } from 'src/redux/actions/callingLitssActions';
import { useTranslation } from 'react-i18next';
import { DropDownTypes } from '../../../interfaces/dropDown';
import { useToast } from '../../ToastProvider';
import CustomDropdown from '../CustomDropDown';
import restApi from 'src/api/rest';
import logger from '../../../helper/logger';
import ConfirmImport from '../ConfirmImportResult';
import { useSelector } from 'react-redux';
import { getActiveListSelector } from 'src/redux/selectors/callingListsSelectors';
import Spinner from '@genesys/arkui-react/dist/components/Progress/LoadingSpinner';
import SpinnerSmall from '../spinner';

type TEditOrCreateListReccord = {
  type: string;
};

const ImportCallingListReccords = (props: TEditOrCreateListReccord) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [importMode, setImportMode] = useState('APPEND_ONLY');
  const { addToast } = useToast();
  const [confirm, setConfirm] = useState(false);
  const [report, setReport] = useState<{ [key: string]: string | number } | null>(null);
  const activeList = useSelector(getActiveListSelector);

  const closePopUp = () => {
    dispatch(
      setEditPopUpAction({
        open: false,
        type: '',
      }),
    );
  };

  const sub = (s: any) => {
    try {
      setFileName(s.target.files[0].name);
    } catch (e) {
      setFileName('');
    }
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setLoading(true);
    dispatch(importListsRecord(formData, addToast)).then(() => {
      importStatus();
    });
  };

  const importStatus = () => {
    restApi
      .getCallingListsRecordsImport({ listId: activeList.id })
      .then(res => {
        if (res.data.state === 'STOP' || res.data.state === 'COMPLETED') {
          setReport({
            Result: res.data.result,
            ...(res.data.error && { Error: res.data.error }),
            ...(!res.data.error && { 'Total Lines': res.data.totalLines }),
            ...(!res.data.error && { 'Accepted Lines': res.data.acceptedLines }),
            ...(!res.data.error && { 'Rejected Lines': res.data.rejectedLines }),
          });
          setConfirm(true);
          setLoading(false);
        } else {
          importStatus();
        }
      })
      .catch(err => {
        logger.error(err);
        setLoading(false);
      });
  };

  const list = {
    APPEND_ONLY: 'Append Only',
    APPEND_AND_UPDATE: 'Append and Update',
    FLUSH_APPEND: 'Flush and Append',
  };
  const onSelectOption = (optionKey: any) => {
    setImportMode(optionKey);
  };

  const isDiasabeled = (): boolean => {
    if (confirm && report) return true;
    return false;
  };

  return (
    <>
      <form onSubmit={handleOnSubmit} className={styles.formWrap}>
        <input type="hidden" name={'mode'} value={importMode} />
        <div className="modal-header">
          <div className="header-message-container">
            <h1 className="modal-title">{t('import_calling_list')}</h1>
          </div>
        </div>

        <div className={`modal-body ${styles.body}`}>
          <div className={`${styles.fileName} ${isDiasabeled() ? styles.disabled : ''}`} title={fileName}>
            {fileName}
          </div>
          <label className={`btn btn-default ${isDiasabeled() ? 'disabled' : ''}`} style={{ height: '30px' }}>
            <input type="file" name="file" onChange={sub} accept=".csv" disabled={isDiasabeled()} />
            Browse
          </label>
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
        </div>

        {confirm && report && (
          <>
            <div className={styles.subPopUpInternal}>
              <ConfirmImport
                close={() => {
                  closePopUp();
                }}
                report={report}
                header={t('import_result')}
              />
            </div>
          </>
        )}
        {!confirm && !report && (
          <div className="modal-footer">
            <button style={{ float: 'left' }} className="btn btn-default" onClick={closePopUp} disabled={loading}>
              {t('no')}
            </button>
            <button
              focus-me="true"
              disabled={loading || !fileName}
              style={{ float: 'right' }}
              className="btn btn-primary"
              onClick={() => {}}
            >
              {loading ? (
                <span className={styles.spinnerWrap}>
                  <SpinnerSmall style={{ border: '2px solid #fff', borderTopColor: '#5081e1' }} />
                </span>
              ) : (
                t('yes')
              )}
            </button>
            <input type="submit" style={{ display: 'none' }} />
          </div>
        )}
      </form>
    </>
  );
};

export default ImportCallingListReccords;
