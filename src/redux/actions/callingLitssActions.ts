import restApi from '../../api/rest';
import Logger from '../../helper/logger';
import fileDownload from 'js-file-download';

import { AppDispatch, GetRootState } from '../store';

import {
  TGetCallingListObjectPayload,
  TGetCallingListRecordsPayload,
  TPutCallingListById,
} from 'src/api/ts/interfaces/CallingLists.payload';
import { ECallingListsActionTypes } from './types/callingListsActionTypes';
import {
  callingItemsItemsDistributor,
  callingObjectItemsDistributor,
  chainIdColorsUpdater,
  fieldsQueueBuilder,
} from 'src/utils/folderUtils';
import {
  ICallingListtsDataStore,
  IItemsInCallingLists,
  IUniqueChainId,
  TCallingListState,
  TEditNewRecordPopUp,
  TPaginationParams,
  TPopUp,
} from '../reducers/callingListsReducer';
import {
  TCallingListFields,
  TCallingListRecors,
  TCallingListsExtendedResponse,
  TCallingListsObjectsResponse,
  TCallingListsRecordsResponse,
} from 'src/api/ts/interfaces/CallingLists.response';
import {
  getActiveListSelector,
  getCheckedRecords,
  getColorsSelector,
  getNegation,
  getPaginationParams,
  getUseFilterSelector,
  getViewingFilterSelector,
  getWhereConditionSelector,
  isRecordsExistSelector,
} from '../selectors/callingListsSelectors';
import { Toast } from '@genesys/arkui-react';
import { IToast } from 'src/component/ToastProvider';
import { TFilter } from 'src/api/ts/interfaces/Filters.response';
import { callingListInclude } from '../constants';

type TAddItemsToParent = {
  elements: IItemsInCallingLists;
  id: number;
};
export type TAddRecords = {
  elements: TCallingListRecors[];
};
export type TTogleExpand = {
  id: number;
};

export const getCallingListsTotal = () => {
  return async (dispatch: AppDispatch) => {
    restApi
      .getCallingListsTotal()
      .then(data => {
        dispatch(setCallingListTotalAction(data.data));
      })
      .catch(err => {
        Logger.error(err.message);
      });
  };
};

