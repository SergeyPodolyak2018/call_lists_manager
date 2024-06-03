import React, { useState } from 'react';
import styles from './userData.module.scss';
import { useAppDispatch } from '../../../redux/hooks';
import { logoutAction } from '../../../redux/actions/loginAction';

type UserDataProps = {
  firstName: string;
  lastName: string;
};

const UserData = (props: UserDataProps) => {
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  return (
    <div className={styles.container}>
      <div className={styles.name}>{`${props.firstName[0]}${props.lastName[0]}`}</div>
      <button>{`${props.firstName} ${props.lastName}`}</button>
      <div className={styles.visible}>
        <div className={styles.textHolder} onClick={logoutHandler}>
          <span className="gux-small-text">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default UserData;
