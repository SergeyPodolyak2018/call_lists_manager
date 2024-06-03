import { createReducer } from '@reduxjs/toolkit';
import { ELoginActionTypes } from '../actions/types/loginActionTypes';
import { TUserInfoData } from '../../api/ts/interfaces/UserInfo.respons';
import { TCurrentDataConvertedList, TCurrentDataConverted } from 'src/api/ts/interfaces/Current.response';
import { TTZListResponse } from 'src/api/ts/interfaces/TZList.response';

type TLoginState = {
  loading: boolean;
  authorized: boolean;
  error: boolean;
  userInfo: TUserInfoData;
  ocs: TCurrentDataConverted & { groupId: number };
  infoPopUp: boolean;
  serversList: TCurrentDataConvertedList[];
  tzList:TTZListResponse[];
};
const initialState: TLoginState = {
  loading: true,
  infoPopUp: false,
  authorized: false,
  error: false,
  ocs: {
    ocsId: 0,
    name: '',
    groupId: 0,
  },
  userInfo: {
    id: 0,
    appVersion: '',
    nodeVersion: '',
    firstName: '',
    lastName: '',
    userName: '',
    tenantId: 0,
    employeeId: '',
  },
  serversList: [],
  tzList:[],
};

export const loginReducer = createReducer(initialState, {
  [ELoginActionTypes.LOADING]: (state, action: { payload: boolean }) => {
    state.loading = action.payload;
  },
  [ELoginActionTypes.AUTHORIZED]: (state, action: { payload: boolean }) => {
    state.authorized = action.payload;
  },
  [ELoginActionTypes.ERROR]: (state, action: { payload: boolean }) => {
    state.error = action.payload;
  },
  [ELoginActionTypes.SET_USER_DATA]: (state, action: { payload: TUserInfoData }) => {
    state.userInfo = action.payload;
  },
  [ELoginActionTypes.SET_SERVER]: (state, action: { payload: TCurrentDataConverted & { groupId: number } }) => {
    state.ocs = action.payload;
  },
  [ELoginActionTypes.TOGLE_INFO_POPUP]: (state, action: { payload: boolean }) => {
    state.infoPopUp = action.payload;
  },
  [ELoginActionTypes.SET_SERVERS_LIST]: (state, action: { payload: TCurrentDataConvertedList[] }) => {
    state.serversList = action.payload;
  },
  [ELoginActionTypes.SET_TZ_LIST]: (state, action: { payload: TTZListResponse[] }) => {
    state.tzList = action.payload;
  },
});

export default loginReducer;