export const getCallingListsObjects = (payload: TGetCallingListObjectPayload) => {
  return async (dispatch: AppDispatch) => {
    dispatch(callingListsLoaderAction(true));
    if ('parentId' in payload && typeof payload.parentId === 'number') {
      dispatch(setLoadingCallingListsFolders({ id: payload.parentId }));
    }
    restApi
      .getCallingListsObject(payload)
      .then(data => {
        dispatch(callingListsLoaderAction(false));
        if (Object.keys(payload).length === 0) {
          const updatedObj = callingObjectItemsDistributor(data.data as IItemsInCallingLists);
          dispatch(setCallingListsObjectsAction(updatedObj));
        }
        if ('parentId' in payload) {
          const updatedObj = callingItemsItemsDistributor(data.data);
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
export const searchCallingListsObjects = (payload: TGetCallingListObjectPayload) => {
  return async (dispatch: AppDispatch) => {
    dispatch(callingListsLoaderAction(true));
    restApi
      .getCallingListsAll(payload)
      .then(data => {
        if (!payload.parentId || Object.keys(payload).length === 0) {
          const normalitheData = Array.isArray(data.data) ? data.data : [data.data];
          const updatedObj = callingObjectItemsDistributor(normalitheData as IItemsInCallingLists);
          dispatch(setCallingListsObjectsAction(updatedObj));
          dispatch(setCallingListTotalAction(updatedObj.length));
        }
      })
      .catch(err => {
        dispatch(resetCallingListsDbTable());
        Logger.error(err.message);
      });
  };
};

export const getCallingList = (payload: TGetCallingListRecordsPayload & { name?: string }) => {
  return async (dispatch: AppDispatch, getstate: GetRootState) => {
    try {
      dispatch(callingListsLoaderAction(true));
      dispatch(callingListsLoaderRecordsAction(true));
      const callingList = await restApi.getCallingList({ listId: payload.listId,  extended:true});
      const filters = await restApi.getcustomerFilters({formatId:callingList.data.tableAccess.format.id})
      
      await dispatch(getCallingListsRecords({
        listId:callingList.data.id, 
        name:callingList.data.name, 
        ...(typeof payload.offset === 'number' && { offset: payload.offset }),
        ...(callingList.data.viewingFilter.useFilter?{
          orderByCondition:callingList.data.viewingFilter.orderBy,
          whereCondition:callingList.data.viewingFilter.criteria
        }:{
          orderByCondition:'',
          whereCondition:''
        })
      }));
      dispatch(setListFields(fieldsQueueBuilder(callingList.data.tableAccess.format.fields)));
      dispatch(callingListsSetFiltersAction(filters.data));
      dispatch(setCallingListsActive(callingList.data));
      dispatch(setViewingFilterAction(callingList.data.viewingFilter));
      dispatch(callingListsSetWhereConditionAction(callingList.data.viewingFilter.criteria));
      dispatch(callingListsSetOrderByConditionAction(callingList.data.viewingFilter.orderBy));
      dispatch(callingListsLoaderAction(false));
      
    } catch (err: any) {
      //dispatch(resetCallingListsDbTable());
      Logger.error(err.message);
    }
  };
};

export const getFilters = () => {
  return async (dispatch: AppDispatch, getstate: GetRootState) => {
    try {
      const activeList = getActiveListSelector(getstate()) as TCallingListsExtendedResponse;
      const filters = await restApi.getcustomerFilters({formatId:activeList.tableAccess.format.id})
      dispatch(callingListsSetFiltersAction(filters.data));  
    } catch (err: any) {
      Logger.error(err.message);
    }
  };
};

export const putCallingList= (payload: TPutCallingListById) => {
  return async (dispatch: AppDispatch, getstate: GetRootState) => {
    dispatch(callingListsLoaderAction(true));
    try {
      await restApi.putCallingList(payload);
      await dispatch(getCallingList({listId:payload.listId, offset:0}))
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

export const getCallingListsRecords = (payload: TGetCallingListRecordsPayload & {name?:string}) => {
  return async (dispatch: AppDispatch, getstate: GetRootState) => {
    const params = getPaginationParams(getstate());
    const oldColors = getColorsSelector(getstate());
    const activeList = getActiveListSelector(getstate())
    try {
      dispatch(callingListsLoaderRecordsAction(true));
      const records = await restApi.getCallingListsRecords({ ...params, ...payload, ...{include:callingListInclude} });
      const newColors = chainIdColorsUpdater(records.data.results, oldColors);
      dispatch(callingListsLoaderRecordsAction(false));
      dispatch(
        setIncludedAction(records.data.included),
      );
      dispatch(
        setCallingListsRecordsSingle({ elements: records.data.results}),
      );      
      dispatch(setTotalCountAction(records.data.filteredCount || (records.data.totalCount>0 && records.data.results.length===0?0:records.data.totalCount)));
      dispatch(setTableInfoAction({
        totalCount:records.data.totalCount,
        filteredCount:records.data.filteredCount || 0,
        contactsTotalCount:records.data.contactsTotalCount,
        contactsFilteredCount:records.data.contactsFilteredCount || 0,
      }));
      dispatch(setColorsAction(newColors));
      const newParams:Partial<TGetCallingListRecordsPayload> = {...payload};
      if('listId' in newParams){
        delete newParams.listId
      }
      if('whereCondition' in newParams){
        delete newParams.whereCondition
      }
      if('orderByCondition' in newParams){
        delete newParams.orderByCondition
      }
      dispatch(setParamsAction({ 
        ...params, 
        ...newParams
      }));
      // return Promise.resolve();
    } catch (err: any) {
      if (err && err.response && err.response.data.status && err.response.data.status.code === 604) {
        dispatch(
          setPopUpAction({
            open: true,
            code: err.response.data.status.code as number,
            type: 'createTable',
            data: err.response.data.status.message,
            callingListId: payload.listId,
            callingListName: payload.name || activeList.name,
          }),
        );
      }
      //dispatch(resetCallingListsDbTable());
      dispatch(callingListsLoaderRecordsAction(false));
      Logger.error(err.message);
      return Promise.reject(err);
    }
  };
};

export const addCallingListsDbTable = (payload: TGetCallingListRecordsPayload & { name: string }) => {
  return async (dispatch: AppDispatch, getstate: GetRootState) => {
    //const isExist = isRecordsExistSelector(payload.listId)(getstate());
    dispatch(callingListsLoaderRecordsAction(true));
    //if (!isExist) {
    restApi
      .addCallingListsDBTable({ listId: payload.listId })
      .then(data => {
        const message: IToast = {
          title: `Calling list - ${payload.name}`,
          message: 'DB table created',
          type: data.status.code,
        };
        document.dispatchEvent(new CustomEvent('toastMessage', { detail: { data: message } }));
        dispatch(getCallingList(payload));
      })
      .catch(err => {
        dispatch(callingListsLoaderRecordsAction(false));
        Logger.error(err.message);
      });
  };
};
export const deleteListsRecord = () => {
  return async (dispatch: AppDispatch, getstate: GetRootState) => {
    const activeList = getActiveListSelector(getstate());
    const checkedRecords = getCheckedRecords(getstate());
    const negation  = getNegation(getstate());
    const whereCondition = getWhereConditionSelector(getstate());
    const useFilter = getUseFilterSelector(getstate())
    const viewingFilter = getViewingFilterSelector(getstate());
    if(!activeList) return;
    const payload = {
      listId: activeList.id,
      name: activeList.name,
      data: {
        recordIds: checkedRecords,
        negation: negation,
        ...(viewingFilter && {whereCondition:whereCondition}),
        useFilter:useFilter,
      },
    };
    try {
      dispatch(callingListsLoaderRecordsAction(true));
      const resp = await restApi.deleteCallingListsRecords(payload);
      const message = checkedRecords.length === 1 ? 'Record deleted' : `${checkedRecords.length} records deleted`;
      const data: IToast = {
        title: `Calling list - ${activeList.name}`,
        message: message,
        type: resp.status.code,
      };
      document.dispatchEvent(new CustomEvent('toastMessage', { detail: { data: data } }));
      dispatch(togledCheckAllRecords([]));
      dispatch(setNegationAction(false));
      dispatch(
        getCallingListsRecords({
          listId: activeList.id,
        }),
      );
    } catch (err: any) {
      dispatch(callingListsLoaderRecordsAction(false));
      Logger.error(err.message);
    }
  };
};
export const putListsRecord = (data: Partial<TCallingListRecors>) => {
  return async (dispatch: AppDispatch, getstate: GetRootState) => {
    const activeList = getActiveListSelector(getstate());
    const checkedRecords = getCheckedRecords(getstate());
    const negation  = getNegation(getstate());
    const whereCondition = getWhereConditionSelector(getstate());
    const useFilter = getUseFilterSelector(getstate());
    const viewingFilter = getViewingFilterSelector(getstate());
    if(!activeList) return;
    const payload = {
      listId: activeList.id,
      name: activeList.name,
      data: {
        recordIds: checkedRecords,
        negation: negation,
        fields: data,
        ...(viewingFilter && {whereCondition:whereCondition}),
        useFilter:useFilter,
      },
    };
    try {
      dispatch(callingListsLoaderRecordsAction(true));
      const resp = await restApi.putCallingListsRecords(payload);
      console.log(resp);
      const message = resp.data.rowCount === 1 ? 'Record updated' : `${resp.data.rowCount} records updated`;
      const data: IToast = {
        title: `Calling list - ${activeList.name}`,
        message: message,
        type: resp.status.code,
      };
      document.dispatchEvent(new CustomEvent('toastMessage', { detail: { data: data } }));
      dispatch(
        getCallingListsRecords({
          listId: activeList.id
        }),
      );
      return Promise.resolve();
    } catch (err: any) {
      dispatch(callingListsLoaderRecordsAction(false));
      return Promise.reject(err);
      Logger.error(err.message);
    }
  };
};
export const postListsRecord = (data: Partial<TCallingListRecors>) => {
  return async (dispatch: AppDispatch, getstate: GetRootState) => {
    const activeList = getActiveListSelector(getstate());
    if(!activeList) return;
    const payload = {
      listId: activeList.id,
      name: activeList.name,
      data: {
        fields: data,
      },
    };
    try {
      dispatch(callingListsLoaderRecordsAction(true));
      const resp = await restApi.postCallingListsRecords(payload);
      const data: IToast = {
        title: `Calling list - ${activeList.name}`,
        message: 'New record added',
        type: resp.status.code,
      };
      document.dispatchEvent(new CustomEvent('toastMessage', { detail: { data: data } }));
      dispatch(
        getCallingListsRecords({
          listId: activeList.id,
        }),
      );
      return Promise.resolve();
    } catch (err: any) {
      dispatch(callingListsLoaderRecordsAction(false));
      return Promise.reject(err);
      Logger.error(err.message);
    }
  };
};
export const importListsRecord = (data: FormData, addToast: (title: string, message: string, type: number) => void) => {
  return async (dispatch: AppDispatch, getstate: GetRootState) => {
    const activeList = getActiveListSelector(getstate());
    if(!activeList) return;
    try {
      dispatch(callingListsLoaderRecordsAction(true));
      const resp = await restApi.importCallingListsRecords(activeList.id, data);
      const payload: IToast = {
        title: `Calling list - ${activeList.name}`,
        message: 'Import file uploaded',
        type: resp.status.code,
      };
      document.dispatchEvent(new CustomEvent('toastMessage', { detail: { data: payload } }));
      dispatch(
        getCallingListsRecords({
          listId: activeList.id,
        }),
      );
      return Promise.resolve(resp.data)
    } catch (err: any) {
      Logger.error(err.message);
      dispatch(callingListsLoaderRecordsAction(false));
      dispatch(
        getCallingListsRecords({
          listId: activeList.id,
        }),
      );
    }
  };
};
export const exportListsRecord = () => {
  return async (dispatch: AppDispatch, getstate: GetRootState) => {
    const activeList = getActiveListSelector(getstate());
    const params = getPaginationParams(getstate());
    if(!activeList) return;
    try {
      const resp: any = await restApi.exportCallingListsRecords({listId:activeList.id,...params});
      const payload: IToast = {
        title: `Calling list - ${activeList.name}`,
        message: `Exported to file`,
        type: resp.status.code,
      };
      document.dispatchEvent(new CustomEvent('toastMessage', { detail: { data: payload } }));
      const name = `${activeList.name}_${activeList.id}_${new Date().getTime()}.csv`
      fileDownload(resp.data, resp.headers && name);
    } catch (err: any) {
      Logger.error(err.message);
    }
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
    
    dispatch(getCallingListsRecords(payload))
  };
};
export const resetCallingListsDbTable = () => {
  return async (dispatch: AppDispatch, getstate: GetRootState) => {
    dispatch(setListFields([]));
    dispatch(setCallingListsRecordsSingle({ elements: []}));
    dispatch(callingListsLoaderRecordsAction(false));
  };
};

export const callingListsLoaderAction = (data: boolean) => ({
  type: ECallingListsActionTypes.LOADING,
  payload: data,
});
export const callingListsLoaderRecordsAction = (data: boolean) => ({
  type: ECallingListsActionTypes.LOADING_RECORDS,
  payload: data,
});
export const callingListLoaderAction = (data: boolean) => ({
  type: ECallingListsActionTypes.LOADING_CALLING_LIST,
  payload: data,
});

export const setCallingListsObjectsAction = (data: IItemsInCallingLists) => ({
  type: ECallingListsActionTypes.SET,
  payload: data,
});
export const setCallingListsToParentObjectsAction = (data: TAddItemsToParent) => ({
  type: ECallingListsActionTypes.ADD_ITEMS,
  payload: data,
});
export const setCallingListsRecords = (data: TAddRecords & { name: string }) => ({
  type: ECallingListsActionTypes.ADD_RECORDS,
  payload: data,
});
export const setCallingListsRecordsSingle = (data: TAddRecords) => ({
  type: ECallingListsActionTypes.ADD_RECORDS_SINGLE,
  payload: data,
});
export const setCallingListsActive = (data: TCallingListsExtendedResponse) => ({
  type: ECallingListsActionTypes.ADD_ACTIVE,
  payload: data,
});
export const setExpandCallingListsRecords = (data: TTogleExpand) => ({
  type: ECallingListsActionTypes.TOGLE_EXPANDE,
  payload: data,
});
export const setLoadingCallingListsFolders = (data: TTogleExpand) => ({
  type: ECallingListsActionTypes.TOGLE_LOADING,
  payload: data,
});

export const setPopUpAction = (data: TPopUp) => ({
  type: ECallingListsActionTypes.SET_POPUP,
  payload: data,
});
export const setEditPopUpAction = (data: TEditNewRecordPopUp) => ({
  type: ECallingListsActionTypes.SET_EDIT_POPUP,
  payload: data,
});
export const setEditSubPopUpAction = (data: TEditNewRecordPopUp) => ({
  type: ECallingListsActionTypes.SET_EDITAll_POPUP,
  payload: data,
});
export const setListFields = (data: TCallingListFields[]) => ({
  type: ECallingListsActionTypes.ADD_FIELDS,
  payload: data,
});
export const setCheckerdRecords = (data: number) => ({
  type: ECallingListsActionTypes.TOGLE_CHECKED_RECCORD,
  payload: data,
});
export const togledCheckAllRecords = (data: number[]) => ({
  type: ECallingListsActionTypes.TOGLE_CHECKED_ALL,
  payload: data,
});
export const setTotalCountAction = (data: number) => ({
  type: ECallingListsActionTypes.SET_TOTAL_COUNT,
  payload: data,
});
export const setParamsAction = (data: Partial<TPaginationParams>) => ({
  type: ECallingListsActionTypes.CHENGE_PARAM,
  payload: data,
});
export const setColorsAction = (data: IUniqueChainId) => ({
  type: ECallingListsActionTypes.UPDATE_COLORS,
  payload: data,
});
export const callingListsUseFilterAction = (data: boolean) => ({
  type: ECallingListsActionTypes.USE_FILTER,
  payload: data,
});
export const callingListsSetFiltersAction = (data: TFilter[]) => ({
  type: ECallingListsActionTypes.SET_FILTER,
  payload: data,
});

export const callingListsSetWhereConditionAction = (data: string) => ({
  type: ECallingListsActionTypes.CHANGE_WHERE_CONDITION,
  payload: data,
});

export const callingListsSetOrderByConditionAction = (data: string) => ({
  type: ECallingListsActionTypes.CHANGE_ORDER_BY_CONDITION,
  payload: data,
});
export const setIncludedAction = (data: TCallingListsRecordsResponse['included']) => ({
  type: ECallingListsActionTypes.SET_INCLUDED,
  payload: data,
});
export const csetShowCustomFieldsAction = (data: boolean) => ({
  type: ECallingListsActionTypes.SET_SHOW_CUSTOM_FIELDS,
  payload: data,
});
export const setNegationAction = (data: boolean) => ({
  type: ECallingListsActionTypes.SET_NEGATION,
  payload: data,
});
export const setTableInfoAction = (data: TCallingListState['tableInfo'] ) => ({
  type: ECallingListsActionTypes.SET_TABLE_INFO,
  payload: data,
});
export const setViewingFilterAction = (data:TCallingListState['viewingFilter']) => ({
  type: ECallingListsActionTypes.SET_VIEWING_FILTER,
  payload: data,
});
export const setCallingListTotalAction = (data:number) => ({
  type: ECallingListsActionTypes.SET_LISTS_TOTAL,
  payload: data,
});