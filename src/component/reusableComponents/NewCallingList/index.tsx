import React, { useRef, useLayoutEffect, FC, Fragment, useState } from 'react';
import styles from './NewCallingList.module.scss';
import { useAppDispatch } from 'src/redux/hooks';
import {
  postListsRecord,
  putListsRecord,
  setEditPopUpAction,
  setEditSubPopUpAction,
} from 'src/redux/actions/callingLitssActions';
import { useTranslation } from 'react-i18next';
import {
  getCheckedRecords,
  getListFields,
  getNegation,
  getRecord,
  getRecords,
} from 'src/redux/selectors/callingListsSelectors';
import { useSelector } from 'react-redux';
import { TCallingListFields } from 'src/api/ts/interfaces/CallingLists.response';
import { type } from 'os';
import { CfgDataType, CfgFieldType, SelectList } from 'src/api/ts/constants/codes';
import {
  isoToTimeStampConverter,
  secToDateIsoConverter,
  secToDateTimeConverter,
  secToTimeConverter,
  timeToSecConverter,
} from 'src/utils/tablesInfoManager';
import ConfirmEditAll from '../ConfirmEditAll';
import { getTZList } from 'src/redux/selectors/loginSelector';

export type TEditOrCreateListReccord = {
  type: 'edit' | 'editAll' | 'insert';
};
const columnsBlacList = ['record_id', 'call_time'];
const columnDisabeled = ['record_id', 'call_time'];

