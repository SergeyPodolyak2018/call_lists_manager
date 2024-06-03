import React, { useRef, useLayoutEffect, FC, Fragment } from 'react';
import styles from './ConfirmEditAll.module.scss';

import { useTranslation } from 'react-i18next';

type TConfirmEditAll = {
  callBack: () => void;
  close: () => void;
  title?:string;
  message?:string;
};

const ConfirmEditAll = (props: TConfirmEditAll) => {
  const { t } = useTranslation();
  const closePopUp = () => {
    props.close();
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.callBack();
  };
  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div className="modal-header">
          <div className="header-message-container">
            <h1 className="modal-title">{props.title || t('edit_records_confirm_header')}</h1>
          </div>
        </div>
        <div className={`modal-body ${styles.body}`} style={{wordBreak: 'break-all'}} title={props.message || ''}>{props.message || t('edit_records_confirm')}</div>
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

export default ConfirmEditAll;
