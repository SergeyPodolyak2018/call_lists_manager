import restApi from '../../api/rest';
import { ILoginPayload } from '../../api/ts/interfaces/config.payload';
import Logger from '../../helper/logger';
import { AppDispatch } from '../store';
import { ELoginActionTypes } from './types/loginActionTypes';
import { TUserInfoData } from '../../api/ts/interfaces/UserInfo.respons';
import { TCurrentDataConvertedList, TCurrentDataConverted } from 'src/api/ts/interfaces/Current.response';
import { P } from '@genesys/arkui-react';
import { TTZListResponse } from 'src/api/ts/interfaces/TZList.response';

export const loginAction = (credentials: ILoginPayload) => {
  return async (dispatch: AppDispatch) => {
    dispatch(loginLoaderAction(true));
    try {
      const {
        data: { access_token },
      } = await restApi.fetchLogin(credentials);
      sessionStorage.setItem('access_token', access_token);
      await dispatch(userInfoAction());
    } catch (err: any) {
      dispatch(loginLoaderAction(false));
      dispatch(loginAutorizedAction(false));
      dispatch(loginErrordAction(true));
      Logger.error(err.message);
    }
  };
};
export const userInfoAction = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await restApi.getUser();
      await dispatch(setUserDataAction(response.data.data));
      const ocsList = await restApi.getOCSList();
      const gettz = await restApi.getTZList();
      // dispatch(
      //   setServer({
      //     ocsId: ocsList.data[0].id,
      //     name: ocsList.data[0].name,
      //     groupId: response.data.data.tenantId,
      //   }),
      // );
      dispatch(
        setServersList(
          ocsList.data.map(item => {
            return { ocsId: item.id, name: item.name, groupId: response.data.data.tenantId };
          }),
        ),
      );
      dispatch(setTZListAction(gettz.data));
      dispatch(setUserDataAction(response.data.data));
      dispatch(loginAutorizedAction(true));
      setTimeout(() => {
        dispatch(loginLoaderAction(false));
      }, 1000);
    } catch (err: any) {
      dispatch(loginLoaderAction(false));
      dispatch(loginAutorizedAction(false));
      Logger.error(err.message);
    }
  };
};
export const logoutAction = () => {
  return async (dispatch: AppDispatch) => {
    restApi
      .fetchLogout()
      .then(data => {
        sessionStorage.removeItem('access_token');
        window.location.reload();
      })
      .catch(err => {
        Logger.error(err.message);
      });
  };
};

export const loginLoaderAction = (data: boolean) => ({
  type: ELoginActionTypes.LOADING,
  payload: data,
});
export const loginAutorizedAction = (data: boolean) => ({
  type: ELoginActionTypes.AUTHORIZED,
  payload: data,
});
export const loginErrordAction = (data: boolean) => ({
  type: ELoginActionTypes.ERROR,
  payload: data,
});
export const setUserDataAction = (data: TUserInfoData) => ({
  type: ELoginActionTypes.SET_USER_DATA,
  payload: data,
});

export const setServer = (data: TCurrentDataConverted & { groupId: number }) => ({
  type: ELoginActionTypes.SET_SERVER,
  payload: data,
});

export const setServersList = (data: TCurrentDataConvertedList[]) => ({
  type: ELoginActionTypes.SET_SERVERS_LIST,
  payload: data,
});
export const setInfoPopUpAction = (data: boolean) => ({
  type: ELoginActionTypes.TOGLE_INFO_POPUP,
  payload: data,
});
export const setTZListAction = (data: TTZListResponse[]) => ({
  type: ELoginActionTypes.SET_TZ_LIST,
  payload: data,
});

