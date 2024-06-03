import React, { useRef, useLayoutEffect, FC, Fragment } from 'react';
import styles from './ConfirmImportResult.module.scss';

import { useTranslation } from 'react-i18next';

type TConfirmImport = {
  close: () => void;
  report: {
    [key: string]: string | number;
  };
  header: string;
};

const ConfirmImport = (props: TConfirmImport) => {
  const { t } = useTranslation();
  const closePopUp = () => {
    props.close();
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div className="modal-header">
          <div className="header-message-container">
            <h1 className="modal-title">{props.header}</h1>
          </div>
        </div>
        <div className={`modal-body ${styles.body}`}>
          {Object.keys(props.report).map(el => (
            <React.Fragment key={el}>
              <span>{el}</span>
              <span>{props.report[el]}</span>
            </React.Fragment>
          ))}
        </div>
        <div className="modal-footer">
          <button style={{ float: 'right' }} className="btn btn-primary" onClick={closePopUp}>
            {t('ok')}
          </button>
          <input type="submit" style={{ display: 'none' }} />
        </div>
      </form>
    </>
  );
};

export default ConfirmImport;
