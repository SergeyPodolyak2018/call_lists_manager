import React, { FC } from 'react';
import styles from './AlertRow.module.scss';

const AlertRow: FC = () => {
  return (
    <div className={styles.container}>
      <span>Alert Message Example. Contact your sales representative.</span>
    </div>
  );
};

export default AlertRow;
