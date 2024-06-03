import React from 'react';
import styles from './userHelp.module.scss';
import { useAppDispatch } from 'src/redux/hooks';
import { setInfoPopUpAction } from 'src/redux/actions/loginAction';

type UserHelpProps = {
  name: string;
};

const UserHelp = (props: UserHelpProps) => {
  const dispatch = useAppDispatch();
  const openModal = () => {
    dispatch(setInfoPopUpAction(true));
  };
  return (
    <div className={styles.container}>
      <span
        onClick={e => {
          e.stopPropagation();
          openModal();
        }}
        className="gux-small-text"
      >
        {props.name}
      </span>
    </div>
  );
};

export default UserHelp;
