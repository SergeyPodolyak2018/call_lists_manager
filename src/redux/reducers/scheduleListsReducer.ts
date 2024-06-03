import { createReducer } from '@reduxjs/toolkit';
import { ESchedulesActionTypes } from '../actions/types/schedulesActionTypes';
import _ from 'lodash';

import { TFindFoldersResponseStandartPart } from '../../api/ts/interfaces/FindFolders.response';
import {
  TScheduleResponse, TScheduleListsResponse,
} from 'src/api/ts/interfaces/ScheduleLists.response';
import Utils from 'src/helper/utils';
import { TAddRecords, TTogleExpand } from '../actions/callingLitssActions';
import { ICampaignChangeDialAction } from 'src/api/ts/interfaces/Campaigns.payload';
import { TFilter } from 'src/api/ts/interfaces/Filters.response';

export type IItemsInCallingLists = ( TScheduleListsResponse)[];

export interface ICallingListtsRecordsStore {
  [key: number]: any[];
}
export interface IExpand {
  [key: number]: { expand: boolean };
}
export interface ILoading {
  [key: number]: { loading: boolean };
}
// export interface ICallingListtsDataStore {
//   [key: number]: TCallingListsObjectsResponse & { items: IItemsInCallingLists[] };
// }

export interface IUniqueChainId {
  [key: number]: string;
}
export type TPopUp = {
  open: boolean;
  type: string;
  code: number;
  data: string;
  callingListId: number;
  callingListName: string;
};
export type TEditNewRecordPopUp = {
  open: boolean;
  type: 'delete' | 'import' | 'edit' | 'insert' | 'editAll' | 'confirmEditAll' | 'filterConfig' | 'dialing_session' | 'do_not_call_list' |'';
  callback?: () => void;
};

export type TPaginationParams = {
  limit: number;
  sortBy: string;
  offset: number;
  orderBy: 'ASC' | 'DESC';
  useFilter:boolean;
  whereCondition: string;
  orderByCondition: string;
};

export type TExpandParams = {
  item: object;
  flag:boolean;
};

export type TActiveList = {
  name: string;
  id: number;
};

type TCallingListState = {
  loading: boolean;
  confirmDelete: boolean;
  loadingRecords: boolean;
  loadingCallingList:boolean;
  data: IItemsInCallingLists;
  records: ICallingListtsRecordsStore;
  recordsSingle: any[];
  activeList: TScheduleResponse | null;
  activeFolder: any | null | undefined;
  expand: IExpand;
  loadingFolder: ILoading;
  popUp: TPopUp;
  editPopUp: TEditNewRecordPopUp;
  editAllConfirmPopUp: TEditNewRecordPopUp;
  checkedRecords: number[];
  params: TPaginationParams;
  totalCount: number;
  uniqueChainIdcolor: IUniqueChainId;
  filters:TFilter[];
  showOnlyCustomFields:boolean;
  campaignGroupsSchedules:any
  campaignGroupsServers:any

};


const initialState: TCallingListState = {
  campaignGroupsSchedules:[],
  campaignGroupsServers:[],
  loading: true,
  confirmDelete: false,
  loadingCallingList: false,
  loadingRecords: false,
  data: [],
  records: {},
  recordsSingle: [],
  activeList: null,
  activeFolder: null,
  expand: {},
  loadingFolder: {},
  popUp: {
    open: false,
    type: '',
    code: 0,
    data: '',
    callingListId: 0,
    callingListName: '',
  },
  editPopUp: {
    open: false,
    type: '',
    callback: undefined,
  },
  editAllConfirmPopUp: {
    open: false,
    type: '',
    callback: undefined,
  },
  checkedRecords: [],
  params: {
    limit: 25,
    sortBy: 'record_id',
    offset: 0,
    orderBy: 'ASC',
    useFilter:true,
    whereCondition:'',
    orderByCondition:'',
  },
  totalCount: 0,
  uniqueChainIdcolor: {},
  filters:[],
  showOnlyCustomFields:false,
};

