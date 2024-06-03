export enum ApiCodes {
  SUCCESS = 0, // The synchronous operation was successful.
  ACCEPTED = 1, // The asynchronous operation was sent successfully
  PARTIAL_SUCCESS = 2, // The synchronous operation was partially successful.
  FAIL = 500, // Request failed
  RESOURCE_ALREADY_EXISTS = 609, // Resource already exists
  GENERAL_CLIENT_ERROR = 651, // Required parameter is missing
  SESSION_EXPIRED = 651,
  INVALID_PARAMETER = 652, // Invalid parameter,
  RESOURCE_NOT_FOUND = 604, // Resource not found
  UNIQUE_CONSTRAINT = 609, // Unique constraint error when resource already exists
  UNAUTHORIZED = 601, // Unauthorized
  FAIL_BACKEND = 515, // Backend error
  FORBIDDEN = 603, // Forbidden
  CONFLICT = 409, // Conflict
}

export enum StatusCodes {
  SUCCESS = 200, // The synchronous operation was successful.
  UNAUTHORIZED = 401, // Unauthorized
}

export enum FolderTypes {
  MaxObjectType = 44,
  Role = 43,
  ScheduledTask = 42,
  GVPIVRProfile = 41,
  GVPCustomer = 40,
  GVPReseller = 39,
  CampaignGroup = 38,
  ObjectiveTable = 37,
  EnumeratorValue = 36,
  Enumerator = 35,
  AlarmCondition = 34,
  IVR = 33,
  IVRPort = 32,
  VoicePrompt = 31,
  TimeZone = 30,
  Filter = 29,
  Treatment = 28,
  Campaign = 27,
  CallingList = 26,
  TableAccess = 25,
  Format = 24,
  Field = 23,
  Folder = 22,
  AccessGroup = 21,
  AppPrototype = 20,
  StatTable = 19,
  StatDay = 18,
  DNGroup = 17,
  Transaction = 16,
  AgentLogin = 15,
  ActionCode = 14,
  Skill = 13,
  Script = 12,
  PhysicalSwitch = 11,
  Host = 10,
  Application = 9,
  Service = 8,
  Tenant = 7,
  PlaceGroup = 6,
  AgentGroup = 5,
  Place = 4,
  Person = 3,
  DN = 2,
  Switch = 1,
  NoObject = 0,
}

export const EndpointByFolderType: Readonly<Record<number, string>> = Object.freeze({
  [FolderTypes.Campaign]: '',
  [FolderTypes.CampaignGroup]: 'campaign-groups/folders',
  [FolderTypes.Folder]: 'folders',
});

export enum EntityTypes {
  CallingList = 'CallingList',
  SuppressionList = 'SuppressionList',
  ConsentList = 'ConsentList',
  Script = 'Script',
  Application = 'Application',
  TableAccess = 'TableAccess',
  Campaign = 'Campaign',
  CampaignGroup = 'CampaignGroup',
  TimeZone = 'TimeZone',
  AgentGroup = 'AgentGroup',
  Format = 'Format',
  Transaction = 'Transaction',
  Person = 'Person',
  Treatment = 'Treatment',
  DN = 'DN',
  AccessGroup = 'AccessGroup',
  Field = 'Field',
  Folder = 'Folder',
  Enumerators = 'Enumerators',
  EnumeratorValues = 'EnumeratorValues',
  Switches = 'Switches',
  VoicePlatformProfiles = 'VoicePlatformProfiles',
  Role = 'Role',
  Job = 'Job',
  Filter = 'Filter',
}

