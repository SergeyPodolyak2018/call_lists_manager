import React, { useState } from 'react';
import styles from '../tree.module.scss';
import { TCallingListsObjectsResponse, TCallingListsResponse } from 'src/api/ts/interfaces/CallingLists.response';

import { useAppDispatch } from 'src/redux/hooks';
import { useSelector } from 'react-redux';
import { getActiveListSelector } from 'src/redux/selectors/schedulesListsSelectors';
import {
  getSchedule,
  setConfirmDeleteSelector,
  setScheduleFolderActive,
} from 'src/redux/actions/scheduleListsActions';

export type TCfgCallingLists = {
  data: TCallingListsResponse;
  margin: number;
};
const CfgCallingLists = (props: TCfgCallingLists) => {
  const dispatch = useAppDispatch();
  const activeList = useSelector(getActiveListSelector);
  const disabled = props.data.state === 2;

  const clickHandler = () => {
    if (disabled) return;
    dispatch(getSchedule({ listId: props.data.id, name: props.data.name }));
    dispatch(setScheduleFolderActive(undefined));
  };

  const deleteHandler = () => {
    if (disabled) return;
    dispatch(setConfirmDeleteSelector(true));
  };
  return (
    <div
      className={`${disabled ? styles.disabledCallingList : ''} ${styles.tree_node} ${styles.tree_node_end} ${
        activeList.id === props.data.id ? styles.active : ''
      }`}
      onClick={clickHandler}
    >
      <div className={`${styles.node_simple} `} style={{ marginLeft: `${props.margin}px` }}>
        <span slot="icon" className={`textIcon icon-calendar-month`} style={{ height: '19px' }} />{' '}
        <span>{props.data.name}</span>
        <span className='action icon-trash' onClick={deleteHandler}
              style={{ position: 'absolute', right: '10px' }}/>
      </div>
    </div>
  );
};
export default CfgCallingLists;
