import { createSelector } from 'reselect';

import { States } from '../constants';
import { rootSelector } from './';

export const loginSelector = createSelector(rootSelector, state => state[States.LOGIN]);
export const isAutorizedSelector = createSelector(loginSelector, data => data.authorized);
export const isLoadingSelector = createSelector(loginSelector, data => data.loading);
export const isErrorSelector = createSelector(loginSelector, data => data.error);
export const getUserDataSelector = createSelector(loginSelector, data => {
  if (!data.userInfo.firstName && !data.userInfo.lastName) {
    return {
      firstName: '' + data.userInfo.employeeId || ' ',
      lastName: data.userInfo.lastName || ' ',
      serverName: data.ocs.name,
    };
  } else {
    return {
      firstName: data.userInfo.firstName || ' ',
      lastName: data.userInfo.lastName || ' ',
      serverName: data.ocs.name,
    };
  }
});
export const getApiVersionSelector = createSelector(loginSelector, data => data.userInfo.appVersion);
export const getNodeVersionSelector = createSelector(loginSelector, data => data.userInfo.nodeVersion);
export const getOCSSelector = createSelector(loginSelector, data => data.ocs);
export const isInfoPopUpSelector = createSelector(loginSelector, data => data.infoPopUp);
export const getTenantId = createSelector(loginSelector, data => data.userInfo.tenantId);
export const getServersList = createSelector(loginSelector, data => data.serversList);
export const getTZList = createSelector(loginSelector, data => data.tzList);
