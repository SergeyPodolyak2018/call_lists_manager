import React, { useEffect, useState, useRef } from 'react';
import styles from './ListData.module.scss';
import { useSelector } from 'react-redux';
import useStateRef from 'react-usestateref';
import Spinner from '@genesys/arkui-react/dist/components/Progress/LoadingSpinner';
import { fieldTransformer, nameModifier } from 'src/utils/tablesInfoManager';

import {
  getCheckedRecords,
  getColorsSelector,
  getIncludedSelector,
  getListFields,
  getNegation,
  getPaginationParams,
  getRecordsSelector,
  getShowCustomFieldsSelector,
  getViewingFilterSelector,
  isLoadingCallingListSelector,
  isLoadingReccordsSelector,
} from 'src/redux/selectors/callingListsSelectors';
import ToolBar from '../Toolbar';
import TdSection from 'src/component/TdSection';
import { useAppDispatch } from 'src/redux/hooks';
import {
  changePagination,
  setCheckerdRecords,
  setEditPopUpAction,
  setNegationAction,
  togledCheckAllRecords,
} from 'src/redux/actions/callingLitssActions';
import ListsPagination from '../ListPagination';
import { getPadding } from '@genesys/arkui-react/dist/components/utils';
import { CfgFieldType, IncludedGroups } from 'src/api/ts/constants/codes';
import { TCallingListFields } from 'src/api/ts/interfaces/CallingLists.response';
import CheckboxThreeState from '../CheckboxThreeState';