export const callingListsReducer = createReducer(initialState, {
  [ESchedulesActionTypes.LOADING]: (state, action: { payload: boolean }) => {
    state.loading = action.payload;
  },
  [ESchedulesActionTypes.LOADING_RECORDS]: (state, action: { payload: boolean }) => {
    state.loadingRecords = action.payload;
  },
  [ESchedulesActionTypes.LOADING_CALLING_LIST]: (state, action: { payload: boolean }) => {
    state.loadingRecords = action.payload;
  },
  [ESchedulesActionTypes.SET]: (state, action: { payload: IItemsInCallingLists }) => {
    state.data = action.payload;
  },
  [ESchedulesActionTypes.ADD_ITEMS]: (
    state,
    action: { payload: { elements: IItemsInCallingLists; id: number } },
  ) => {
    const target = _.get(
      state.data,
      Utils.getObjectPath(state.data, 'id', action.payload.id),
    ) as any;
    const difference = action.payload.elements.filter(
      x =>
        target.items.findIndex((y: any) => {
          return y.id === x.id;
        }) === -1,
    );
    if (difference.length > 0) {
      target.items.push(...difference);
    }
  },
  [ESchedulesActionTypes.ADD_SCHEDULE]: (
    state,
    action: { payload: any },
  ) => {
    if(state.activeFolder?.id){
      const target = _.get(
        state.data,
        Utils.getObjectPath(state.data, 'id', state.activeFolder?.id),
      ) as any;
      target.items.push(action.payload)
    }else{
      state.data.push(action.payload);
    }
  },
  [ESchedulesActionTypes.DELETE_SCHEDULE]: (
    state,
    action: { payload: any },
  ) => {
    if(state.activeList?.id){
      const path = Utils.getObjectPath(state.data, 'id', state.activeList?.id);
      const index = path.pop();
      const target = _.get(
        state.data,
        path,
      ) as any;
      (target || state.data).splice(index, 1);
    }
  },
  [ESchedulesActionTypes.UPDATE_NAME]: (
    state,
    action,
  ) => {
    const current = _.get(
      state.data,
      Utils.getObjectPath(state.data, 'id', action.payload.id),
    ) as any;
    current.name = action.payload.name;

  },
  [ESchedulesActionTypes.ADD_RECORDS]: (state, action: { payload: TAddRecords }) => {
    if(state.activeList){
      state.records[state.activeList.id] = action.payload.elements;
    }
  },
  [ESchedulesActionTypes.ADD_RECORDS_SINGLE]: (state, action: { payload: TAddRecords & { name: string } }) => {
    state.recordsSingle = action.payload.elements;
    state.checkedRecords = [];
  },
  [ESchedulesActionTypes.ADD_ACTIVE]: (state, action: { payload: TScheduleResponse }) => {
    state.activeList = action.payload;
  },
  [ESchedulesActionTypes.ADD_ACTIVE_FOLDER]: (state, action: { payload: any }) => {
    state.activeFolder = action.payload;
  },
  [ESchedulesActionTypes.TOGLE_EXPANDE]: (state, action: { payload: TTogleExpand }) => {
    if (state.expand[action.payload.id]) {
      state.expand[action.payload.id].expand = !state.expand[action.payload.id].expand;
    } else {
      state.expand[action.payload.id] = { expand: true };
    }
  },
  [ESchedulesActionTypes.TOGLE_LOADING]: (state, action: { payload: TTogleExpand }) => {
    if (state.loadingFolder[action.payload.id]) {
      state.loadingFolder[action.payload.id].loading = !state.loadingFolder[action.payload.id].loading;
    } else {
      state.loadingFolder[action.payload.id] = { loading: true };
    }
  },
  [ESchedulesActionTypes.SET_POPUP]: (state, action: { payload: TPopUp }) => {
    state.popUp = action.payload;
  },
  [ESchedulesActionTypes.CONFIRM_DELETE]: (state, action: { payload: any }) => {
    state.confirmDelete = action.payload;
  },
  [ESchedulesActionTypes.SET_EDIT_POPUP]: (state, action: { payload: TEditNewRecordPopUp }) => {
    state.editPopUp = action.payload;
  },
  [ESchedulesActionTypes.SET_EDITAll_POPUP]: (state, action: { payload: TEditNewRecordPopUp }) => {
    state.editAllConfirmPopUp = action.payload;
  },
  [ESchedulesActionTypes.TOGLE_CHECKED_RECCORD]: (state, action: { payload: number }) => {
    const index = state.checkedRecords.indexOf(action.payload);
    if (index > -1) {
      state.checkedRecords.splice(index, 1);
    } else {
      state.checkedRecords.push(action.payload);
    }
  },
  [ESchedulesActionTypes.TOGLE_CHECKED_ALL]: (state, action: { payload: number[] }) => {
    state.checkedRecords = action.payload;
  },

  [ESchedulesActionTypes.SET_TOTAL_COUNT]: (state, action: { payload: number }) => {
    state.totalCount = action.payload;
  },

  [ESchedulesActionTypes.CHENGE_PARAM]: (state, action: { payload: Partial<TExpandParams> }) => {
    console.log(state,action.payload.item,action.payload.flag);
    // state.params = { ...state.params, ...action.payload };
  },

  [ESchedulesActionTypes.UPDATE_COLORS]: (state, action: { payload: IUniqueChainId }) => {
    state.uniqueChainIdcolor = action.payload;
  },

  [ESchedulesActionTypes.USE_FILTER]: (state, action: { payload: boolean }) => {
    state.params.useFilter = action.payload;
  },

  [ESchedulesActionTypes.CHANGE_WHERE_CONDITION]: (state, action: { payload: string }) => {
    state.params.whereCondition = action.payload;
  },

  [ESchedulesActionTypes.CHANGE_ORDER_BY_CONDITION]: (state, action: { payload: string }) => {
    state.params.orderByCondition = action.payload;
  },

  [ESchedulesActionTypes.SET_FILTER]: (state, action: { payload: TFilter[] }) => {
    state.filters = action.payload;
  },
  [ESchedulesActionTypes.SET_SHOW_CUSTOM_FIELDS]: (state, action: { payload: boolean }) => {
    state.showOnlyCustomFields = action.payload;
  },
  [ESchedulesActionTypes.CAMPAIGN_GROUPS_SCHEDULE]: (state, action: { payload: object[] }) => {
    state.campaignGroupsSchedules = action.payload;
  },
  [ESchedulesActionTypes.CAMPAIGN_GROUPS_SERVERS]: (state, action: { payload: object[] }) => {
    state.campaignGroupsServers = action.payload;
  },

});
export default callingListsReducer;
