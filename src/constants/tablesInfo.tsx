import { ITableInfo } from 'src/interfaces/tables';
import { TableType } from './tablesTypes';

export const tableConfigurations: Record<TableType, ITableInfo> = {
  [TableType.Campaigns]: {
    type: TableType.Campaigns,
    columns: [
      { id: 0, name: 'Name' },
      {
        id: 1,
        name: 'Actions',
      },
      {
        id: 1,
        name: 'Status',
      },
      // { id: 2, name: 'Dial Mode' },
      {
        id: 2,
        name: 'Optimization parameter',
      },
      {
        id: 2,
        name: 'Target Value',
      },
      { id: 2, name: 'VTD' },
      {
        id: 2,
        name: 'Trunk Group DN',
      },
      {
        id: 2,
        name: 'Schedule',
      },
      {
        id: 2,
        name: 'Max Q Size',
      },
    ],
  },
  [TableType.CallingListsTree]: {
    type: TableType.CallingListsTree,
    columns: [],
  },

  [TableType.CallingListData]: {
    type: TableType.CallingListData,
    columns: [
      { id: 0, name: 'First Name' },
      {
        id: 1,
        name: 'Last Name',
      },
      { id: 2, name: 'Device ' },
      {
        id: 2,
        name: 'Device Info Type',
      },
      {
        id: 2,
        name: 'Client ID ',
      },
      { id: 2, name: 'Company Name' },
      {
        id: 2,
        name: 'Timezone',
      },
      {
        id: 2,
        name: 'Postal Code',
      },
      {
        id: 2,
        name: 'Country Code',
      },
      {
        id: 2,
        name: 'State/Region',
      },
      {
        id: 2,
        name: 'Call Result',
      },
      {
        id: 2,
        name: 'Disposition Code',
      },
      {
        id: 2,
        name: 'Call Time',
      },
      {
        id: 2,
        name: 'Record Type',
      },
      {
        id: 2,
        name: 'Record Status',
      },
      {
        id: 2,
        name: 'Other1',
      },
      {
        id: 2,
        name: 'Other2',
      },
      {
        id: 2,
        name: 'Other3',
      },
      {
        id: 2,
        name: 'Other4',
      },
      {
        id: 2,
        name: 'Other5',
      },
      {
        id: 2,
        name: 'Other6',
      },
      {
        id: 2,
        name: 'Other7',
      },
      {
        id: 2,
        name: 'Other8',
      },
      {
        id: 2,
        name: 'Other9',
      },
      {
        id: 2,
        name: 'Other10',
      },
      {
        id: 2,
        name: 'Other11',
      },
      {
        id: 2,
        name: 'Other12',
      },
      {
        id: 2,
        name: 'Other13',
      },
      {
        id: 2,
        name: 'Other14',
      },
      {
        id: 2,
        name: 'Other15',
      },
      {
        id: 2,
        name: 'Other16',
      },
      {
        id: 2,
        name: 'Other17',
      },
      {
        id: 2,
        name: 'Other18',
      },
      {
        id: 2,
        name: 'Other19',
      },
      {
        id: 2,
        name: 'Other20',
      },
    ],
  },
  [TableType.CampaignsProperties]: {
    type: TableType.CallingListData,
    columns: [
      { id: 0, name: 'Record Type' },
      {
        id: 1,
        name: 'Priority',
      },
      { id: 2, name: 'N Record ' },
    ],
  },
};

export const fieldsQueue = [
  'record_id',
  'contact_info',
  'contact_info_type',
  'record_type',
  'record_status',
  'call_result',
  'attempt',
  'dial_sched_time',
  'call_time',
  'daily_from',
  'daily_till',
  'tz_dbid',
  'campaign_id',
  'agent_id',
  'chain_id',
  'chain_n',
  'group_id',
  'app_id',
  'treatments',
  'media_ref',
  'disposition_code',
  'cd_area_code',
  'cd_country_code_iso',
  'cd_mask',
  'cd_state_code',
  'cd_tz_dbid',
  'cd_tz_name',
  'creation_time',
  'cd_device_index',
];
export const lastFieldsQueue = ['switch_id'];