const EditOrCreateListReccord = (props: TEditOrCreateListReccord) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const selected = useSelector(getCheckedRecords);
  const fields = useSelector(getListFields);
  const tzons = useSelector(getTZList);
  const record = useSelector(getRecord(selected[0]));
  const records = useSelector(getRecords(selected));
  const negation = useSelector(getNegation);
  const [counter, setCounter] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [confirmCallback, setConfirmCallback] = useState(() => () => {});
  const formRef = useRef<HTMLFormElement>(null);

  const closePopUp = () => {
    dispatch(
      setEditPopUpAction({
        open: false,
        type: '',
      }),
    );
  };

  const getDefaultValue = (field: TCallingListFields): string | number | undefined => {
    if (props.type !== 'edit' && 'defaultValue' in field) {
      return field.defaultValue;
    } else {
      return undefined;
    }
  };

  const getValue = (field: TCallingListFields): string | number | undefined => {
    if (props.type !== 'insert') {
      if (negation) {
        return getDefaultValue(field);
      } else {
        if (!records.every(rec => rec[field.name as keyof typeof rec] === records[0][field.name as keyof typeof rec])) {
          return getDefaultValue(field);
        } else {
          return records[0][field.name as keyof typeof record]!;
        }
      }
    } else {
      return getDefaultValue(field);
    }
  };

  const buttonStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.checked ? 1 : -1;
    const reg = /^check_.*/;
    const fieldName = e.target.name;
    const normalName = fieldName.replace('check_', '');
    const fieldData = fields.find(el => el.name === normalName);
    if (fieldData?.isNullable === 1) {
      const targetField = formRef.current?.elements.namedItem(normalName) as HTMLInputElement;
      if (targetField) {
        if (e.target.checked) {
          targetField.setAttribute('required', 'true');
        } else {
          targetField.removeAttribute('required');
        }
      }
    }
    setCounter(prev => {
      return prev + val;
    });
  };

  const getField = (field: TCallingListFields) => {
    if (field.fieldType in SelectList) {
      const list = SelectList[field.fieldType as keyof typeof SelectList];
      return (
        <div className={`input-container tenant-container form-group ${styles.inputContainer}`}>
          <select
            className="form-control right-icon"
            id={field.name}
            name={field.name}
            defaultValue={getValue(field)}
            disabled={columnDisabeled.indexOf(field.name) > -1 ? true : false}
            placeholder={field.name}
          >
            {Object.keys(list).map(key => (
              <option key={key} value={key}>
                {list[key as unknown as keyof typeof list]}
              </option>
            ))}
          </select>
        </div>
      );
    } else if (field.fieldType === CfgFieldType.CFGFTTimeZone) {
      return (
        <div className={`input-container tenant-container form-group ${styles.inputContainer}`}>
          <select
            className="form-control right-icon"
            id={field.name}
            name={field.name}
            defaultValue={getValue(field)}
            disabled={columnDisabeled.indexOf(field.name) > -1 ? true : false}
            placeholder={field.name}
          >
            {tzons.map(tz => (
              <option key={tz.id} value={tz.id}>
                {tz.name}
              </option>
            ))}
          </select>
        </div>
      );
    } else if (field.fieldType === CfgFieldType.CFGFTFrom || field.fieldType === CfgFieldType.CFGFTUntil) {
      return (
        <div className={`input-container tenant-container form-group ${styles.inputContainer}`}>
          <input
            className={`form-control right-icon ${styles.localInput}`}
            id={field.name}
            name={field.name}
            placeholder={field.name}
            type="time"
            required={field.isNullable === 1 && props.type !== 'editAll' ? true : false}
            disabled={columnDisabeled.indexOf(field.name) > -1 ? true : false}
            defaultValue={secToTimeConverter(getValue(field) as string)}
          />
        </div>
      );
    } else if (field.fieldType === CfgFieldType.CFGFTScheduledTime) {
      return (
        <div className={`input-container tenant-container form-group ${styles.inputContainer}`}>
          <input
            className={`form-control right-icon ${styles.localInput}`}
            id={field.name}
            name={field.name}
            placeholder={field.name}
            type="datetime-local"
            required={field.isNullable === 1 && props.type !== 'editAll' ? true : false}
            disabled={columnDisabeled.indexOf(field.name) > -1 ? true : false}
            defaultValue={secToDateIsoConverter(getValue(field) as string)}
            // defaultValue={'2017-06-01T08:30'}
          />
        </div>
      );
    } else {
      return (
        <div className={`input-container tenant-container form-group ${styles.inputContainer}`}>
          <input
            className="form-control right-icon"
            id={field.name}
            name={field.name}
            placeholder={field.name}
            maxLength={
              field.type === CfgDataType.CFGDTVarChar || field.type === CfgDataType.CFGDTChar ? field.length : undefined
            }
            max={field.type === CfgDataType.CFGDTInt ? 2147483647 : undefined}
            min={field.type === CfgDataType.CFGDTInt ? -2147483648 : undefined}
            type={field.type === CfgDataType.CFGDTInt ? 'number' : 'text'}
            required={field.isNullable === 1 && props.type !== 'editAll' ? true : false}
            disabled={columnDisabeled.indexOf(field.name) > -1 ? true : false}
            defaultValue={getValue(field)}
          />
        </div>
      );
    }
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const entries = Object.fromEntries(formData);

    const object: any = {};
    const fieldsClone: TCallingListFields[] = [];
    if (props.type === 'editAll') {
      const reg = /^check_.*/;
      Object.keys(entries).map(el => {
        if (reg.test(el) && entries[el] === 'on') {
          const normalName = el.replace('check_', '');
          fieldsClone.push(fields.find(el => el.name === normalName)!);
        }
      });
    } else {
      fieldsClone.push(...fields);
    }

    fieldsClone.map(el => {
      if (columnsBlacList.indexOf(el.name) < 0) {
        if (el.fieldType === CfgFieldType.CFGFTFrom || el.fieldType === CfgFieldType.CFGFTUntil) {
          object[el.name] = timeToSecConverter(entries[el.name] as string);
        } else if (el.fieldType === CfgFieldType.CFGFTScheduledTime) {
          object[el.name] = isoToTimeStampConverter(entries[el.name] as string);
        } else {
          if (el.type === 1 && entries[el.name]) {
            const value = entries[el.name] === '' ? '-1' : entries[el.name];
            object[el.name] = Number.parseInt(value as string);
          }
          if (el.type !== 1 && entries[el.name]) {
            object[el.name] = entries[el.name];
          }
        }
      }
    });
    if (Object.keys(object).length > 0) {
      if (props.type === 'edit') {
        dispatch(putListsRecord(object)).then(() => {
          closePopUp();
        });
      } else if (props.type === 'editAll') {
        const callback = () => {
          dispatch(putListsRecord(object))
            .then(() => {
              dispatch(
                setEditPopUpAction({
                  open: false,
                  type: '',
                }),
              );
            })
            .catch(() => {
              setConfirm(false);
            });
        };
        setConfirmCallback(() => callback);
        setConfirm(true);
      } else {
        dispatch(postListsRecord(object))
          .then(() => {
            closePopUp();
          })
          .catch(() => {
            setConfirm(false);
          });
      }
    }
  };
  return (
    <>
      {confirm && (
        <>
          <div className={styles.popUp} />
          <div className={styles.subPopUp}>
            <ConfirmEditAll
              close={() => {
                setConfirm(false);
              }}
              callBack={() => {
                confirmCallback();
              }}
            />
          </div>
        </>
      )}
      <form onSubmit={handleOnSubmit} className={styles.formWrap} ref={formRef}>
        <div className="modal-header">
          <div className="header-message-container">
            <h1 className="modal-title">
              {['edit', 'editAll'].includes(props.type) ? t('edit_calling_list') : t('create_calling_list')}
            </h1>
          </div>
        </div>
        <div className={`modal-body ${styles.body} ${props.type === 'editAll' ? styles.bodyFat : ''}`}>
          {fields.map((el, index) => {
            if (props.type === 'editAll' && el.isUnique === 2) {
              return null;
            }
            return (
              <Fragment key={el.name}>
                <div key={index} className={styles.name}>
                  {el.isNullable === 1 ? <div className={styles.required}>*</div> : null}
                  {el.name}
                </div>
                <div key={el.name + index}>{getField(el)}</div>
                {props.type === 'editAll' ? (
                  <div className={styles.checkBoxHolder}>
                    {columnDisabeled.indexOf(el.name) === -1 ? (
                      <label>
                        <input
                          name={`check_${el.name}`}
                          className="ark-checkbox ng-untouched ng-valid ng-dirty ng-valid-parse ng-modified ng-empty"
                          type="checkbox"
                          defaultChecked={false}
                          onChange={buttonStatus}
                        />
                        <span></span>
                      </label>
                    ) : null}
                  </div>
                ) : null}
              </Fragment>
            );
          })}
        </div>
        <div className="modal-footer">
          <button style={{ float: 'left' }} className="btn btn-default" onClick={closePopUp}>
            {t('cancel')}
          </button>
          <button
            focus-me="true"
            style={{ float: 'right' }}
            className={`btn btn-primary ${counter === 0 && props.type === 'editAll' ? 'disabled' : ''}`}
            onClick={() => {}}
          >
            {t('save')}
          </button>
          <input type="submit" style={{ display: 'none' }} />
        </div>
      </form>
    </>
  );
};

export default EditOrCreateListReccord;
