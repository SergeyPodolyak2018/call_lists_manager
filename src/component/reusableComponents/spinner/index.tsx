import React from 'react';
import styles from './spinner.module.scss';

export type TSpinner = {
  style?: React.CSSProperties;
};

const Spinner = (props: TSpinner) => {
  return <span className={styles.loader} style={props.style}></span>;
};
export default Spinner;