export enum UrlSections {
  CallingLists = 'calling-lists',
  TableAccess = 'table-accesss',
  Formats = 'formats',
  Applications = 'applications',
  Campaigns = 'campaigns',
  CampaignGroups = 'campaign-groups',
  AgentGroups = 'agent-groups',
  Dns = 'dns',
  Timezones = 'time-zones',
  Scripts = 'scripts',
  Transactions = 'transactions',
  Persons = 'persons',
  Treatments = 'treatments',
  AccessGroups = 'access-groups',
  Fields = 'fields',
  Folders = 'folders',
  Enumerators = 'enumerators',
  EnumeratorValues = 'enumerator-values',
  Switches = 'switches',
  VoicePlatformProfiles = 'gvp-ivr-profiles',
  Roles = 'roles',
  Filters = 'filters',
}

export enum DialModes {
  Predict = 1,
  Progress = 2,
  Preview = 3,
  PushPreview = 8,
  PredictAndSeize = 5,
  ProgressAndSeize = 4,
  PowerGVP = 11,
  ProgressGVP = 9,
  PredictGVP = 10,
  Power = 6,
}

export const InvDialModes: Readonly<Record<number, string>> = Object.freeze({
  [DialModes.Predict]: 'Predictive',
  [DialModes.Progress]: 'Progressive',
  [DialModes.Preview]: 'Preview',
  [DialModes.PushPreview]: 'Push Preview',
  [DialModes.PredictAndSeize]: 'Predictive with seizing',
  [DialModes.ProgressAndSeize]: 'Progressive with seizing',
  [DialModes.PowerGVP]: 'Power GVP',
  [DialModes.ProgressGVP]: 'Progressive GVP',
  [DialModes.PredictGVP]: 'Predictive GVP',
});

export const InvDialModesReverseMap: Readonly<Record<string, string>> = Object.freeze({
  Predictive: 'Predict',
  Progressive: 'Progress',
  Preview: 'Preview',
  'Push Preview': 'PushPreview',
  'Predictive with seizing': 'PredictAndSeize',
  'Progressive with seizing': 'ProgressAndSeize',
  'Power GVP': 'PowerGVP',
  'Progressive GVP': 'ProgressGVP',
  'Predictive GVP': 'PredictGVP',
});

export const InvDialModesMap: Readonly<Record<string, string>> = Object.freeze({
  Predict: 'Predictive',
  Progress: 'Progressive',
  Preview: 'Preview',
  PushPreview: 'Push Preview',
  PredictAndSeize: 'Predictive with seizing',
  ProgressAndSeize: 'Progressive with seizing',
  PowerGVP: 'Power GVP',
  ProgressGVP: 'Progressive GVP',
  PredictGVP: 'Predictive GVP',
});

export enum OptimizationParameters {
  BusyFactor = 'Agent Busy Factor',
  WaitTime = 'Average Waiting Time',
  OverdialRate = 'Overdial Rate',
  DistributionTime = 'Average Distribution Time',
  MaximumGain = 'Maximum Gain',
}

export const OptimizationParametersReverseMap: Record<string, string> = {
  'Agent Busy Factor': 'BusyFactor',
  'Average Waiting Time': 'WaitTime',
  'Overdial Rate': 'OverdialRate',
  'Average Distribution Time': 'DistributionTime',
  'Maximum Gain': 'MaximumGain',
};

export enum OptMethods {
  BusyFactor = 1,
  OverdialRate = 2,
  WaitTime = 3,
  DistributionTime = 4,
}

export const InvOptMethods: Readonly<Record<number, string>> = Object.freeze({
  [OptMethods.BusyFactor]: 'BusyFactor',
  [OptMethods.OverdialRate]: 'OverdialRate',
  [OptMethods.WaitTime]: 'WaitTime',
  [OptMethods.DistributionTime]: 'DistributionTime',
});

export enum CampaignStatuses {
  NotLoaded = 'NotLoaded',
  Active = 'Active',
  Running = 'Running',
  WaitingUnload = 'WaitingUnload',
  UnloadInProgress = 'UnloadInProgress',
  Unloading = 'Unloading',
  InActive = 'InActive',
  Unknown = 'Unknown or Error',
}

