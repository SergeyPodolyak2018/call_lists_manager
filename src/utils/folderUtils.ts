import {
  TCallingListFields,
  TCallingListRecors,
  TCallingListsObjectsResponse,
  TCallingListsResponse,
} from 'src/api/ts/interfaces/CallingLists.response';
import {
  TFindFoldersResponseStandartPart,
  EClass,
  TCallingLists,
  TCfgCampaignFolder,
  TCfgCampaign,
  TCfgCampaignGroup,
} from '../api/ts/interfaces/FindFolders.response';
import { ICallingListtsDataStore, IItemsInCallingLists, IUniqueChainId } from 'src/redux/reducers/callingListsReducer';
import { colorsChainId } from 'src/redux/constants';
import { fieldsQueue, lastFieldsQueue } from 'src/constants/tablesInfo';
import { e } from 'src/styles/genesys-webcomponents/p-29e8b184';

export const callingListDistributor = (
  data: TFindFoldersResponseStandartPart[],
): TFindFoldersResponseStandartPart[] => {
  data.forEach(el => {
    if (el.$class === EClass.CAMPAIGN) {
      el.items.forEach(element => {
        if (element.$class === EClass.FOLDER && element.type && element.type === 38) {
          callingListDistributorInCampaign(element.items, el.callingLists);
        }
        if (element.$class !== EClass.FOLDER) {
          element.callingLists = el.callingLists;
        }
      });
    } else {
      if (el.items && el.items.length > 0) {
        callingListDistributor(el.items);
      }
    }
  });
  return data;
};

export const callingListDistributorInCampaign = (
  data: (TCfgCampaignFolder | TCfgCampaignGroup)[],
  callingListsExternal: TCallingLists[],
) => {
  data.forEach(el => {
    if (el.$class === EClass.FOLDER && el.type && el.type === 38) {
      callingListDistributorInCampaign(el.items, callingListsExternal);
    }
    if (el.$class === EClass.CAMPAIGM_GROUP) {
      el.callingLists = callingListsExternal;
    }
  });
};

export const callingObjectItemsDistributor = (data: IItemsInCallingLists): IItemsInCallingLists => {
  const updatedRecords: IItemsInCallingLists = [];
  data.forEach(el => {
    if (el.$class === EClass.FOLDER) {
      updatedRecords.push({ ...el, items: [] });
    } else {
      updatedRecords.push({ ...el });
    }
  });
  return updatedRecords;
};

export const callingItemsItemsDistributor = (data: IItemsInCallingLists): IItemsInCallingLists => {
  const updatedRecords: IItemsInCallingLists = [];
  data.forEach(el => {
    if (el.$class === EClass.FOLDER) {
      updatedRecords.push({ ...el, items: [] });
    } else {
      updatedRecords.push(el);
    }
  });
  return updatedRecords;
};

export const chainIdColorsUpdater = (records: TCallingListRecors[], colors: IUniqueChainId): IUniqueChainId => {
  const newColors = { ...colors };
  records.forEach((o, i) => {
    if (!newColors[o.chain_id]) {
      Object.assign(newColors, {
        [o.chain_id]: String(colorsChainId[i] || colorsChainId[i % colorsChainId.length]) + '75',
      });
    }
  });
  return newColors;
};

export const fieldsQueueBuilder = (data:TCallingListFields[]):TCallingListFields[]=>{
  const correctQueue:TCallingListFields[] = [];
  const customFields:TCallingListFields[] = [];
  const otherFields:TCallingListFields[] = [];
  const lastFields:TCallingListFields[] = [];
  fieldsQueue.forEach((el)=>{
    const index = data.findIndex(element=>element.name === el);
    if(index>-1){
      correctQueue.push(...data.splice(index,1));
    }
  });
  lastFieldsQueue.forEach((el)=>{
    const index = data.findIndex(element=>element.name === el);
    if(index>-1){
      lastFields.push(...data.splice(index,1));
    }
  });
  const customIndicator = 'c_';
  data.forEach((el)=>{
    if(el.name.startsWith(customIndicator)){
      customFields.push({...el});
    }else{
      otherFields.push({...el});
    }
  });
  const enCollator = new Intl.Collator('en-US',{numeric: true});
  const sortedCustomFields = customFields.sort((a,b)=>{
    const rez = enCollator.compare(a.name,b.name);
    return rez;
  })

  return [...correctQueue,...otherFields,...sortedCustomFields,...lastFields];
}
