import React, { useRef, useLayoutEffect, FC, Fragment } from 'react';
import styles from './NewCallingList.module.scss';
import { useAppDispatch } from 'src/redux/hooks';
import {
  deleteListsRecord,
  postListsRecord,
  putListsRecord,
  setEditPopUpAction,
} from 'src/redux/actions/callingLitssActions';
import { useTranslation } from 'react-i18next';
import { getCheckedRecords, getListFields, getNegation, getRecord } from 'src/redux/selectors/callingListsSelectors';
import { useSelector } from 'react-redux';
import { TCallingListFields } from 'src/api/ts/interfaces/CallingLists.response';
import { type } from 'os';

type TDeleteListReccord = {
  type: string;
};
const columnsBlacList = ['record_id'];

const DeleteListReccord = (props: TDeleteListReccord) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const selected = useSelector(getCheckedRecords);
  const negation = useSelector(getNegation);

  const closePopUp = () => {
    dispatch(
      setEditPopUpAction({
        open: false,
        type: '',
      }),
    );
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(deleteListsRecord());
    closePopUp();
  };
  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div className="modal-header">
          <div className="header-message-container">
            <h1 className="modal-title">{props.type === 'edit' ? t('edit_calling_list') : t('delete_list_record')}</h1>
          </div>
        </div>
        {negation
          ?<div className={`modal-body ${styles.body}`}>{t('delete_negation')}</div>
          :<div className={`modal-body ${styles.body}`}>Delete {selected.length} record(s)?</div>
        }
        <div className="modal-footer">
          <button style={{ float: 'left' }} className="btn btn-default" onClick={closePopUp}>
            {t('no')}
          </button>
          <button focus-me="true" style={{ float: 'right' }} className="btn btn-primary" onClick={() => {}}>
            {t('yes')}
          </button>
          <input type="submit" style={{ display: 'none' }} />
        </div>
      </form>
    </>
  );
};

export default DeleteListReccord;