export enum CampaignStatusesMap {
  NotLoaded = 'Not Loaded',
  Active = 'Active',
  Running = 'Running',
  WaitingUnload = 'Waiting Unload',
  UnloadInProgress = 'Unload In Progress',
  Unloading = 'Unloading',
  InActive = 'In Active',
  Unknown = 'Unknown or Error',
}

export enum CampaignStatusesMapReverse {
  'Not Loaded' = 'NotLoaded',
  'Active' = 'Active',
  'Running' = 'Running',
  'Waiting Unload' = 'WaitingUnload',
  'Unload In Progress' = 'UnloadInProgress',
  'Unloading' = 'Unloading',
  'In Active' = 'InActive',
  'Unknown or Error' = 'Unknown',
}

export enum CampaignStatusesUI {
  NotLoaded = 'status-notLoaded',
  Active = 'status-active',
  Running = 'status-running',
  WaitingUnload = 'status-stopped',
  UnloadInProgress = 'status-stopped',
  Unloading = 'status-stopped',
  InActive = 'status-stopped',
  Unknown = 'off',
}
export const CallResults = Object.freeze({
  21: 'Abandoned',
  47: 'Agent CallBack Error',
  10: 'All Trunks Busy',
  33: 'Answer',
  9: 'Answering Machine',
  31: 'Bridged',
  6: 'Busy',
  42: 'Call Drop Error',
  52: 'Cancel Record',
  19: 'Cleared',
  2: 'Conferenced',
  24: 'Consult',
  30: 'Converse-On',
  29: 'Covered',
  49: 'Deafened',
  41: 'Dial Error',
  51: 'Do Not Call',
  26: 'Dropped',
  27: 'Dropped No Answer',
  17: 'Fax Detected',
  23: 'Forwarded',
  3: 'General Error',
  48: 'Group CallBack Error',
  50: 'Held',
  7: 'No Answer',
  35: 'No Dial Tone',
  38: 'No Established',
  44: 'No Free Port Error',
  36: 'No Progress',
  37: 'No Ring Back',
  34: 'Nu Tone',
  0: 'Ok',
  20: 'Overflowed',
  39: 'Pager Detected',
  25: 'Picked Up',
  18: 'Queue Full',
  22: 'Redirected',
  5: 'RemoteRelease',
  32: 'Silence',
  8: 'SIT Detected',
  11: 'SIT Invalid Num',
  15: 'SIT No Circuit',
  13: 'SIT Oper Intercept',
  16: 'SIT Reorder',
  14: 'SIT Unknown',
  12: 'SIT Vacant',
  46: 'Stale',
  43: 'Switch Error',
  4: 'System Error',
  45: 'Transfer Error',
  1: 'Transferred',
  53: 'Wrong Number',
  40: 'Wrong Party',
  28: 'Unknown',
});

export const RecordStatuses = Object.freeze({
  6: 'Agent Error',
  5: 'Cancelled',
  9: 'Chain Ready',
  7: 'Chain Updated',
  8: 'Missed CallBack',
  0: 'No Record Status',
  1: 'Ready',
  2: 'Retrieved',
  4: 'Stale',
  3: 'Updated',
});
export const RecordTypes = Object.freeze({
  6: 'Campaign CallBack',
  3: 'Campaign Rescheduled',
  2: 'General',
  7: 'No Call',
  0: 'No Record Type',
  5: 'Personal CallBack',
  4: 'Personal Rescheduled',
  1: 'Unknown',
});

export const ContactTypes = Object.freeze({
  3: 'Business With Extension',
  2: 'Direct Business Phone',
  10: 'E-Mail',
  1: 'Home Phone',
  4: 'Mobile',
  7: 'Modem',
  0: 'No Contact Type',
  6: 'Pager',
  9: 'Pin Pager',
  5: 'Vacation Phone',
  8: 'Voice Mail',
});
export const AlternateContactTypes = Object.freeze({
  3: 'Phone',
  0: 'Email',
  1: 'Other',
});
export const DeviceIndex = Object.freeze({
  1: 'Work Phone',
  2: 'Home Phone',
  3: 'Mobile Phone',
  4: 'Work E-Mail',
  5: 'E-Mail',
  6: 'Vacation Phone',
  7: 'Voice Mail',
});

