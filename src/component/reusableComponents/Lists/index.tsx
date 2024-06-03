import React from 'react';
import styles from './Lists.module.scss';

export interface IListsContainerProps extends React.HTMLProps<HTMLElement> {
  children?: React.ReactNode;
}

const Lists = (props: IListsContainerProps) => {
  return (
    <div className={styles.container}>
      {props.children}
    </div>
  );
};

export default Lists;
