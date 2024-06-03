import restApi from '../../api/rest';
import { ICampaignStatus } from '../../api/ts/interfaces/Campaigns.response';
import Logger from '../../helper/logger';
import {
  ICampaignChangeDialAction,
  TGetCampaignObjectPayload,
  ICampaignsToggle,
} from 'src/api/ts/interfaces/Campaigns.payload';

import { AppDispatch, GetRootState } from '../store';

import { ECampaignActionTypes } from './types/campaignActionTypes';
import { TFindFoldersPayload } from '../../api/ts/interfaces/FindFolders.payload';
import {
  TFindFoldersResponseStandartPart,
  TFindFoldersResponse,
  TCfgCampaignGroup,
  IFoundCfgCampaignGroup,
} from '../../api/ts/interfaces/FindFolders.response';
import { callingListDistributor } from '../../utils/folderUtils';
import { getAllStatusSelector, getCampaignsFilterByStatus } from '../selectors/campaignSelectors';
import { ICampaignStatusStore } from '../reducers/campaignsReducer';
import { CampaignStatuses, CampaignStatusesMapReverse } from 'src/api/ts/constants/codes';

export const getCampaignAction = (payload: TFindFoldersPayload) => {
  return async (dispatch: AppDispatch) => {
    // dispatch(campaignLoaderAction(true));
    // restApi
    //   .getCampaignsAll(payload)
    //   .then(data => {
    //     dispatch(campaignLoaderAction(false));
    //     const standartPart: TFindFoldersResponseStandartPart[] = data.data[0].items || [];
    //     const newData = callingListDistributor(standartPart);
    //     // dispatch(setCampaignsAction(newData));
    //   })
    //   .catch(err => {
    //     dispatch(campaignLoaderAction(false));
    //     Logger.error(err.message);
    //   });
  };
};

export const getPartCampaingsAction = (
  initial: boolean,
  folderType: number,
  payload: TFindFoldersPayload,
  parentId?: number,
  getCampaignGroups?: boolean,
) => {
  return async (dispatch: AppDispatch) => {
    if (getCampaignGroups) {
      restApi
        .getCampaignGroups(payload)
        .then(data => {
          dispatch(campaignLoaderAction(false));
          data.data.map(item => {
            dispatch(updateCampaignsAction({ ...item, parentId: parentId }));
          });
        })
        .catch(err => {
          Logger.error(err.message);
        });
    } else {
      restApi
        .getCampaignsDeep(folderType, payload)
        .then(data => {
          dispatch(campaignLoaderAction(false));
          if (initial) {
            data.data.map(item => {
              dispatch(updateCampaignsRootAction(item));
            });
          } else {
            data.data.map(item => {
              dispatch(updateCampaignsAction({ ...item, parentId: parentId ? parentId : payload.parentId }));
            });
          }
        })
        .catch(err => {
          Logger.error(err.message);
        });
    }
  };
};

export const searchCampaignsObjects = (payload: TGetCampaignObjectPayload) => {
  return async (dispatch: AppDispatch, getstate: GetRootState) => {
    const allStatuses = getAllStatusSelector(getstate());
    const filter = getCampaignsFilterByStatus(getstate());
    restApi
      .getCampaignGroups(payload)
      .then(data => {
        if (!payload.parentId || Object.keys(payload).length === 0) {
          const normalitheData = Array.isArray(data.data) ? data.data : [data.data];
          if (filter !== 'Any Status') {
            const combinedArray = normalitheData.map(item => ({
              ...item,
              status: allStatuses.find(
                status => status.campaignId === item.campaignId && status.groupId === item.groupId,
              ),
            }));
            dispatch(setCampaignsSearchAction({ campaigns: combinedArray, isSearching: true }));
            dispatch(
              setTotalCampaignsCount(
                combinedArray.filter(
                  item =>
                    item.status &&
                    item.status.campaignStatus.toString() ===
                      CampaignStatusesMapReverse[filter as keyof typeof CampaignStatusesMapReverse],
                ).length,
              ),
            );
          } else {
            dispatch(setTotalCampaignsCount(normalitheData.length));
            if (payload.name !== '' && payload.name) {
              dispatch(setCampaignsSearchAction({ campaigns: normalitheData, isSearching: true }));
            } else {
              dispatch(setCampaignsSearchAction({ campaigns: [], isSearching: false }));
            }
          }
        }
      })
      .catch(err => {
        Logger.error(err.message);
      });
  };
};

export const getCampaignActionById = (type: number, id: number) => {
  return async (dispatch: AppDispatch, getstate: GetRootState) => {
    const payload: TFindFoldersPayload = {
      limit: 25,
      parentId: 0,
      id,
    };

    restApi
      .getCampaignsDeep(type, payload)
      .then(data => {
        // data.data.map(item => {
        //   dispatch(updateCampaignsAction(item));
        // });
      })
      .catch(err => {
        dispatch(campaignLoaderAction(false));
        Logger.error(err.message);
      });
  };
};

export const getStatuses = () => {
  return async (dispatch: AppDispatch, getstate: GetRootState) => {};
};

export const setCurrentProperties = (data: ICampaignChangeDialAction) => ({
  type: ECampaignActionTypes.SET_PROPERTIES,
  payload: data,
});
export const setCampaingsToggle = (data: ICampaignsToggle) => ({
  type: ECampaignActionTypes.SET_CAMPAIGNS_TOGGLE,
  payload: data,
});

export const campaignLoaderAction = (data: boolean) => ({
  type: ECampaignActionTypes.LOADING,
  payload: data,
});
export const setCampaignsAction = (data: TFindFoldersResponse[]) => ({
  type: ECampaignActionTypes.SET,
  payload: data,
});
export const setCampaignsSearchAction = (data: IFoundCfgCampaignGroup) => ({
  type: ECampaignActionTypes.SET_SEARCH,
  payload: data,
});
export const updateCampaignsAction = (data: TFindFoldersResponse | TCfgCampaignGroup) => ({
  type: ECampaignActionTypes.UPDATE,
  payload: data,
});
export const updateCampaignsRootAction = (data: TFindFoldersResponse | TCfgCampaignGroup) => ({
  type: ECampaignActionTypes.UPDATE_ROOT,
  payload: data,
});
export const setCampaignsStatuses = (data: ICampaignStatusStore) => ({
  type: ECampaignActionTypes.SET_STATUS,
  payload: data,
});
export const setCampaignsStatusesSingle = (data: ICampaignStatus) => ({
  type: ECampaignActionTypes.ADD_SINGLE_STATUS,
  payload: data,
});

export const setStatusFilterBy = (data: string) => ({
  type: ECampaignActionTypes.SET_STATUS_FILTER,
  payload: data,
});

export const selectCampaignGroup = (data: TCfgCampaignGroup) => ({
  type: ECampaignActionTypes.SELECT_CAMPAIGN_GROUP,
  payload: data,
});

export const saveCampaignConfig = (data: ICampaignChangeDialAction) => ({
  type: ECampaignActionTypes.ADD_PROPERTIES_SAVE_CONFIG,
  payload: data,
});

export const setSelectedCampaignStatus = (data: CampaignStatuses) => ({
  type: ECampaignActionTypes.SET_SELECTED_CAMPAIGN_STATUS,
  payload: data,
});

export const setTotalCampaignsCount = (data: number) => ({
  type: ECampaignActionTypes.SET_TOTAL_CAMPAIGNS_COUNT,
  payload: data,
});
