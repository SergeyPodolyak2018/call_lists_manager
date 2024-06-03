import { EClass, Tree, TCfgFolder } from './FindFolders.response';
import {TableAccessTypes} from '../constants/codes'


export type TCallingListsResponse = {
  $class: EClass.CALLING_LIST;
  id: number;
  name: string;
  state: number;
  weight: number;
  tableAccessId: number;
};
export type TTableAccessResponse = {
  $class: EClass.TABLE_ACCESS;
  id: number;
  name: typeof TableAccessTypes[2] | typeof TableAccessTypes[11];
  state: number;
  weight: number;
  tableAccessId: number;
  dbAccessId: number;
  dbTableNam: string;
  tenantId: number;
  type: 2 | 11
};

export type TCallingListsExtendedResponse = {
  $class: string;
  id: number;
  name: string;
  state: number;
  weight: number;
  tableAccessId: number;
  filterId: number;
  tableAccess: {
    $class: string;
    id: number;
    dbAccessId: number;
    dbTableName: string;
    format: {
      $class: string;
      id: number;
      description: string;
      fields: TCallingListFields[],
      name: string;
      state: number;
      tenantId: number;
    },
    name: string;
    tenantId: number;
  },
  viewingFilter:{
    criteria: string;
    orderBy: string;
    useFilter: boolean;
  }
};

export type TDoNotCallListImportResponse = {
  id: string;
  listId: number;
  listName: string;
  tenantId: number;
  inputFile: {
    originalName: string;
    encoding: string;
    mimetype: string;
    size: number;
    rows: number;
  },
  state: string;
  result: string;
  error: string;
  totalLines: number;
  processedLines: number;
  progress: number;
  acceptedLines: number;
  rejectedLines: number;
  deletedRecords:number;
};


export type TCallingListsObjectsResponse = {
  $class: EClass.FOLDER;
  id: number;
  name: string;
  state: number;
  items: Tree<TCallingListsObjectsResponse | TCallingListsResponse>[];
};

export type TIncluded = {
  id:number;
  name:string;
}

export type TCallingListsRecordsResponse = {
  totalCount: number;
  contactsFilteredCount?: number;
  contactsTotalCount: number;
  filteredCount?: number;
  results: TCallingListRecors[];
  included:{
    campaigns?:TIncluded[];
    applications?:TIncluded[];
    timezones?:TIncluded[];
    campaignGroups?:TIncluded[];
  }
};

export type TCallingListRecors = {
  record_id: number;
  c_category_uid: null | number;
  c_default_device_index: null | number;
  c_tlm_dt: string;
  c_last_name: string;
  c_first_name: string;
  c_company: string;
  c_client_id: string;
  c_original_record: string;
  c_order: string;
  c_condition: string;
  c_other1: string;
  c_other2: string;
  c_other3: string;
  c_other4: string;
  c_other5: string;
  c_other6: string;
  c_other7: string;
  c_other8: string;
  c_other9: string;
  c_other10: string;
  c_other11: string;
  c_other12: string;
  c_other13: string;
  c_other14: string;
  c_other15: string;
  c_other16: string;
  c_other17: string;
  c_other18: string;
  c_other19: string;
  c_other20: string;
  c_tz_uid: number;
  c_tz_name: string;
  c_tz_dbid: number;
  c_state_code: string;
  c_country_code_iso: string;
  c_postal_code: string;
  c_is_deleted: string;
  cd_device_type: number;
  cd_device_index: number;
  cd_country_code: string;
  cd_area_code: string;
  cd_exchange: string;
  cd_number: string;
  cd_state_code: string;
  cd_extension: string;
  cd_tz_uid: number;
  cd_tz_name: string;
  cd_tz_dbid: number;
  cd_mask: number;
  cd_country_code_iso: string;
  cd_category_uid: string;
  cd_dol: number;
  chain_id: number;
  chain_n: number;
  contact_info: string;
  contact_info_type: number;
  record_type: number;
  record_status: number;
  call_result: number;
  disposition_code: string;
  attempt: number;
  dial_sched_time: string;
  call_time: string;
  daily_from: number;
  daily_till: number;
  tz_dbid: number;
  campaign_id: string;
  agent_id: string;
  group_id: string;
  app_id: string;
  treatments: string;
  switch_id: string;
  creation_time: number;
};
export type TCallingListFields = {
  $class: string;
  id: number;
  defaultValue?: string;
  description: string;
  fieldType: number;
  isNullable: 1 | 2;
  isPrimaryKey: number;
  isUnique: number;
  length?: number;
  name: string;
  state: number;
  tenantId: number;
  type: number;
};

export type TDeleteCallingListRecordsResp = {
  rowCount: number;
  recordIds: number[];
};

export type TPutCallingListRecordsResp = {
  rowCount: number;
};
