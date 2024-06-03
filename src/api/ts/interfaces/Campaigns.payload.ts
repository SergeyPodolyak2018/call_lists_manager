import { CampaignStatuses } from '../constants/codes';

export interface ICampaignStart {
  campaignId: number;
  groupId: number;
  completeIfNoMoreRecords: boolean;
  dialMode: string;
  optMethod: string;
  optMethodValue: number;
  ocsId: number;
}

export interface ICampaignAction {
  campaignId: number;
  groupId: number;
  ocsId: number;
  completeIfNoMoreRecords?: boolean;
}

export interface ICampaignChangeDialAction {
  campaignId: number;
  groupId: number;
  completeIfNoMoreRecords: boolean;
  dialMode: string;
  optMethod: string;
  optMethodValue: number;
  ocsId: number;
  requestProperties: Properties;
}

export interface ICampaignsToggle {
  collapse: boolean;
  expand: boolean;
}

export type Properties = {
  [key: string]: {
    priority: number;
    n_records: number;
  };
};

export type TCampaignStatus = {
  groupId: number;
  campaignId: number;
  ocsId: number;
};
export type TCampaignStatusPayload = {
  ocsId: number;
  campaigns: TCampaignStatus[];
};

export type TOCSCampaign = {
  groupId: number;
  ocsId: number;
};

export type TGetCampaignObjectPayload = {
  parentId?: number;
  name?: string;
  limit?: number;
  page?: number;
  offset?: number;
  statusFilter?: string;
  ownerId?: number;
};
