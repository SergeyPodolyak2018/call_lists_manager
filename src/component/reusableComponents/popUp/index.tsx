import React, { useState, useRef, useLayoutEffect } from 'react';
import styles from './popUp.module.scss';
import { useAppDispatch } from '../../../redux/hooks';
import { addCallingListsDbTable, setPopUpAction } from 'src/redux/actions/callingLitssActions';
import { useTranslation } from 'react-i18next';

type TPopUp = {
  type: string;
  code: number;
  message: string;
  payload: TPopUpPayload;
};
type TPopUpPayload = {
  listId?: number;
  listName?: string;
};

const dictionary = {
  604: {
    header: 'Database error',
    body: (message: string): string => {
      return `DB server operation has failed: '${message}.' Create it?`;
    },
    actionOk: (dispatch: any, payload: TPopUpPayload) => () => {
      dispatch(
        setPopUpAction({
          open: false,
          code: 0,
          type: '',
          data: '',
          callingListId: 0,
          callingListName: '',
        }),
      );
      dispatch(addCallingListsDbTable({ listId: payload.listId!, name: payload.listName! }));
    },
    actionCancel: (dispatch: any) => () => {
      dispatch(
        setPopUpAction({
          open: false,
          code: 0,
          type: '',
          data: '',
          callingListId: 0,
          callingListName: '',
        }),
      );
    },
  },
};

const PopUp = (props: TPopUp) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (wrapperRef.current && dialogRef.current) {
      wrapperRef.current.style.opacity = '1';
      dialogRef.current.style.transform = 'translate(0, 0)';
    }
  }, []);

  return (
    <div className={styles.container} ref={wrapperRef}>
      <div className={styles.modal_dialog} ref={dialogRef}>
        <div className={styles.modal_content}>
          <div className="modal-header ng-scope">
            <div className="header-message-container">
              <h1 className="modal-title ng-binding">{dictionary[props.code as keyof typeof dictionary].header}</h1>
            </div>
          </div>
          <div className={`modal-body ng-scope ${styles.messageBody}`} style={{ textAlign: 'left' }}>
            <div>
              <div>
                <h2 bind-html-unsafe="ctrl.text" className="ng-binding">
                  {dictionary[props.code as keyof typeof dictionary].body(props.message)}
                </h2>
              </div>
            </div>
          </div>
          <div className="modal-footer ng-scope">
            <button
              style={{ float: 'left' }}
              className="btn btn-default ng-binding"
              onClick={dictionary[props.code as keyof typeof dictionary].actionCancel(dispatch)}
            >
              {t('no')}
            </button>
            <button
              focus-me="true"
              style={{ float: 'right' }}
              className="btn btn-primary ng-binding"
              onClick={dictionary[props.code as keyof typeof dictionary].actionOk(dispatch, props.payload)}
            >
              {t('yes')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
