import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { getUserDataSelector } from '../../../../redux/selectors/loginSelector';
import styles from './Header.module.scss';
import NavBar from '@genesys/arkui-react/dist/components/NavBar';
import GenesysIcon from '@genesys/arkui-react/dist/components/GenesysIcon';
import NavItem from '../../../reusableComponents/navItem';
import UserData from '../../../reusableComponents/userData';
import ContactServerName from '../../../reusableComponents/contactServerName';
import UserHelp from './UserHelp';

const Header: FC = () => {
  const userInfo = useSelector(getUserDataSelector);

  return (
    <div className={styles.headerContainer}>
      <NavBar>
        <section>
          <GenesysIcon />
        </section>
        <section style={{ alignItems: 'center' }}>
          <i className={`${styles.logotext} h1`}>Genesys</i>
        </section>
        <section>
          <NavItem name={'Campaigns'} link={'campaigns'} />
        </section>
        <section>
          <NavItem name={'Calling Lists'} link={'calling-lists'} />
        </section>
        <section>
          <NavItem name={'Other Lists'} link={'other_lists'} />
        </section>
        <section>
          <NavItem name={'Outbound Schedules'} link={'outbound-schedules'} />
        </section>
        <section style={{ marginLeft: 'auto' }}></section>
        <section>
          <UserData firstName={userInfo.firstName} lastName={userInfo.lastName} />
        </section>
        <section>
          <UserHelp name={'?'}></UserHelp>
        </section>
      </NavBar>
    </div>
  );
};

export default Header;
