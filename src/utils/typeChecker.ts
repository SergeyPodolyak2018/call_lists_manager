import {
  TFindFoldersResponseStandartPart,
  EClass,
  TCfgCampaign,
  TCfgCampaignGroup,
  TCfgFolder,
  TCfgCampaignFolder,
  TCallingLists,
} from '../api/ts/interfaces/FindFolders.response';

import { FolderTypes } from '../api/ts/constants/codes';
import { TCallingListsObjectsResponse } from 'src/api/ts/interfaces/CallingLists.response';
const TypeCheckerMagasin = {
  isCfgFolder(
    data:
      | TCfgCampaign
      | TCfgCampaignGroup
      | TCfgFolder
      | TCfgCampaignFolder
      | TCallingLists
      | TCallingListsObjectsResponse,
  ): data is TCfgFolder {
    if ('type' in data && data?.type === FolderTypes.Folder) {
      return data.$class === EClass.FOLDER;
    }
    return false;
  },
  isCampaignGroup(
    data:
      | TCfgCampaign
      | TCfgCampaignGroup
      | TCfgFolder
      | TCfgCampaignFolder
      | TCallingLists
      | TCallingListsObjectsResponse,
  ): data is TCfgCampaignGroup {
    return data.$class === EClass.CAMPAIGM_GROUP;
  },
  isCampaignFolder(
    data:
      | TCfgCampaign
      | TCfgCampaignGroup
      | TCfgFolder
      | TCfgCampaignFolder
      | TCallingLists
      | TCallingListsObjectsResponse,
  ): data is TCfgCampaignFolder {
    return data.$class === EClass.FOLDER;
  },
  isCampaign(
    data:
      | TCfgCampaign
      | TCfgCampaignGroup
      | TCfgFolder
      | TCfgCampaignFolder
      | TCallingLists
      | TCallingListsObjectsResponse,
  ): data is TCfgCampaign {
    return data.$class === EClass.CAMPAIGN;
  },
  isCallingList(
    data:
      | TCfgCampaign
      | TCfgCampaignGroup
      | TCfgFolder
      | TCfgCampaignFolder
      | TCallingLists
      | TCallingListsObjectsResponse,
  ): data is TCallingLists {
    return data.$class === EClass.CALLING_LIST;
  },
};

export default TypeCheckerMagasin;
