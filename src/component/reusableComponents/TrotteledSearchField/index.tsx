import React, { ChangeEventHandler, ReactEventHandler, useRef, useState } from 'react';
import styles from './SearchField.module.scss';

type TSerchTrottledProps = {
  callback: (val: string, f: any) => void;
  clear?: () => void;
  height?: number;
  width?: number;
  isCaseSensetive?: boolean;
};

const SerchTrottled = (props: TSerchTrottledProps) => {
  const [search, setSearch] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const onChangeSearchField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const lowCaseVal = props.isCaseSensetive ? value : value.toLowerCase();
    lowCaseVal.trim();

    timerRef.current && clearTimeout(timerRef.current);
    setSearch(value);

    timerRef.current = setTimeout(() => startSearch(lowCaseVal), 1000);
  };
  const startSearch = (val: string) => {
    props.callback(val, handleClearInput);
  };

  const handleClearInput = () => {
    setSearch('');
    startSearch('');
  };

  return (
    <div className={`${styles.subContainer}`}>
      <input
        className={`form-control right-icon ${styles.formControl}`}
        placeholder={'Search'}
        type={'text'}
        value={search}
        onChange={onChangeSearchField}
        style={{ height: `${props.height}px`, width: `${props.width}px` }}
      />
      {search && (
        <button className={styles.clearButton} onClick={handleClearInput}>
          &times;
        </button>
      )}
      <span className={`icon-search input-box-left-icon ${styles.icon}`}></span>
    </div>
  );
};

export default SerchTrottled;
