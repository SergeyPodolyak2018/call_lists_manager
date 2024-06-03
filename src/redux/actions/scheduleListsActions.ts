import restApi from '../../api/rest';
import Logger from '../../helper/logger';

import { AppDispatch, GetRootState } from '../store';

import { ESchedulesActionTypes } from './types/schedulesActionTypes';
import {
  callingItemsItemsDistributor,
  callingObjectItemsDistributor,
} from 'src/utils/folderUtils';
import {
  IItemsInCallingLists,
  IUniqueChainId,
  TEditNewRecordPopUp, TExpandParams,
  TPaginationParams,
  TPopUp,
} from '../reducers/scheduleListsReducer';

import {
  getActiveFolderSelector,
  getActiveListSelector,
  getPaginationParams,
} from '../selectors/schedulesListsSelectors';
import { Toast } from '@genesys/arkui-react';
import { IToast } from 'src/component/ToastProvider';
import { TFilter } from 'src/api/ts/interfaces/Filters.response';
import { TFindFoldersPayload } from '../../api/ts/interfaces/FindFolders.payload';

type TAddItemsToParent = {
  elements: IItemsInCallingLists;
  id: number;
};
export type TTogleExpand = {
  id: number;
};

export const getSchedules = (payload: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch(callingListsLoaderAction(true));
    if ('parentId' in payload && typeof payload.parentId === 'number') {
      dispatch(setLoadingCallingListsFolders({ id: payload.parentId }));
    }
    Promise.all([
      'name' in payload ? Promise.resolve([]) : restApi.getSchedulesFolders(payload),
      restApi.getSchedulesLists(payload)
    ]).then((adata:any) => {
        const data = adata.map((o:any)=>o.data).reduce((a:any,b:any)=>a.concat(b),[]).filter((o:any)=>o);
        dispatch(callingListsLoaderAction(false));
        if (Object.keys(payload).length === 0 || 'name' in payload) {
          const updatedObj = callingObjectItemsDistributor(data) as any;
          dispatch(setCallingListsObjectsAction(updatedObj));
        }
        if ('parentId' in payload && payload.parentId !== 0) {
          const updatedObj = callingItemsItemsDistributor(data);

          dispatch(setCallingListsToParentObjectsAction({ elements: updatedObj, id: payload.parentId as number }));
          if (payload.parentId && typeof payload.parentId === 'number') {
            dispatch(setLoadingCallingListsFolders({ id: payload.parentId }));
            dispatch(setExpandCallingListsRecords({ id: payload.parentId }));
          }
        }
      })
      .catch(err => {
        if (payload.parentId && typeof payload.parentId === 'number') {
          dispatch(setLoadingCallingListsFolders({ id: payload.parentId }));
        }
        dispatch(callingListsLoaderAction(false));
        Logger.error(err.message);
      });
  };
};

const toggleExpand = (items:any, flag:boolean) => {
  (items || []).forEach((item:any) => {
    if (item.items) {
      if(!('expanded' in item))item.expanded = flag;
      toggleExpand(item.items, flag);
    }
  });
};

export const getSchedule = (payload: any & { name?: string }) => {
  return async (dispatch: AppDispatch, getstate: GetRootState) => {
    try {
      // dispatch(callingListsLoaderAction(true));
      // dispatch(callingListsLoaderRecordsAction(true));
      const callingList = await restApi.getSchedule({ listId: payload.listId,  extended:true}) as any;
      // const filters = await restApi.getcustomerFilters({formatId:callingList.data.tableAccess.format.id})
      
      // await dispatch(getCallingListsRecords({listId:callingList.data.id, name:callingList.data.name}))
      // dispatch(setListFields(callingList.data.tableAccess.format.fields));
      // dispatch(callingListsSetFiltersAction(filters.data));

      callingList.description = callingList.description || ''


      toggleExpand(callingList.data.schedule,  false)
      dispatch(setScheduleActive(callingList.data));
      // dispatch(callingListsLoaderAction(false));
      
    } catch (err: any) {
      //dispatch(resetCallingListsDbTable());
      Logger.error(err.message);
    }
  };
};
export const putCallingList= (payload: any) => {
  return async (dispatch: AppDispatch, getstate: GetRootState) => {
    dispatch(callingListsLoaderAction(true));
    try {
      await restApi.putCallingList(payload);
      await dispatch(getSchedule({listId:payload.listId}))
      return Promise.resolve();
    } catch (err: any) {
      if (err && err.response && err.response.data.status && err.response.data.status.code === 651) {
        const message: IToast = {
          title: `Calling list filter`,
          message: err.response.data.status.details.map((el:any)=>el.status.message).join(' '),
          type: err.response.data.status.code,
        };
        document.dispatchEvent(new CustomEvent('toastMessage', { detail: { data: message } }));
      }
      dispatch(callingListsLoaderAction(false));
      Logger.error(err.message);
    }
  };
};



