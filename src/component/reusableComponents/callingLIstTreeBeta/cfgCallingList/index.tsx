import React, { useState } from 'react';
import styles from '../tree.module.scss';
import { TCallingListsObjectsResponse, TCallingListsResponse } from 'src/api/ts/interfaces/CallingLists.response';
import { EClass } from 'src/api/ts/interfaces/FindFolders.response';
import Utils from 'src/helper/utils';
import { IItemsInCallingLists } from 'src/redux/reducers/callingListsReducer';
import { useAppDispatch } from 'src/redux/hooks';
import { useSelector } from 'react-redux';
import { getActiveListSelector } from 'src/redux/selectors/callingListsSelectors';
import { getCallingList, getCallingListsRecords } from 'src/redux/actions/callingLitssActions';

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
    dispatch(getCallingList({ listId: props.data.id, name: props.data.name, offset: 0 }));
  };
  return (
    <div
      className={`${disabled ? styles.disabledObject : ''} ${styles.tree_node} ${styles.tree_node_end} ${
        activeList.id === props.data.id ? styles.active : ''
      }`}
      onClick={clickHandler}
    >
      <div className={`${styles.node_simple} `} style={{ marginLeft: `${props.margin}px` }}>
        <span slot="icon" className={`textIcon ${Utils.getIcon(props.data.$class)}`} style={{ height: '19px' }} />{' '}
        <span>{props.data.name}</span>
      </div>
    </div>
  );
};
export default CfgCallingLists;
