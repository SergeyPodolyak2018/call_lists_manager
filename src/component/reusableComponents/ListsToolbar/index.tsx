import React, { ChangeEventHandler, ReactEventHandler, useRef, useState } from 'react';
import styles from './ListsToolbar.module.scss';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/redux/hooks';
import SerchTrottled from '../TrotteledSearchField';
import {
  getCallingListsObjects,
  getCallingListsTotal,
  searchCallingListsObjects,
} from 'src/redux/actions/callingLitssActions';
import { getCallingListsTotalSelector } from '../../../redux/selectors/callingListsSelectors';

type TToolBarProps = {
  height: number;
};

const ListsToolBar = (props: TToolBarProps) => {
  const dispatch = useAppDispatch();
  const listsTotal = useSelector(getCallingListsTotalSelector);

  const startSearch = (val: string) => {
    if (val.length !== 0) {
      dispatch(searchCallingListsObjects({ name: val }));
    } else {
      dispatch(getCallingListsObjects({}));
      dispatch(getCallingListsTotal());
    }
  };

  return (
    <div className={styles.container} style={{ height: `${props.height}px` }}>
      <div style={{ marginLeft: '20px' }}>
        <b>Total Calling Lists: {listsTotal}</b>
      </div>
      <SerchTrottled callback={startSearch} />
    </div>
  );
};

export default ListsToolBar;
