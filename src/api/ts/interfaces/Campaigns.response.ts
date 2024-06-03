import { CampaignStatuses } from '../constants/codes';
import { TCallingListsResponse } from './CallingLists.response';

export interface ICampaign {
  $class: string;
  DBID: number;
  tenantDBID: number;
  name: string;
  campaignGroups: ICampaignGroup[];
  scriptDBID: number;
  state: number;
  userPropertiesData: IUserPropertiesData;
  callingLists: TCallingListsResponse;
}

export interface ICampaignGroup {
  $class: string;
  groupDBID: number;
  groupType: number;
  dialerDBID: number;
  statServerDBID: number;
  isActive: number;
  dialMode: number;
  origDNDBID: number;
  numOfChannels: number;
  operationMode: number;
  minRecBuffSize: number;
  optRecBuffSize: number;
  optMethod: number;
  optMethodValue: number;
  scriptDBID: number;
  trunkGroupDNDBID: number;
}
export interface IUserPropertiesData {
  CloudContact: ICloudContact;
}

export interface ICloudContact {
  createdDate: string;
  modifiedDate: string;
  version: string;
}
export interface ICampaignStatus {
  campaignId: number;
  campaignStatus: CampaignStatuses;
  groupId: number;
}

export interface TreeNode {
  [key: string]: any; // type for unknown keys.
  children?: TreeNode[]; // type for a known property.
}
export type Tree<T> = T & {
  children?: T[];
};

//===================start stop campaigns===============================

export type TCampaignActionResponse = {
  status: CampaignStatuses;
};
export type TCampaignActionStopResponse = {
  data: {
    campaignId: number;
    groupCampaignStatus: CampaignStatuses;
    groupId: number;
    referenceId: number;
  };
};
