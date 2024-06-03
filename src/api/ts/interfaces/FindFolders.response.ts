import { FolderTypes } from '../constants/codes';
import { Properties } from './Campaigns.payload';
export type TFindFoldersResponse = {
  $class: EClass;
  items: TFindFoldersResponseStandartPart[] | TCfgCampaignGroup[];
  parentId?: number;
} & TTipicalPartOfElements;

export type TFindFoldersResponseStandartPart = TCfgFolder | TCfgCampaign;

export type Tree<T> = T & {
  items?: Tree<T>[];
};

export enum EClass {
  FOLDER = 'CfgFolder',
  CAMPAIGN = 'CfgCampaign',
  CAMPAIGM_GROUP = 'CfgCampaignGroup',
  CALLING_LIST = 'CfgCallingList',
  TABLE_ACCESS = 'CfgTableAccess',
  SCRIPT = 'CfgScript',
}

export type TCfgFolder = {
  $class: EClass.FOLDER;
  type: FolderTypes.Folder;
  items: Tree<TCfgFolder | TCfgCampaign>[];
  state: number;
} & TTipicalPartOfElements;

export type TCfgCampaign = {
  $class: EClass.CAMPAIGN;
  items: Tree<TCfgCampaignFolder | TCfgCampaign>[];
  state: number;
} & TTipicalPartOfElements &
  TCallingListsStruct;

export type IFoundCfgCampaignGroup = {
  campaigns: TCfgCampaignGroup[];
  isSearching: boolean;
};
export type TCfgCampaignGroup = {
  $class: EClass.CAMPAIGM_GROUP;
  dialMode: string;
  groupId: number;
  campaignId: number;
  ivrProfile: string;
  maxQueueSize: number;
  optMethod: string;
  schedule: string;
  statServer: string;
  target: number;
  trunkGroup: string;
  voiceTransferDestination: string;
  state: number;
  parentId?: number;
  interactionQueue: string;
  requestProperties: Properties;
} & TTipicalPartOfElements &
  TCallingListsStruct;

export type TCallingLists = {
  $class: EClass.CALLING_LIST;
  weight: number;
} & TTipicalPartOfElements;

export type TCfgCampaignFolder = {
  $class: EClass.FOLDER;
  type: FolderTypes.CampaignGroup;
  items: Tree<TCfgCampaignFolder | TCfgCampaignGroup>[];
  state: number;
} & TTipicalPartOfElements;

export type TTipicalPartOfElements = {
  id: number;
  name: string;
};
export type TCallingListsStruct = {
  callingLists: TCallingLists[];
};
