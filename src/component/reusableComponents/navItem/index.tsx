import React from 'react';
import styles from './navItem.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { MainPath } from '../../../constants/path';

type TNavItemProps = {
  link: string;
  name: string;
};

const NavItem = (props: TNavItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`${MainPath}/${props.link}`);
  };
  const isActive = (): boolean => {
    return location.pathname === `${MainPath}/${props.link}`;
  };

  return (
    <div className={`${styles.navItem} ${isActive() ? styles.active : ''}`} onClick={handleClick}>
      {props.name}
    </div>
  );
};

export default NavItem;