export const SpecialFields = {
  contact_info_type: ContactTypes,
  record_type: RecordTypes,
  record_status: RecordStatuses,
  call_result: CallResults,
};
export enum CfgDataType {
  CFGDTNoDataType = 0,
  CFGDTInt = 1,
  CFGDTFloat = 2,
  CFGDTChar = 3,
  CFGDTVarChar = 4,
  CFGDTDateTime = 5,
  CFGDTMaxDataType = 6,
}

export const CfgInputType: Readonly<Record<number, string>> = Object.freeze({
  [CfgDataType.CFGDTNoDataType]: 'string',
  [CfgDataType.CFGDTInt]: 'number',
  [CfgDataType.CFGDTFloat]: 'number',
  [CfgDataType.CFGDTChar]: 'string',
  [CfgDataType.CFGDTVarChar]: 'string',
  [CfgDataType.CFGDTDateTime]: 'dateTime',
  [CfgDataType.CFGDTMaxDataType]: 'string',
});
type Rules = {
  max: number;
  min: number;
};
export const CfgInputTypeLimits: Readonly<Record<number, Rules>> = Object.freeze({
  [CfgDataType.CFGDTNoDataType]: {
    max: 0,
    min: 0,
  },
  [CfgDataType.CFGDTInt]: {
    max: 2147483647,
    min: -2147483648,
  },
  [CfgDataType.CFGDTFloat]: {
    max: 2147483647,
    min: -2147483648,
  },
  [CfgDataType.CFGDTChar]: {
    max: 255,
    min: 0,
  },
  [CfgDataType.CFGDTVarChar]: {
    max: 65535,
    min: 0,
  },
  [CfgDataType.CFGDTDateTime]: {
    max: 0,
    min: 0,
  },
  [CfgDataType.CFGDTMaxDataType]: {
    max: 0,
    min: 0,
  },
});

export enum CfgFieldType {
  CFGFTNoFieldType,
  CFGFTRecordID,
  CFGFTPhone,
  CFGFTRecordType,
  CFGFTRecordStatus,
  CFGFTDialResult,
  CFGFTNumberOfAttempts,
  CFGFTScheduledTime,
  CFGFTCallTime,
  CFGFTFrom,
  CFGFTUntil,
  CFGFTTimeZone,
  CFGFTCampaignID,
  CFGFTAgentID,
  CFGFTChainID,
  CFGFTNumberInChain,
  CFGFTCustomField,
  CFGFTANI,
  CFGFTLATA,
  CFGFTNPA,
  CFGFTNPA_NXX,
  CFGFTStateCode,
  CFGFTInfoDigits,
  CFGFTCountryCode,
  CFGFTPhoneType,
  CFGFTGroupDBID,
  CFGFTAppDBID,
  CFGFTTreatments,
  CFGFTMediaRefference,
  CFGFTEmailSubject,
  CFGFTEmailTemplateID,
  CFGFTSwitchID,
  CFGFTMaxFieldType,
}
export const SelectList = Object.freeze({
  [CfgFieldType.CFGFTPhoneType]: ContactTypes,
  [CfgFieldType.CFGFTRecordType]: RecordTypes,
  [CfgFieldType.CFGFTRecordStatus]: RecordStatuses,
  [CfgFieldType.CFGFTDialResult]: CallResults,
});

export const IncludedGroups = Object.freeze({
  tz_dbid: 'timezones',
  c_tz_dbid: 'timezones',
  cd_tz_dbid: 'timezones',
  group_id: 'campaignGroups',
  campaign_id: 'campaigns',
  app_id: 'applications',
});

export const TableAccessTypes = Object.freeze({
  2: 'gsw_request_log',
  11: 'gsw_donotcall_list',
});
