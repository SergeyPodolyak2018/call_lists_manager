import React, { useState } from 'react';
import styles from '../tree.module.scss';
import { TCallingListsObjectsResponse, TCallingListsResponse } from 'src/api/ts/interfaces/CallingLists.response';
import { EClass } from 'src/api/ts/interfaces/FindFolders.response';
import Utils from 'src/helper/utils';
import { IItemsInCallingLists } from 'src/redux/reducers/callingListsReducer';
import { useAppDispatch } from 'src/redux/hooks';
import { useSelector } from 'react-redux';
import { getActiveListSelector } from 'src/redux/selectors/callingListsSelectors';
import { getCallingListsRecords } from 'src/redux/actions/callingLitssActions';

export type TCfgCallingLists = {
  data: TCallingListsResponse;
};
const CfgCallingLists = (props: TCfgCallingLists) => {
  const dispatch = useAppDispatch();
  const activeList = useSelector(getActiveListSelector);

  const clickHandler = () => {
    dispatch(getCallingListsRecords({ listId: props.data.id}));
  };
  return (
    <div
      className={`${styles.tree_node} ${styles.tree_node_end} ${activeList.id === props.data.id ? styles.active : ''}`}
      onClick={clickHandler}
    >
      <div className={`${styles.node_simple} `}>
        <span slot="icon" className={`textIcon ${Utils.getIcon(props.data.$class)}`} style={{ height: '19px' }} />{' '}
        {props.data.name}
      </div>
    </div>
  );
};
export default CfgCallingLists;
