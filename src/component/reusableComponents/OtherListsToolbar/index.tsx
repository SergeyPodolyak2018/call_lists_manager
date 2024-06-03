import React, { ChangeEventHandler, ReactEventHandler, useRef, useState } from 'react';
import styles from './OtherListsToolbar.module.scss';
import { useAppDispatch } from 'src/redux/hooks';

type TToolBarProps = {
  height: number;
};

const OtherListsToolBar = (props: TToolBarProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container} style={{ height: `${props.height}px` }}>
      
    </div>
  );
};

export default OtherListsToolBar;
