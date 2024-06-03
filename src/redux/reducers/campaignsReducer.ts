import { createReducer } from '@reduxjs/toolkit';
import { ECampaignActionTypes } from '../actions/types/campaignActionTypes';
import { ICampaignStatus } from '../../api/ts/interfaces/Campaigns.response';
import {
  TFindFoldersResponse,
  TFindFoldersResponseStandartPart,
  TCfgCampaignGroup,
  IFoundCfgCampaignGroup,
  TCfgCampaignFolder,
} from '../../api/ts/interfaces/FindFolders.response';
import Utils from '../../helper/utils';
import { set as _set, identity } from 'lodash';
import { ICampaignChangeDialAction, ICampaignsToggle, Properties } from 'src/api/ts/interfaces/Campaigns.payload';
import { CampaignStatuses, CampaignStatusesMap } from 'src/api/ts/constants/codes';

export interface ICampaignStatusStore {
  [key: string]: ICampaignStatus;
}

type TCompaignState = {
  loading: boolean;
  data: TFindFoldersResponseStandartPart[];
  status: ICampaignStatus[];
  selectedCampaignGroup: TCfgCampaignGroup | undefined;
  properties: ICampaignChangeDialAction;
  savedProretries: ICampaignChangeDialAction[];
  selectedCampaignStatus: CampaignStatuses;
  foundCampaigns: IFoundCfgCampaignGroup;
  totalCampaignsCount: number;
  campaignsToggle: ICampaignsToggle;
  filterByStatus: string;
};
const initialState: TCompaignState = {
  loading: true,
  data: [],
  status: [],
  selectedCampaignGroup: undefined,
  properties: {
    campaignId: 0,
    groupId: 0,
    completeIfNoMoreRecords: false,
    dialMode: '',
    optMethod: '',
    optMethodValue: 0,
    ocsId: 0,
    requestProperties: {},
  },
  savedProretries: [],
  selectedCampaignStatus: CampaignStatuses.NotLoaded,
  foundCampaigns: { campaigns: [], isSearching: false },
  totalCampaignsCount: 0,
  campaignsToggle: { collapse: false, expand: false },
  filterByStatus: 'Any Status',
};

export const campaignReducer = createReducer(initialState, {
  [ECampaignActionTypes.LOADING]: (state, action: { payload: boolean }) => {
    state.loading = action.payload;
  },

  [ECampaignActionTypes.SET]: (state, action: { payload: TFindFoldersResponseStandartPart[] }) => {
    state.data = action.payload;
  },

  [ECampaignActionTypes.UPDATE]: (state, action: { payload: TFindFoldersResponse | TCfgCampaignGroup }) => {
    const id = Array.isArray(action.payload) ? action.payload[0].parentId : action.payload.parentId;
    const path = Utils.getObjectPathForCampaigns(state.data, 'id', id);
    if (!action.payload) return;
    _set(state.data, path, Array.isArray(action.payload) ? action.payload[0] : action.payload);
  },

  [ECampaignActionTypes.UPDATE_ROOT]: (state, action: { payload: TFindFoldersResponseStandartPart }) => {
    state.data.push(action.payload);
  },
  [ECampaignActionTypes.SET_SEARCH]: (state, action: { payload: IFoundCfgCampaignGroup }) => {
    state.foundCampaigns = action.payload;
  },
  [ECampaignActionTypes.SET_STATUS]: (state, action: { payload: ICampaignStatus }) => {
    const index = state.status.findIndex(
      item => item.campaignId === action.payload.campaignId && item.groupId === action.payload.groupId,
    );

    if (index !== -1) {
      state.status[index] = action.payload;
    } else {
      state.status.push(action.payload);
    }
  },

  [ECampaignActionTypes.SELECT_CAMPAIGN_GROUP]: (state, action: { payload: TCfgCampaignGroup }) => {
    state.selectedCampaignGroup = {
      ...state.selectedCampaignGroup,
      ...action.payload,
    };
  },
  [ECampaignActionTypes.SET_CAMPAIGNS_TOGGLE]: (state, action: { payload: ICampaignsToggle }) => {
    state.campaignsToggle = action.payload;
  },

  [ECampaignActionTypes.SET_PROPERTIES]: (state, action: { payload: ICampaignChangeDialAction }) => {
    state.properties = action.payload;
  },

  [ECampaignActionTypes.SET_STATUS_FILTER]: (state, action: { payload: string }) => {
    state.filterByStatus = action.payload;
  },

  [ECampaignActionTypes.ADD_PROPERTIES_SAVE_CONFIG]: (state, action: { payload: ICampaignChangeDialAction }) => {
    const existingIndex = state.savedProretries.findIndex(
      item => item.groupId === action.payload.groupId && item.campaignId === action.payload.campaignId,
    );

    if (existingIndex !== -1 && (action.payload.dialMode === 'NoDialMode' || !action.payload.dialMode)) {
      state.savedProretries.splice(existingIndex, 1);
      return;
    }

    if (existingIndex !== -1) {
      state.savedProretries = state.savedProretries.map((existingItem, index) =>
        index === existingIndex ? { ...existingItem, ...action.payload } : existingItem,
      );
    } else {
      state.savedProretries.push(action.payload);
    }
  },

  [ECampaignActionTypes.SET_SELECTED_CAMPAIGN_STATUS]: (state, action: { payload: CampaignStatuses }) => {
    state.selectedCampaignStatus = action.payload;
  },
  [ECampaignActionTypes.SET_TOTAL_CAMPAIGNS_COUNT]: (state, action: { payload: number }) => {
    state.totalCampaignsCount = action.payload;
  },
});
export default campaignReducer;
