import React, { ChangeEventHandler, ReactEventHandler, useEffect, useRef, useState } from 'react';
import styles from './ListsPagination.module.scss';
import { useAppDispatch } from 'src/redux/hooks';
import SerchTrottled from '../TrotteledSearchField';
import {
  changePagination,
  getCallingListsObjects,
  getCallingListsRecords,
  putCallingList,
  searchCallingListsObjects,
  setParamsAction,
} from 'src/redux/actions/callingLitssActions';
import IconButton from '../IconButton';
import PaginationButton from '../PaginationButton';
import {
  getActiveListSelector,
  getOrderByConditionSelector,
  getPaginationParams,
  getTableInfo,
  getTotalCountSelector,
  getViewingFilterPreviousDataSelector,
  getWhereConditionSelector,
} from 'src/redux/selectors/callingListsSelectors';
import { useSelector } from 'react-redux';

type TToolBarProps = {
  height: number;
};

const ListsPagination = (props: TToolBarProps) => {
  const dispatch = useAppDispatch();
  const params = useSelector(getPaginationParams);
  const total = useSelector(getTotalCountSelector);
  const tableDataInfo = useSelector(getTableInfo);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const list = useSelector(getActiveListSelector);
  const whereCondition = useSelector(getWhereConditionSelector);
  const orderByCondition = useSelector(getOrderByConditionSelector);
  const originalViewingFilter = useSelector(getViewingFilterPreviousDataSelector);
  const getPage = () => {
    return params.offset >= total ? 0 : Math.floor(params.offset / params.limit) + 1;
  };

  const [page, setPage] = useState(getPage());

  useEffect(() => {
    setPage(getPage());
  }, [params]);

  const getStart = (offset: number) => {
    return offset;
  };

  const getEnd = (offset: number) => {
    return offset + params.limit;
  };

  const endCorrector = (end: number, total: number) => {
    if (end > total) return total;
    return end;
  };

  const changeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changePagination({ limit: Number.parseInt(e.target.value), offset: 0 }));
  };

  const totalPage = () => {
    const totalPages_pre = Math.floor(total / params.limit);
    return total % params.limit === 0 ? totalPages_pre : totalPages_pre + 1;
  };

  const nextPage = () => {
    dispatch(changePagination({ offset: params.offset + params.limit }));
  };
  const previousPage = () => {
    dispatch(changePagination({ offset: params.offset - params.limit }));
  };
  const firstPage = () => {
    dispatch(changePagination({ offset: 0 }));
  };
  const LastPage = () => {
    dispatch(changePagination({ offset: (totalPage() - 1) * params.limit }));
  };
  const changePage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number.parseInt(e.target.value);
    if (val > 0 && val <= totalPage()) {
      timerRef.current && clearTimeout(timerRef.current);
      //setPage(val);
      timerRef.current = setTimeout(() => changePageAction(val, params.limit), 1000);
    }
  };
  const changePageAction = (val: number, limit: number) => {
    dispatch(changePagination({ offset: (val - 1) * limit }));
  };

  const refresh = () => {
    // if (originalViewingFilter.orderBy !== orderByCondition || originalViewingFilter.criteria !== whereCondition) {
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
        ...(originalViewingFilter.useFilter
          ? { orderByCondition: orderByCondition, whereCondition: whereCondition }
          : { orderByCondition: '', whereCondition: '' }),
      }),
    );
    // }
  };

  return (
    <div className={styles.container} style={{ height: `${props.height}px` }}>
      <div className={styles.subContainer} style={{ marginLeft: 20, marginRight: '10px' }}>
        <span>
          {getStart(params.offset) + 1}-{endCorrector(getEnd(params.offset), total)} of {total}
        </span>
      </div>
      <div className={styles.subContainer} style={{ marginLeft: 20, marginRight: '10px' }}>
        <select
          className="form-control right-icon"
          value={params.limit}
          placeholder={'Limit'}
          onChange={changeLimit}
          style={{ width: '70px', paddingRight: '10px' }}
        >
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className={styles.subContainer} style={{ marginLeft: '0px', marginRight: 'auto' }}>
        <span>per page</span>
      </div>
      <div className={styles.subContainer} style={{ marginLeft: '10px', marginRight: '0' }}>
        <span>
          Records total <b>{tableDataInfo.totalCount}</b>, filtered <b>{tableDataInfo.filteredCount}</b>.
        </span>
      </div>
      <div className={styles.subContainer} style={{ marginLeft: '10px', marginRight: 'auto' }}>
        <span>
          Contacts total <b>{tableDataInfo.contactsTotalCount}</b>, filtered{' '}
          <b>{tableDataInfo.contactsFilteredCount}</b>
        </span>
      </div>

      <div className={styles.subContainer} style={{ marginLeft: '10px', marginRight: '0px' }}>
        <IconButton type="refresh" title={'Refresh table'} disable={false} click={refresh} />
      </div>

      <div className={styles.subContainer} style={{ marginLeft: '20px' }}>
        <PaginationButton type={'endLeft'} click={firstPage} disable={getPage() === 1} />
        <PaginationButton type={'left'} click={previousPage} disable={getPage() === 1} />
      </div>
      <div className={styles.subContainer} style={{ marginLeft: '10px' }}>
        <input
          className="form-control right-icon"
          type={'number'}
          onChange={changePage}
          value={getPage()}
          style={{ width: '50px', paddingRight: '10px' }}
        />
      </div>
      <div className={styles.subContainer} style={{ marginLeft: '0px', marginRight: '0px' }}>
        <span>of {totalPage()}</span>
      </div>
      <div className={styles.subContainer} style={{ marginLeft: '20px' }}>
        <PaginationButton type={'right'} click={nextPage} disable={getPage() === totalPage()} />
        <PaginationButton type={'endRight'} click={LastPage} disable={getPage() === totalPage()} />
      </div>
    </div>
  );
};

export default ListsPagination;
