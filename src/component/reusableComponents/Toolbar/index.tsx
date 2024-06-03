import React, { ChangeEventHandler, ReactEventHandler, useEffect, useRef, useState } from 'react';
import styles from './Toolbar.module.scss';
import IconButton from '../IconButton';
import { useAppDispatch } from 'src/redux/hooks';
import {
  callingListsSetOrderByConditionAction,
  callingListsSetWhereConditionAction,
  callingListsUseFilterAction,
  csetShowCustomFieldsAction,
  deleteListsRecord,
  exportListsRecord,
  getCallingListsRecords,
  getFilters,
  putCallingList,
  setEditPopUpAction,
  setViewingFilterAction,
} from 'src/redux/actions/callingLitssActions';
import { useSelector } from 'react-redux';
import {
  getActiveListSelector,
  getCheckedRecords,
  getFilterSelector,
  getNegation,
  getOrderByConditionSelector,
  getRecordsSelector,
  getShowCustomFieldsSelector,
  getUseFilterSelector,
  getViewingFilterPreviousDataSelector,
  getViewingFilterSelector,
  getWhereConditionSelector,
} from 'src/redux/selectors/callingListsSelectors';
import SerchTrottled from '../TrotteledSearchField';
import MenuButton from '../MenuButton';
import { TEditNewRecordPopUp } from 'src/redux/reducers/callingListsReducer';
import CustomDropdown from '../CustomDropDown';
import { DropDownTypes, IOption, IOptionUniversal } from 'src/interfaces/dropDown';
import { TFilter } from 'src/api/ts/interfaces/Filters.response';
import Checkbox from '../Switch';
import NamedSwitch from '../NamedSwitch';

type TToolBarProps = {
  height: number;
};
const types: IOption[] = [
  { optionLabel: 'Campaign', optionKey: 'Campaign' },
  { optionLabel: 'Campaign Group', optionKey: 'Campaign Group' },
  { optionLabel: 'Folder', optionKey: 'Folder' },
  { optionLabel: 'Calling List', optionKey: 'Calling List' },
];

