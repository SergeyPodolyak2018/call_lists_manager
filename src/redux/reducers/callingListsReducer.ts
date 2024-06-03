import { createReducer } from '@reduxjs/toolkit';
import { ECallingListsActionTypes } from '../actions/types/callingListsActionTypes';
import _ from 'lodash';

import { TFindFoldersResponseStandartPart } from '../../api/ts/interfaces/FindFolders.response';
import {
  TCallingListsObjectsResponse,
  TCallingListsResponse,
  TCallingListRecors,
  TCallingListFields,
  TCallingListsExtendedResponse,
  TCallingListsRecordsResponse,
} from 'src/api/ts/interfaces/CallingLists.response';
import Utils from 'src/helper/utils';
import { TAddRecords, TTogleExpand } from '../actions/callingLitssActions';
import { ICampaignChangeDialAction } from 'src/api/ts/interfaces/Campaigns.payload';
import { TFilter } from 'src/api/ts/interfaces/Filters.response';

export type IItemsInCallingLists = (TCallingListsResponse | TCallingListsObjectsResponse)[];

export interface ICallingListtsRecordsStore {
  [key: number]: TCallingListRecors[];
}
export interface IExpand {
  [key: number]: { expand: boolean };
}
export interface ILoading {
  [key: number]: { loading: boolean };
}
export interface ICallingListtsDataStore {
  [key: number]: TCallingListsObjectsResponse & { items: IItemsInCallingLists[] };
}

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

export type TActiveList = {
  name: string;
  id: number;
};

export type TCallingListState = {
  loading: boolean;
  loadingRecords: boolean;
  loadingCallingList:boolean;
  data: IItemsInCallingLists;
  records: ICallingListtsRecordsStore;
  recordsSingle: TCallingListRecors[];
  callingListFields: TCallingListFields[];
  activeList: TCallingListsExtendedResponse | null;
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
  included:TCallingListsRecordsResponse['included'];
  showOnlyCustomFields:boolean;
  negation:boolean;
  tableInfo:{
    totalCount:number;
    filteredCount:number;
    contactsTotalCount:number;
    contactsFilteredCount:number;
  }
  viewingFilter:{
    criteria: string;
    orderBy: string;
    useFilter: boolean;
  }
  callingListsTotal:number;

};


const initialState: TCallingListState = {
  loading: true,
  loadingCallingList: false,
  loadingRecords: false,
  data: [],
  records: {},
  recordsSingle: [],
  callingListFields: [],
  activeList: null,
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
  negation:false,
  params: {
    limit: 25,
    sortBy: 'record_id',
    offset: 0,
    orderBy: 'ASC',
    useFilter:true,
    whereCondition:'',
    orderByCondition:'',
  },
  viewingFilter:{
    criteria: '',
    orderBy: '',
    useFilter: false
  },

  totalCount: 0,
  
  uniqueChainIdcolor: {},
  included:{},
  filters:[],
  showOnlyCustomFields:false,
  tableInfo:{
    totalCount:0,
    filteredCount:0,
    contactsTotalCount:0,
    contactsFilteredCount:0,
  },
  callingListsTotal:0,
};

