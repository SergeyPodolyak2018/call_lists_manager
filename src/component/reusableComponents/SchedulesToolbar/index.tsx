import React, { ChangeEventHandler, ReactEventHandler, useRef, useState } from 'react';
import styles from './Toolbar.module.scss';
import { useAppDispatch } from 'src/redux/hooks';
import SerchTrottled from '../TrotteledSearchField';
import { getSchedules } from '../../../redux/actions/scheduleListsActions';

type TToolBarProps = {
  height: number;
};

const SchedulesToolBar = (props: TToolBarProps) => {
  const dispatch = useAppDispatch();

  const startSearch = (val: string) => {
    if (val.length !== 0) {
      dispatch(getSchedules({parentId:0, name:val}));
    } else {
      dispatch(getSchedules({}));
    }
  };

  return (
    <div className={styles.container} style={{ height: `${props.height}px` }} id={'search-schedules'}>
      <SerchTrottled callback={startSearch}  width={430}/>
    </div>
  );
};

export default SchedulesToolBar;