export const deleteListsRecord = (data :any) => {
  return async (dispatch: AppDispatch, getstate: GetRootState) => {
    const activeList = getActiveListSelector(getstate());
    // const checkedRecords = getCheckedRecords(getstate());
    if(!activeList) return;
    const payload = {
      listId: data.id || activeList.id,
      // name: activeList.name,
      // data: {
      //   recordIds: checkedRecords,
      //   negation: false,
      // },
    };
    try {
      // dispatch(callingListsLoaderRecordsAction(true));
      const resp = await restApi.deleteSchedule(payload);

      dispatch(setConfirmDeleteSelector(false));
      dispatch(deleteSchedule(undefined));
      dispatch(setScheduleActive(undefined));
      // const message = checkedRecords.length === 1 ? 'Record deleted' : `${checkedRecords.length} records deleted`;
      const toastData: IToast = {
        title: `Schedule - ${activeList.name}`,
        message: 'Deleted',
        type: resp.status.code,
      };
      document.dispatchEvent(new CustomEvent('toastMessage', { detail: { data: toastData } }));
      // dispatch(
      //   getCallingListsRecords({
      //     listId: activeList.id,
      //   }),
      // );
    } catch (err: any) {
      dispatch(callingListsLoaderRecordsAction(false));
      Logger.error(err.message);
    }
  };
};
export const putListsRecord = (schedule: Partial<any>) => {
  return async (dispatch: AppDispatch, getstate: GetRootState) => {
    const activeList = getActiveListSelector(getstate());
    //
    // if(!activeList) return;
    const payload = {
      schedule,
    };
    // try {
    //   dispatch(callingListsLoaderRecordsAction(true));
      const resp = await restApi.putSchedule(payload, activeList.id);

      const data: IToast = {
        title: `Schedule - ${activeList.name}`,
        message: 'Updated',
        type: resp.status.code,
      };
      document.dispatchEvent(new CustomEvent('toastMessage', { detail: { data } }));
    //   dispatch(
    //     getCallingListsRecords({
    //       listId: activeList.id
    //     }),
    //   );
    //   return Promise.resolve();
    // } catch (err: any) {
    //   dispatch(callingListsLoaderRecordsAction(false));
    //   return Promise.reject(err);
    //   Logger.error(err.message);
    // }
  };
};
export const postListsRecord = (schedule: Partial<any>) => {
  return async (dispatch: AppDispatch, getstate: GetRootState) => {
    const activeList = getActiveListSelector(getstate());
    const activeFolder = getActiveFolderSelector(getstate());
    if(!activeList) return;
    const payload = {
      folderId: activeFolder.id > -1 ? activeFolder.id : undefined,

      schedule
    };
    try {
      dispatch(callingListsLoaderRecordsAction(true));
      const resp = await restApi.postSchedule(payload);
      const data: IToast = {
        title: `Schedule`,
        message: `New schedule created in ${activeFolder.name || 'root'} folder`,
        type: resp.status.code,
      };
      document.dispatchEvent(new CustomEvent('toastMessage', { detail: { data } }));
      // dispatch(
      //   getCallingListsRecords({
      //     listId: activeList.id,
      //   }),
      // );
      // dispatch(addSchedule({  }))
      dispatch(addSchedule(resp.data))
      return Promise.resolve();
    } catch (err: any) {
      dispatch(callingListsLoaderRecordsAction(false));
      Logger.error(err.message);
      return Promise.reject(err);
    }
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
    // if (getCampaignGroups) {
      restApi
        .getCampaignGroups(payload)
        .then(data => {
          // console.log(data.data);
          dispatch(campaignGroupsSchedule(data.data));
          // data.data.map(item => {
          //   dispatch(updateCampaignsAction({ ...item, parentId: parentId }));
          // });
        })
        .catch(err => {
          Logger.error(err.message);
        });
    // } else {
    //   restApi
    //     .getCampaignsDeep(folderType, payload)
    //     .then(data => {
    //       dispatch(campaignLoaderAction(false));
    //       if (initial) {
    //         data.data.map(item => {
    //           dispatch(updateCampaignsRootAction(item));
    //         });
    //       } else {
    //         data.data.map(item => {
    //           dispatch(updateCampaignsAction({ ...item, parentId: parentId ? parentId : payload.parentId }));
    //         });
    //       }
    //     })
    //     .catch(err => {
    //       Logger.error(err.message);
    //     });
    // }
  };
};


export const getCampaingServers = (

) => {
  return async (dispatch: AppDispatch) => {
    // if (getCampaignGroups) {
      restApi
        .getCampaignServers()
        .then(data => {
          // console.log(data.data);
          dispatch(campaignGroupsServers(data.data));
          // data.data.map(item => {
          //   dispatch(updateCampaignsAction({ ...item, parentId: parentId }));
          // });
        })
        .catch(err => {
          Logger.error(err.message);
        });
    // } else {
    //   restApi
    //     .getCampaignsDeep(folderType, payload)
    //     .then(data => {
    //       dispatch(campaignLoaderAction(false));
    //       if (initial) {
    //         data.data.map(item => {
    //           dispatch(updateCampaignsRootAction(item));
    //         });
    //       } else {
    //         data.data.map(item => {
    //           dispatch(updateCampaignsAction({ ...item, parentId: parentId ? parentId : payload.parentId }));
    //         });
    //       }
    //     })
    //     .catch(err => {
    //       Logger.error(err.message);
    //     });
    // }
  };
};