const ToolBar = (props: TToolBarProps) => {
  const dispatch = useAppDispatch();
  const [dropDownVal, setDropDownVal] = useState(-1);
  const checkedRecords = useSelector(getCheckedRecords);
  const records = useSelector(getRecordsSelector);
  const showFields = useSelector(getShowCustomFieldsSelector);
  const useFilter = useSelector(getUseFilterSelector);
  const filters = useSelector(getFilterSelector);
  const whereCondition = useSelector(getWhereConditionSelector);
  const orderByCondition = useSelector(getOrderByConditionSelector);
  const list = useSelector(getActiveListSelector);
  const negation = useSelector(getNegation);
  const viewingFilter = useSelector(getViewingFilterSelector);
  const originalViewingFilter = useSelector(getViewingFilterPreviousDataSelector);

  useEffect(() => {
    let filterID = 0;
    if (list && 'filterId' in list) {
      filterID = list.filterId;
    }
    setDropDownVal(filterID);
  }, [list, filters]);

  const editRecord = () => {
    dispatch(
      setEditPopUpAction({
        open: true,
        type: negation || checkedRecords.length > 1 ? 'editAll' : 'edit',
      }),
    );
  };
  const recordAction = (type: TEditNewRecordPopUp['type']) => {
    dispatch(
      setEditPopUpAction({
        open: true,
        type: type,
      }),
    );
  };
  const exportRecords = () => {
    dispatch(exportListsRecord());
  };

  const startSearch = (val: string) => {
    console.log(val);
  };

  const togleFiltrApply = () => {
    // if (originalViewingFilter.orderBy !== orderByCondition || originalViewingFilter.criteria !== whereCondition) {
    //   dispatch(callingListsUseFilterAction(!useFilter));
    //   dispatch(
    //     putCallingList({
    //       listId: list.id,
    //       viewingFilter: {
    //         useFilter: originalViewingFilter.useFilter,
    //         orderBy: orderByCondition,
    //         criteria: whereCondition,
    //       },
    //     }),
    //   );
    // } else {
    dispatch(
      getCallingListsRecords({
        listId: list.id,
        offset: 0,
        useFilter: !useFilter,
        ...(originalViewingFilter.useFilter
          ? { orderByCondition: orderByCondition, whereCondition: whereCondition }
          : { orderByCondition: '', whereCondition: '' }),
      }),
    );
    //}
  };
  const togleViewingFiltrApply = () => {
    dispatch(
      putCallingList({
        listId: list.id,
        viewingFilter: {
          useFilter: !viewingFilter,
          orderBy: orderByCondition,
          criteria: whereCondition,
        },
      }),
    );
  };

  const dropDownChangeHandler = (val: number) => {
    dispatch(putCallingList({ listId: list.id, filterId: val }));
  };

  const optionsGenerator = (): IOptionUniversal[] => {
    const data: IOptionUniversal[] = [{ optionLabel: 'Filter is not selected', optionKey: 0 }];
    filters.forEach(el => {
      const tempObj: IOptionUniversal = { optionLabel: el.name, optionKey: el.id };
      data.push(tempObj);
    });
    return data;
  };
  const getVal = (active: number, list: TFilter[]) => {
    const val = list.find(el => el.id === active);
    if (val) {
      return `Filter: ${val.name}`;
    } else {
      return 'Filter is not selected';
    }
  };

  const refresh = () => {
    dispatch(getCallingListsRecords({ listId: list.id, offset: 0 }));
  };
  const updateFilters = () => {
    dispatch(getFilters());
  };

  const changeWhere = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(callingListsSetWhereConditionAction(e.target.value));
  };
  const changeOrderBy = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(callingListsSetOrderByConditionAction(e.target.value));
  };
  const showFieldsAction = () => {
    dispatch(csetShowCustomFieldsAction(!showFields));
  };

  return (
    <div className={styles.container} style={{ height: `${props.height}px` }}>
      <div className={styles.subContainer} style={{ marginLeft: 0, marginRight: 'auto' }}>
        <IconButton
          type="import"
          title={'Import file'}
          disable={false}
          click={() => {
            recordAction('import');
          }}
        />
        <IconButton type="export" title={'Export the calling list'} disable={!records.length} click={exportRecords} />

        <div className={styles.block_separator}>
          <div className={`${styles.dropdown_container}`}>
            <span className={`${styles.filter_name} dropdown-header-text`}>{getVal(dropDownVal, filters)}</span>
            {/* <CustomDropdown
              type={DropDownTypes.OTHER}
              onSelectAction={dropDownChangeHandler}
              placeholder={'Select filter'}
              value={getVal(dropDownVal, filters)}
              options={optionsGenerator()}
              style={{ height: '30px' }}
              preopenAction={updateFilters}
            /> */}
          </div>
          <IconButton
            type="filter"
            subType={'eye'}
            title={'Filter data'}
            disable={false}
            click={() => {
              updateFilters();
              recordAction('filterConfig');
            }}
          />
          <NamedSwitch
            customStyle={{ marginLeft: '10px', width: '115px', justifyContent: 'space-between' }}
            tooltipOn={'Filter applied'}
            tooltipOff={'Apply filter'}
            checked={useFilter}
            onClick={togleFiltrApply}
            nameOn={'Filter applied'}
            nameOff={'Apply filter'}
          />
        </div>
        <div className={styles.block_separator} style={{ marginLeft: '0', borderLeft: 'none' }}>
          <div className={styles.input_container} style={{ marginLeft: '5px' }}>
            <input
              className="form-control right-icon"
              type={'text'}
              value={whereCondition}
              disabled={false}
              onChange={changeWhere}
              placeholder={'Enter WHERE condition'}
            />
          </div>

          <div className={styles.input_container}>
            <input
              className="form-control right-icon"
              type={'text'}
              value={orderByCondition}
              disabled={false}
              onChange={changeOrderBy}
              placeholder={'Enter ORDER BY expression'}
            />
          </div>
          <NamedSwitch
            customStyle={{ marginLeft: '10px' }}
            tooltipOn={'Viewing filter'}
            tooltipOff={'Viewing filter'}
            checked={viewingFilter}
            onClick={togleViewingFiltrApply}
            nameOn={'Viewing filter'}
            nameOff={'Viewing filter'}
          />
          {/* <IconButton type="refresh" title={'Refresh table'} disable={false} click={refresh} /> */}
        </div>

        <IconButton
          type={'dock'}
          subType={'info'}
          title={'List information'}
          active={false}
          disable={false}
          click={() => {
            recordAction('dialing_session');
          }}
        />
        <NamedSwitch
          customStyle={{ marginLeft: '10px' }}
          tooltipOn={'Show only custom fields'}
          tooltipOff={'Show only custom fields'}
          checked={showFields}
          onClick={showFieldsAction}
          nameOn={'Custom fields'}
          nameOff={'Custom fields'}
        />
      </div>
      <div className={styles.subContainer} style={{ marginLeft: '20px' }}>
        <IconButton
          type="delete"
          title={'Delete record(s)'}
          disable={!negation && checkedRecords.length === 0}
          click={() => {
            recordAction('delete');
          }}
        />
        <IconButton
          type="edite"
          title={'Edit record(s)'}
          disable={!negation && checkedRecords.length === 0}
          click={editRecord}
        />
        <IconButton
          type="insert"
          title={'Insert new record'}
          click={() => {
            recordAction('insert');
          }}
        />
      </div>
    </div>
  );
};

export default ToolBar;
