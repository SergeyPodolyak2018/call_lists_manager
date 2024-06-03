import { createSelector } from 'reselect';

import { States } from '../constants';
import { rootSelector } from '.';
import { TCallingListRecors } from 'src/api/ts/interfaces/CallingLists.response';

export const callingListsSelector = createSelector(rootSelector, state => state[States.CALLING_LISTS]);
export const isLoadingSelector = createSelector(callingListsSelector, data => data.loading);
export const isLoadingReccordsSelector = createSelector(callingListsSelector, data => data.loadingRecords);
export const isLoadingCallingListSelector = createSelector(callingListsSelector, data => data.loadingCallingList);
export const getDataSelector = createSelector(callingListsSelector, data => data.data);
export const getActiveListSelector = createSelector(callingListsSelector, data => {
  if(data.activeList){
    return data.activeList;
  }else{
    return {
      id:-1,
      name:''
    }
  }
});
export const getRecordsByActiveListSelector = createSelector(
  callingListsSelector,
  data => {
    if(data.activeList){
      return data.records[data.activeList.id];
    }else{
      return [];
    }
  },
);
export const getRecordsSelector = createSelector(callingListsSelector, data => data.recordsSingle);
export const isRecordsExistSelector = (id: number) => createSelector(callingListsSelector, data => id in data.records);
export const isExpanded = (id: number) =>
  createSelector(callingListsSelector, data => {
    if (id in data.expand) {
      return data.expand[id].expand;
    } else {
      return false;
    }
  });
export const isFolderLoading = (id: number) =>
  createSelector(callingListsSelector, data => {
    if (id in data.loadingFolder) {
      return data.loadingFolder[id].loading;
    } else {
      return false;
    }
  });
export const getPopUpStatus = createSelector(callingListsSelector, data => data.popUp);
export const getEditPopUpStatus = createSelector(callingListsSelector, data => data.editPopUp);
export const getListFields = createSelector(callingListsSelector, data => data.callingListFields);
export const getCheckedRecords = createSelector(callingListsSelector, data => data.checkedRecords);
export const getRecord = (id: number) =>
  createSelector(callingListsSelector, data => {
    const index = data.recordsSingle.findIndex(el => el.record_id === id);
    if (index > -1) {
      return data.recordsSingle[index];
    } else {
      return null;
    }
  });
export const getRecords = (idAr: number[]) =>
  createSelector(callingListsSelector, data => {
    const dataRes: TCallingListRecors[] = [];
    idAr.map(id => {
      const index = data.recordsSingle.findIndex(el => el.record_id === id);
      if (index > -1) {
        return dataRes.push(data.recordsSingle[index]);
      }
    });
    return dataRes;
  });
export const getPaginationParams = createSelector(callingListsSelector, data => data.params);
export const getTotalCountSelector = createSelector(callingListsSelector, data => data.totalCount);
export const getColorsSelector = createSelector(callingListsSelector, data => data.uniqueChainIdcolor);
export const getUseFilterSelector = createSelector(callingListsSelector, data => data.params.useFilter);
export const getWhereConditionSelector = createSelector(callingListsSelector, data => data.params.whereCondition);
export const getOrderByConditionSelector = createSelector(callingListsSelector, data => data.params.orderByCondition);
export const getFilterSelector = createSelector(callingListsSelector, data => data.filters);
export const getIncludedSelector = createSelector(callingListsSelector, data => data.included);
export const getShowCustomFieldsSelector = createSelector(callingListsSelector, data => data.showOnlyCustomFields);
export const getNegation = createSelector(callingListsSelector, data => data.negation);
export const getTableInfo = createSelector(callingListsSelector, data => data.tableInfo);
export const getViewingFilterSelector = createSelector(callingListsSelector, data => data.viewingFilter.useFilter);
export const getViewingFilterPreviousDataSelector = createSelector(callingListsSelector, data => data.viewingFilter);
export const getCallingListsTotalSelector = createSelector(callingListsSelector, data => data.callingListsTotal);