export const changePagination = (data: Partial<TPaginationParams>) => {
  return async (dispatch: AppDispatch, getstate: GetRootState) => {
    const activeList = getActiveListSelector(getstate());
    if(!activeList) return;
    const payload = {
      listId: activeList.id,
      ...data,
      name: activeList.name,
    };
    
    dispatch(getSchedules(payload))
  };
};
export const callingListsLoaderAction = (data: boolean) => ({
  type: ESchedulesActionTypes.LOADING,
  payload: data,
});
export const setConfirmDeleteSelector = (data: boolean) => ({
  type: ESchedulesActionTypes.CONFIRM_DELETE,
  payload: data,
});
export const callingListsLoaderRecordsAction = (data: boolean) => ({
  type: ESchedulesActionTypes.LOADING_RECORDS,
  payload: data,
});
export const callingListLoaderAction = (data: boolean) => ({
  type: ESchedulesActionTypes.LOADING_CALLING_LIST,
  payload: data,
});

export const setCallingListsObjectsAction = (data: IItemsInCallingLists) => ({
  type: ESchedulesActionTypes.SET,
  payload: data,
});
export const setCallingListsToParentObjectsAction = (data: any) => ({
  type: ESchedulesActionTypes.ADD_ITEMS,
  payload: data,
});
export const addSchedule = (data: any) => ({
  type: ESchedulesActionTypes.ADD_SCHEDULE,
  payload: data,
});
export const deleteSchedule = (data: any) => ({
  type: ESchedulesActionTypes.DELETE_SCHEDULE,
  payload: data,
});
export const setCallingListsRecords = (data: any & { name: string }) => ({
  type: ESchedulesActionTypes.ADD_RECORDS,
  payload: data,
});
export const setCallingListsRecordsSingle = (data: any) => ({
  type: ESchedulesActionTypes.ADD_RECORDS_SINGLE,
  payload: data,
});
export const setScheduleActive = (data: any | undefined) => ({
  type: ESchedulesActionTypes.ADD_ACTIVE,
  payload: data,
});
export const setScheduleFolderActive = (data: any | undefined) => ({
  type: ESchedulesActionTypes.ADD_ACTIVE_FOLDER,
  payload: data,
});
export const setExpandCallingListsRecords = (data: TTogleExpand) => ({
  type: ESchedulesActionTypes.TOGLE_EXPANDE,
  payload: data,
});
export const setLoadingCallingListsFolders = (data: TTogleExpand) => ({
  type: ESchedulesActionTypes.TOGLE_LOADING,
  payload: data,
});

export const setPopUpAction = (data: TPopUp) => ({
  type: ESchedulesActionTypes.SET_POPUP,
  payload: data,
});
export const setEditPopUpAction = (data: TEditNewRecordPopUp) => ({
  type: ESchedulesActionTypes.SET_EDIT_POPUP,
  payload: data,
});
export const setEditSubPopUpAction = (data: TEditNewRecordPopUp) => ({
  type: ESchedulesActionTypes.SET_EDITAll_POPUP,
  payload: data,
});
export const setCheckerdRecords = (data: number) => ({
  type: ESchedulesActionTypes.TOGLE_CHECKED_RECCORD,
  payload: data,
});
export const togledCheckAllRecords = (data: number[]) => ({
  type: ESchedulesActionTypes.TOGLE_CHECKED_ALL,
  payload: data,
});
export const setTotalCountAction = (data: number) => ({
  type: ESchedulesActionTypes.SET_TOTAL_COUNT,
  payload: data,
});
export const setParamsAction = (data: Partial<TExpandParams>) => ({
  type: ESchedulesActionTypes.CHENGE_PARAM,
  payload: data,
});
export const setColorsAction = (data: IUniqueChainId) => ({
  type: ESchedulesActionTypes.UPDATE_COLORS,
  payload: data,
});
export const setName = (data: any) => ({
  type: ESchedulesActionTypes.UPDATE_NAME,
  payload: data,
});
export const callingListsUseFilterAction = (data: boolean) => ({
  type: ESchedulesActionTypes.USE_FILTER,
  payload: data,
});
export const callingListsSetFiltersAction = (data: TFilter[]) => ({
  type: ESchedulesActionTypes.SET_FILTER,
  payload: data,
});

export const callingListsSetWhereConditionAction = (data: string) => ({
  type: ESchedulesActionTypes.CHANGE_WHERE_CONDITION,
  payload: data,
});

export const campaignGroupsSchedule = (data: object[]) => ({
  type: ESchedulesActionTypes.CAMPAIGN_GROUPS_SCHEDULE,
  payload: data,
});

export const campaignGroupsServers = (data: object[]) => ({
  type: ESchedulesActionTypes.CAMPAIGN_GROUPS_SERVERS,
  payload: data,
});
