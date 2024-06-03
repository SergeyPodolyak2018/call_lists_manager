import React, { FC, useEffect } from 'react';

import Header from './Header';
import AlertRow from './AlertRow';
import VersionsInfo from './VersionsInfo';
import styles from './mainLayout.module.scss';
import CustomPopUp from '../../reusableComponents/CustumPopUp';
import { useSelector } from 'react-redux';
import { isAutorizedSelector, isInfoPopUpSelector } from 'src/redux/selectors/loginSelector';
import { getEditPopUpStatus } from 'src/redux/selectors/callingListsSelectors';
import EditOrCreateListReccord, { TEditOrCreateListReccord } from 'src/component/reusableComponents/NewCallingList';
import ImportCallingListReccords from 'src/component/reusableComponents/ImportCallingList';
import DeleteListReccord from 'src/component/reusableComponents/DeleteCallingList';
import ConfirmEditAll from 'src/component/reusableComponents/ConfirmEditAll';
import FilterConfigurator from 'src/component/reusableComponents/FilterConfigurator';
import { useAppDispatch } from '../../../redux/hooks';
import { logoutAction } from '../../../redux/actions/loginAction';
import Utils from '../../../helper/utils';
import ShowDialingSession from 'src/component/reusableComponents/ShowListInfo';
import DonotCallPopUp from 'src/component/reusableComponents/DonotCallPopUp';
const logoutTimeout = import.meta.env.VITE_LOGOUT_TIMEOUT_MS || 60 * 15 * 1000; // default 15 min

export interface IMainLayout {
  children?: React.ReactNode;
}

const MainLayout: FC<IMainLayout> = ({ children }) => {
  const popUpStatus = useSelector(isInfoPopUpSelector);
  const isAutorized = useSelector(isAutorizedSelector);
  const editListpopUpStatus = useSelector(getEditPopUpStatus);
  const dispatch = useAppDispatch();
  const idle = Utils.useIdle(~~logoutTimeout);

  useEffect(() => {
    idle && !location.pathname.includes('login') && import.meta.env.VITE_LOGOUT_OFF !== 'true' && dispatch(logoutAction());
  }, [idle, location.pathname]);

  return (
    <div className={styles.mainLayout}>
      {popUpStatus && (
        <CustomPopUp>
          <VersionsInfo />
        </CustomPopUp>
      )}
      {editListpopUpStatus.open && editListpopUpStatus.type === 'import' && (
        <CustomPopUp>
          <ImportCallingListReccords type={editListpopUpStatus.type} />
        </CustomPopUp>
      )}
      {editListpopUpStatus.open && editListpopUpStatus.type === 'filterConfig' && (
        <CustomPopUp>
          <FilterConfigurator />
        </CustomPopUp>
      )}
      {editListpopUpStatus.open && ['edit', 'insert', 'editAll'].includes(editListpopUpStatus.type) && (
        <CustomPopUp>
          <EditOrCreateListReccord type={editListpopUpStatus.type as TEditOrCreateListReccord['type']} />
        </CustomPopUp>
      )}
      {editListpopUpStatus.open && editListpopUpStatus.type === 'delete' && (
        <CustomPopUp>
          <DeleteListReccord type={editListpopUpStatus.type} />
        </CustomPopUp>
      )}
      {editListpopUpStatus.open && editListpopUpStatus.type === 'dialing_session' && (
        <CustomPopUp>
          <ShowDialingSession type={editListpopUpStatus.type} />
        </CustomPopUp>
      )}
      {editListpopUpStatus.open && editListpopUpStatus.type === 'do_not_call_list' && (
        <CustomPopUp>
          <DonotCallPopUp type={editListpopUpStatus.type} />
        </CustomPopUp>
      )}
      {isAutorized && <Header />}
      <div className={styles.mainLayout__wrapper}>{children}</div>
    </div>
  );
};

export default MainLayout;
