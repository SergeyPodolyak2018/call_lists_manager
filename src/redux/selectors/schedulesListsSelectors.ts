import { createSelector } from 'reselect';

import { States } from '../constants';
import { rootSelector } from '.';
import { TCallingListRecors } from 'src/api/ts/interfaces/CallingLists.response';

export const schedulesSelector = createSelector(rootSelector, state => state[States.SCHEDULE_LISTS]);
export const isLoadingSelector = createSelector(schedulesSelector, data => data.loading);
export const isLoadingReccordsSelector = createSelector(schedulesSelector, data => data.loadingRecords);
export const isLoadingCallingListSelector = createSelector(schedulesSelector, data => data.loadingCallingList);
export const getDataSelector = createSelector(schedulesSelector, data => data.data);
const toDateInputValue = (date:Date) => {
  const local = new Date(date);
  local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return local.toJSON().slice(0,10);
};
export const getActiveListSelector = createSelector(schedulesSelector, data => {
  const obj = {
    id: -1,
    name: '',
    description: '',
    execute:'daily',
    schedule:[
    ],
    cycle:[],
    dateFrom: toDateInputValue(new Date()),
    dateTill: toDateInputValue(new Date()),
    every: 1,
    startTime: '08:00',
    stopTime: '18:00',
    state: undefined
  };
  if(data.activeList){
    return Object.assign({},obj,data.activeList);
  }else{
    return obj;
  }
});
export const getActiveFolderSelector = createSelector(schedulesSelector, data => {

  if(data.activeFolder){
    return data.activeFolder;
  }else{
    return { id:-1 };
  }
});
export const getRecordsByActiveListSelector = createSelector(
  schedulesSelector,
  data => {
    if(data.activeList){
      return data.records[data.activeList.id];
    }else{
      return [];
    }
  },
);
export const getRecordsSelector = createSelector(schedulesSelector, data => data.recordsSingle);
export const isRecordsExistSelector = (id: number) => createSelector(schedulesSelector, data => id in data.records);
export const isExpanded = (id: number) =>
  createSelector(schedulesSelector, data => {
    if (id in data.expand) {
      return data.expand[id].expand;
    } else {
      return false;
    }
  });
export const isFolderLoading = (id: number) =>
  createSelector(schedulesSelector, data => {
    if (id in data.loadingFolder) {
      return data.loadingFolder[id].loading;
    } else {
      return false;
    }
  });
export const getConfirmDeleteSelector = createSelector(schedulesSelector, data => data.confirmDelete);
export const getPopUpStatus = createSelector(schedulesSelector, data => data.popUp);
export const getEditPopUpStatus = createSelector(schedulesSelector, data => data.editPopUp);
export const getCheckedRecords = createSelector(schedulesSelector, data => data.checkedRecords);
export const getRecord = (id: number) =>
  createSelector(schedulesSelector, data => {
    const index = data.recordsSingle.findIndex(el => el.record_id === id);
    if (index > -1) {
      return data.recordsSingle[index];
    } else {
      return null;
    }
  });
export const getRecords = (idAr: number[]) =>
  createSelector(schedulesSelector, data => {
    const dataRes: TCallingListRecors[] = [];
    idAr.map(id => {
      const index = data.recordsSingle.findIndex(el => el.record_id === id);
      if (index > -1) {
        return dataRes.push(data.recordsSingle[index]);
      }
    });
    return dataRes;
  });
export const getPaginationParams = createSelector(schedulesSelector, data => data.params);
export const getTotalCountSelector = createSelector(schedulesSelector, data => data.totalCount);
export const getColorsSelector = createSelector(schedulesSelector, data => data.uniqueChainIdcolor);
export const getUseFilterSelector = createSelector(schedulesSelector, data => data.params.useFilter);
export const getWhereConditionSelector = createSelector(schedulesSelector, data => data.params.whereCondition);
export const getOrderByConditionSelector = createSelector(schedulesSelector, data => data.params.orderByCondition);
export const getFilterSelector = createSelector(schedulesSelector, data => data.filters);
export const getShowCustomFieldsSelector = createSelector(schedulesSelector, data => data.showOnlyCustomFields);
export const getCampaignGroupsSchedulesSelector = createSelector(schedulesSelector, data => data.campaignGroupsSchedules);
export const getCampaignGroupsServersSelector = createSelector(schedulesSelector, data => data.campaignGroupsServers);