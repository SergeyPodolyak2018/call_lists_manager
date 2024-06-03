import React, { useRef, useLayoutEffect, FC } from 'react';
import styles from './customPopUp.module.scss';

export interface ICustomPopUp {
  children?: React.ReactNode;
  style?: any;
}

const CustomPopUp: FC<ICustomPopUp> = ({ children, style }) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    setTimeout(() => {
      if (wrapperRef.current && dialogRef.current) {
        wrapperRef.current.style.opacity = '1';
        dialogRef.current.style.transform = 'translate(0, 0)';
      }
    }, 0);
  }, []);

  return (
    <div className={styles.container} style={style} ref={wrapperRef}>
      <div className={styles.modal_dialog} ref={dialogRef}>
        <div className={styles.modal_content}>{children}</div>
      </div>
    </div>
  );
};

export default CustomPopUp;