const ListDataBeta = () => {
  const params = useSelector(getPaginationParams);
  const fields = useSelector(getListFields);
  const records = useSelector(getRecordsSelector);
  const isLoading = useSelector(isLoadingReccordsSelector);
  const isLoadingList = useSelector(isLoadingCallingListSelector);
  const checkedRecords = useSelector(getCheckedRecords);
  const colors = useSelector(getColorsSelector);
  const included = useSelector(getIncludedSelector);
  const showFields = useSelector(getShowCustomFieldsSelector);
  const negation = useSelector(getNegation);
  const dispatch = useAppDispatch();
  const viewingFilter = useSelector(getViewingFilterSelector);
  const [selectedRow, setSelectedRow] = useState<number>(-1);
  const [fieldsWidth, setWidth, fieldsWidthRef] = useStateRef<number[]>([]);
  const tableRef = useRef<HTMLTableElement | null>(null);
  let startX: number, width: number;
  let startWidth: number;
  const minWidth = 50;
  const maxWidth = 500;
  let currentIndex = -1;
  let tempParent: HTMLTableElement;
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const checkRow = (id: number) => {
    dispatch(setCheckerdRecords(id));
  };

  useEffect(() => {
    const savedData: number[] = JSON.parse(sessionStorage.getItem('calling_list_table') || '[]');
    const initArr: number[] = [];
    if (savedData.length === 0 || savedData.length !== getFields().length) {
      initArr.push(...new Array(getFields().length).fill(150));
    } else {
      initArr.push(...savedData);
    }

    setWidth(initArr);
    return () => {
      sessionStorage.setItem('calling_list_table', JSON.stringify(fieldsWidthRef.current));
    };
  }, [fields, showFields]);

  const getStyle = () => {
    const styles = [];
    styles.push(...fieldsWidth.map(el => `minmax(${el}px, 1fr)`));
    const stylesArr = ['minmax(50px, 1fr)', ...styles];
    return {
      gridTemplateColumns: stylesArr.join(' '),
    };
  };

  const mouseDownHandler = (event: React.MouseEvent<HTMLSpanElement>, index: number): void => {
    startX = event.clientX;
    const target = event.nativeEvent.target as HTMLTableElement;
    tempParent = target?.parentElement as HTMLTableElement;
    startWidth = tempParent?.clientWidth as number;
    document.addEventListener('mousemove', mouseMuveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
    currentIndex = index;
  };

  const mouseUpHandler = (event: MouseEvent) => {
    width = startWidth + (event.clientX - startX);
    if (width < minWidth) width = minWidth;
    if (currentIndex > -1) {
      setWidth((previous: number[]) => {
        const newElements = [...previous];
        newElements[currentIndex] = width;
        return newElements;
      });
    }
    document.removeEventListener('mousemove', mouseMuveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  const mouseMuveHandler = (event: MouseEvent) => {
    width = startWidth + (event.clientX - startX);
    if (width < minWidth) width = minWidth;
    const controlEl = tableRef.current;
    if (controlEl) {
      const styles = window.getComputedStyle(controlEl);
      const property = styles.gridTemplateColumns;
      const newPropertyArr: string[] = property.split(' ');
      newPropertyArr[currentIndex + 1] = `${width}px`;
      controlEl.style.gridTemplateColumns = newPropertyArr.join(' ');
    }
  };

  const changeSort = (id: string) => {
    const aditionalParams = {
      ...(!viewingFilter && { orderByCondition: '', whereCondition: '' }),
    };
    if (id === params.sortBy) {
      dispatch(changePagination({ orderBy: params.orderBy === 'ASC' ? 'DESC' : 'ASC', ...aditionalParams }));
    } else {
      dispatch(changePagination({ sortBy: id, orderBy: 'ASC', ...aditionalParams }));
    }
  };

  const getFields = (): TCallingListFields[] => {
    if (showFields) {
      const res = fields.filter(el => el.fieldType === CfgFieldType.CFGFTCustomField);
      return res;
    }
    return fields;
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, record_id: number) => {
    switch (event.detail) {
      case 1: {
        timerRef.current = setTimeout(() => checkRow(record_id), 400);
        break;
      }
      case 2: {
        timerRef.current && clearTimeout(timerRef.current);
        if (!checkedRecords.includes(record_id)) {
          checkRow(record_id);
        }
        let type: 'edit' | 'editAll' = 'edit';
        if (checkedRecords.length === 0 && !checkedRecords.includes(record_id)) {
          type = 'edit';
        }
        if (checkedRecords.length > 0 && !checkedRecords.includes(record_id)) {
          type = 'editAll';
        }
        if (checkedRecords.length === 1 && checkedRecords.includes(record_id)) {
          type = 'edit';
        }
        if (checkedRecords.length > 1 && checkedRecords.includes(record_id)) {
          type = 'editAll';
        }
        dispatch(
          setEditPopUpAction({
            open: true,
            type: type,
          }),
        );
        break;
      }
      default: {
        break;
      }
    }
  };

  const checkPage = () => {
    if (records.length > 0) {
      if (checkedRecords.length === records.length || negation) {
        dispatch(togledCheckAllRecords([]));
      } else {
        dispatch(togledCheckAllRecords(records.map(el => el.record_id)));
      }
      dispatch(setNegationAction(false));
    }
  };

  const checkAllPages = () => {
    if (records.length > 0) {
      if (checkedRecords.length > 0) {
        dispatch(togledCheckAllRecords([]));
      }
      dispatch(setNegationAction(true));
    }
  };

  const isChecked = (id: number): boolean => {
    if (negation && checkedRecords.indexOf(id) < 0) return true;
    if (!negation && checkedRecords.indexOf(id) > -1) return true;
    return false;
  };
  const getState = (): 0 | 1 | 2 => {
    if (!negation) {
      if (checkedRecords.length === 0) return 0;
      if (checkedRecords.length > 0 && checkedRecords.length !== records.length) return 1;
      if (checkedRecords.length > 0 && checkedRecords.length === records.length) return 2;
    } else {
      if (checkedRecords.length > 0) return 1;
      if (checkedRecords.length === 0) return 2;
    }
    return 0;
  };

  return (
    <div className={styles.container}>
      {isLoadingList ? (
        <Spinner />
      ) : (
        <>
          {fields.length > 0 ? (
            <>
              <ToolBar height={40} />
              {getFields().length === 0 && fieldsWidth.length === 0 && showFields ? (
                <div className={styles.noData}>No custom fields</div>
              ) : (
                <>
                  <div className={styles.wrapper} style={{ height: 'calc(100% - 83px)' }}>
                    <table slot="data" className={styles.tableGrid} style={getStyle()} ref={tableRef}>
                      <thead>
                        <tr>
                          <th>
                            <CheckboxThreeState
                              state={getState()}
                              actionList={[
                                {
                                  name: 'Current page',
                                  action: checkPage,
                                },
                                {
                                  name: 'All pages',
                                  action: checkAllPages,
                                },
                              ]}
                            />
                          </th>
                          {getFields().map((column, index) => (
                            <th key={index} colSpan={1}>
                              <span
                                className={styles.headerName}
                                onClick={() => {
                                  changeSort(column.name);
                                }}
                              >
                                <span className={styles.name_double}>
                                  <span className={styles.name_normal}>{nameModifier(column.name)}</span>
                                  <span className={styles.name_real}>{column.name}</span>
                                </span>{' '}
                                {params.sortBy === column.name && (
                                  <i
                                    className={`fonticon ${
                                      params.orderBy === 'DESC' ? 'icon-arrow-down' : 'icon-arrow-up'
                                    }`}
                                  />
                                )}
                              </span>
                              <span
                                className={styles.resizeController}
                                data-index={index}
                                onMouseDown={e => {
                                  mouseDownHandler(e, index);
                                }}
                              ></span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      {isLoading ? (
                        <Spinner />
                      ) : records.length > 0 ? (
                        <tbody>
                          {records?.map((el, index) => (
                            <tr
                              key={index}
                              onClick={e => {
                                handleClick(e, el.record_id);
                              }}
                              className={`${isChecked(el.record_id) ? styles.selected : ''}`}
                            >
                              <td>
                                <div
                                  className={styles.checkbox_wrapper}
                                  onClick={e => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleClick(e, el.record_id);
                                  }}
                                >
                                  <i
                                    className={`ng-grid-checkbox-multi-state fonticon ark-checkbox ${
                                      isChecked(el.record_id) ? 'icon-checkbox-tick checked' : 'icon-checkbox'
                                    }`}
                                  />
                                </div>
                              </td>
                              {getFields().map((column, indexI) => {
                                const value =
                                  el[column.name as keyof typeof el] === null ? '' : el[column.name as keyof typeof el];
                                const text = fieldTransformer(column, value!);
                                return (
                                  <TdSection
                                    column={column.name}
                                    key={indexI}
                                    paddingLR={10}
                                    info={text as string}
                                    bagroundColor={selectedRow !== el.record_id ? colors[el.chain_id] : ''}
                                    included={included}
                                    fildsMap={IncludedGroups}
                                    useIncluded={true}
                                  />
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      ) : (
                        <div className={styles.noData}>Table Is Empty</div>
                      )}
                    </table>
                  </div>
                  <ListsPagination height={40} />
                </>
              )}
            </>
          ) : (
            <div className={styles.noData}>Please select Calling List</div>
          )}
        </>
      )}
    </div>
  );
};

export default ListDataBeta;