export const callingListsReducer = createReducer(initialState, {
  [ECallingListsActionTypes.LOADING]: (state, action: { payload: boolean }) => {
    state.loading = action.payload;
  },
  [ECallingListsActionTypes.LOADING_RECORDS]: (state, action: { payload: boolean }) => {
    state.loadingRecords = action.payload;
  },
  [ECallingListsActionTypes.LOADING_CALLING_LIST]: (state, action: { payload: boolean }) => {
    state.loadingRecords = action.payload;
  },
  [ECallingListsActionTypes.SET]: (state, action: { payload: IItemsInCallingLists }) => {
    state.data = action.payload;
  },
  [ECallingListsActionTypes.ADD_ITEMS]: (
    state,
    action: { payload: { elements: IItemsInCallingLists; id: number } },
  ) => {
    const target = _.get(
      state.data,
      Utils.getObjectPath(state.data, 'id', action.payload.id),
    ) as TCallingListsObjectsResponse;
    const difference = action.payload.elements.filter(
      x =>
        target.items.findIndex((y: TCallingListsResponse | TCallingListsObjectsResponse) => {
          return y.id === x.id;
        }) === -1,
    );
    if (difference.length > 0) {
      target.items.push(...difference);
    }
  },
  [ECallingListsActionTypes.ADD_RECORDS]: (state, action: { payload: TAddRecords }) => {
    if(state.activeList){
      state.records[state.activeList.id] = action.payload.elements;
    }
  },
  [ECallingListsActionTypes.ADD_RECORDS_SINGLE]: (state, action: { payload: TAddRecords & { name: string } }) => {
    state.recordsSingle = action.payload.elements;
    state.checkedRecords = [];
  },
  [ECallingListsActionTypes.ADD_FIELDS]: (state, action: { payload: TCallingListFields[] }) => {
    state.callingListFields = action.payload;
  },
  [ECallingListsActionTypes.ADD_ACTIVE]: (state, action: { payload: TCallingListsExtendedResponse }) => {
    state.activeList = action.payload;
  },
  [ECallingListsActionTypes.TOGLE_EXPANDE]: (state, action: { payload: TTogleExpand }) => {
    if (state.expand[action.payload.id]) {
      state.expand[action.payload.id].expand = !state.expand[action.payload.id].expand;
    } else {
      state.expand[action.payload.id] = { expand: true };
    }
  },
  [ECallingListsActionTypes.TOGLE_LOADING]: (state, action: { payload: TTogleExpand }) => {
    if (state.loadingFolder[action.payload.id]) {
      state.loadingFolder[action.payload.id].loading = !state.loadingFolder[action.payload.id].loading;
    } else {
      state.loadingFolder[action.payload.id] = { loading: true };
    }
  },
  [ECallingListsActionTypes.SET_POPUP]: (state, action: { payload: TPopUp }) => {
    state.popUp = action.payload;
  },
  [ECallingListsActionTypes.SET_EDIT_POPUP]: (state, action: { payload: TEditNewRecordPopUp }) => {
    state.editPopUp = action.payload;
  },
  [ECallingListsActionTypes.SET_EDITAll_POPUP]: (state, action: { payload: TEditNewRecordPopUp }) => {
    state.editAllConfirmPopUp = action.payload;
  },
  [ECallingListsActionTypes.TOGLE_CHECKED_RECCORD]: (state, action: { payload: number }) => {
    const index = state.checkedRecords.indexOf(action.payload);
    if (index > -1) {
      state.checkedRecords.splice(index, 1);
    } else {
      state.checkedRecords.push(action.payload);
    }
  },
  [ECallingListsActionTypes.TOGLE_CHECKED_ALL]: (state, action: { payload: number[] }) => {
    state.checkedRecords = action.payload;
  },

  [ECallingListsActionTypes.SET_TOTAL_COUNT]: (state, action: { payload: number }) => {
    state.totalCount = action.payload;
  },

  [ECallingListsActionTypes.CHENGE_PARAM]: (state, action: { payload: Partial<TPaginationParams> }) => {
    state.params = { ...state.params, ...action.payload };
  },

  [ECallingListsActionTypes.UPDATE_COLORS]: (state, action: { payload: IUniqueChainId }) => {
    state.uniqueChainIdcolor = action.payload;
  },

  [ECallingListsActionTypes.USE_FILTER]: (state, action: { payload: boolean }) => {
    state.params.useFilter = action.payload;
  },

  [ECallingListsActionTypes.CHANGE_WHERE_CONDITION]: (state, action: { payload: string }) => {
    state.params.whereCondition = action.payload;
  },

  [ECallingListsActionTypes.CHANGE_ORDER_BY_CONDITION]: (state, action: { payload: string }) => {
    state.params.orderByCondition = action.payload;
  },

  [ECallingListsActionTypes.SET_FILTER]: (state, action: { payload: TFilter[] }) => {
    state.filters = action.payload;
  },
  [ECallingListsActionTypes.SET_INCLUDED]: (state, action: { payload: TCallingListsRecordsResponse['included'] }) => {
    state.included = action.payload;
  },
  [ECallingListsActionTypes.SET_SHOW_CUSTOM_FIELDS]: (state, action: { payload: boolean }) => {
    state.showOnlyCustomFields = action.payload;
  },
  [ECallingListsActionTypes.SET_NEGATION]: (state, action: { payload: boolean }) => {
    state.negation = action.payload;
  },
  [ECallingListsActionTypes.SET_TABLE_INFO]: (state, action: { payload: TCallingListState['tableInfo'] }) => {
    state.tableInfo = action.payload;
  },
  [ECallingListsActionTypes.SET_VIEWING_FILTER]: (state, action: { payload: TCallingListState['viewingFilter'] }) => {
    state.viewingFilter = action.payload;
  },
  [ECallingListsActionTypes.SET_LISTS_TOTAL]: (state, action: { payload: number}) => {
    state.callingListsTotal = action.payload;
  },

});
export default callingListsReducer;
