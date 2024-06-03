import axios from './axios';

import logger from '../helper/logger';
import Utils from '../helper/utils';

import { ILoginPayload } from './ts/interfaces/config.payload';

import {
  ICampaign,
  ICampaignGroup,
  ICampaignStatus,
  TCampaignActionResponse,
  TCampaignActionStopResponse,
} from './ts/interfaces/Campaigns.response';
import {
  ICampaignAction,
  ICampaignChangeDialAction,
  ICampaignStart,
  TCampaignStatus,
  TCampaignStatusPayload,
} from './ts/interfaces/Campaigns.payload';

import { IResponse, IResponseData, IStatus } from './ts/interfaces/response';

import { TUserInfoResponse } from './ts/interfaces/UserInfo.respons';
import { TCfgCampaignGroup, TFindFoldersResponse, TCfgCampaign } from './ts/interfaces/FindFolders.response';
import { TCurrentData } from './ts/interfaces/Current.response';
import { TFindCampaignsPayload, TFindFoldersPayload } from './ts/interfaces/FindFolders.payload';
import { EndpointByFolderType } from './ts/constants/codes';
import {
  TDeleteCallingListRecordsPayload,
  TGetCallingListById,
  TGetCallingListFieldsPayload,
  TGetCallingListObjectPayload,
  TGetCallingListPayload,
  TGetCallingListRecordsPayload,
  TImportDoNotCallingListPayload,
  TPostCallingListRecordsPayload,
  TPutCallingListById,
  TPutCallingListRecordsPayload,
} from './ts/interfaces/CallingLists.payload';
import {
  TCallingListFields,
  TCallingListRecors,
  TCallingListsExtendedResponse,
  TCallingListsObjectsResponse,
  TCallingListsRecordsResponse,
  TCallingListsResponse,
  TDeleteCallingListRecordsResp,
  TDoNotCallListImportResponse,
  TPutCallingListRecordsResp,
  TTableAccessResponse,
} from './ts/interfaces/CallingLists.response';
import { TScheduleListsResponse } from './ts/interfaces/ScheduleLists.response';
import { IItemsInCallingLists } from 'src/redux/reducers/callingListsReducer';
import { TFilter } from './ts/interfaces/Filters.response';
import { RootStore, store } from '../redux/store';
import { getTenantId } from 'src/redux/selectors/loginSelector';
import { TFilterPayload } from './ts/interfaces/Filters.payload';
import { TTZListResponse } from './ts/interfaces/TZList.response';
class RestAPI {
  private readonly base_uri: string;
  private readonly customer_uri: string;
  private store: RootStore;

  constructor() {
    this.base_uri = Utils.baseUri + Utils.apiPrefix;
    this.customer_uri = Utils.wfmUri + Utils.wfmApiPrefix;
    logger.info(`base_uri ${this.base_uri}`);
    logger.info(`customer_uri ${this.customer_uri}`);
    this.store = store;
  }

  getTenantId() {
    const getState = this.store.getState;
    const tenantId = getTenantId(getState());
    return { tenantId };
  }

  //tenantId
  //==================================================USER INFO===============================================

  async fetchLogin(credentials: ILoginPayload) {
    return await axios
      .post(`${this.base_uri}/users/login`, credentials)
      .then(res => res.data)
      .catch(err => {
        logger.error(err);
        return Promise.reject(err);
      });
  }

  async fetchLogout() {
    return await axios
      .post(`${this.base_uri}/users/logout`, {})
      .then(res => res.data)
      .catch(err => {
        logger.error(err);
        return Promise.reject(err);
      });
  }

  async getUser() {
    return await axios.get<TUserInfoResponse>(`${this.base_uri}/users/info`, {
      headers: {
        browser: Utils.getBrowser(),
      },
    });
  }

  async getCurrent() {
    return await axios
      .get<IResponse<TCurrentData>>(`${this.base_uri}/ocs/current`, {})
      .then(res => res.data)
      .catch(err => {
        logger.error(err);
        return Promise.reject(err);
      });
  }
  async getOCSList() {
    return await axios
      .get<IResponse<TCurrentData[]>>(
        `${this.base_uri}/ocs/list${Utils.getQueryStringByObject(this.getTenantId())}`,
        {},
      )
      .then(res => res.data)
      .catch(err => {
        logger.error(err);
        return Promise.reject(err);
      });
  }
  async getcustomerFilters(payload: TFilterPayload) {
    return await axios
      .get<IResponse<TFilter[]>>(
        `${this.base_uri}/filters${Utils.getQueryStringByObject({ ...payload, ...this.getTenantId() })}`,
        {},
      )
      .then(res => res.data)
      .catch(err => {
        logger.error(err);
        return Promise.reject(err);
      });
  }
  async getTZList() {
    return await axios
      .get<IResponse<TTZListResponse[]>>(
        `${this.base_uri}/timezones/objects${Utils.getQueryStringByObject(this.getTenantId())}`,
        {},
      )
      .then(res => res.data)
      .catch(err => {
        logger.error(err);
        return Promise.reject(err);
      });
  }

  //=========================================CAPPAIGN TREE ===============================================

  async getCampaigns(payload?: TFindFoldersPayload): Promise<IResponse<ICampaign[]>> {
    return axios
      .post(
        `${this.base_uri}/campaign/findCampaigns${Utils.getQueryStringByObject({
          ...payload,
          ...this.getTenantId(),
        })}`,
        {},
      )
      .then(res => res.data)
      .catch(err => {
        logger.error(err);
        return Promise.reject(err);
      });
  }

  async getCampaignsAll(payload: TFindFoldersPayload): Promise<IResponse<TFindFoldersResponse[]>> {
    return await axios
      .get(
        `${this.base_uri}/campaigns/all-campaigns-tree${Utils.getQueryStringByObject({
          ...payload,
          ...this.getTenantId(),
        })}`,
      )
      .then(res => res.data);
  }

  async getCampaignsDeep(folderType: number, payload: TFindFoldersPayload): Promise<IResponse<TFindFoldersResponse[]>> {
    return await axios
      .get(
        `${this.base_uri}/campaigns/${EndpointByFolderType[folderType]}${Utils.getQueryStringByObject({
          ...payload,
          ...this.getTenantId(),
        })}`,
      )
      .then(res => res.data);
  }

  async getCampaign(payload: TFindFoldersPayload): Promise<IResponse<ICampaign[]>> {
    return await axios
      .get(
        `${this.base_uri}/campaigns/${Utils.getQueryStringByObject({
          ...payload,
          ...this.getTenantId(),
        })}`,
      )
      .then(res => res.data);
  }

  // async getCampaignGropus(payload: TGetCampaignObjectPayload): Promise<IResponse<ICampaign[]>> {
  //   return await axios
  //     .get(
  //       `${this.base_uri}/campaign-groups/${Utils.getQueryStringByObject({
  //         ...payload,
  //         ...this.getTenantId(),
  //       })}`,
  //     )
  //     .then(res => res.data);
  // }

  async getCampaignsCount(): Promise<IResponse> {
    return await axios
      .get(
        `${this.base_uri}/campaigns/total${Utils.getQueryStringByObject({
          ...this.getTenantId(),
        })}`,
      )
      .then(res => res.data);
  }

  async getCampaignGroups(payload: TFindCampaignsPayload): Promise<IResponse<TCfgCampaignGroup[]>> {
    return await axios
      .get(
        `${this.base_uri}/campaigns/campaign-groups${Utils.getQueryStringByObject({
          ...this.getTenantId(),
          ...payload,
        })}`,
      )
      .then(res => res.data);
  }

  async getCampaignServers() {
    return await axios
      .get(
        `${this.base_uri}/campaigns/servers${Utils.getQueryStringByObject({
          ...this.getTenantId(),
        })}`,
      )
      .then(res => res.data);
  }

  async getCampaignsTree(payload: TFindCampaignsPayload): Promise<IResponse<TCfgCampaign>> {
    return await axios
      .get(
        `${this.base_uri}/campaigns/campaigns-tree${Utils.getQueryStringByObject({
          ...this.getTenantId(),
          ...payload,
        })}`,
      )
      .then(res => res.data);
  }

  //======================================================STATUS===========================================

  // async campaignStatus(data: ICampaignStart) {
  //   return await axios.get<IResponse<ICampaignStatus>>(
  //     `${this.base_uri}/campaigns/status?campaignName=${data.campaignName}&groupName=${data.groupName}`,
  //     {
  //       headers: {
  //         browser: Utils.getBrowser(),
  //       },
  //     },
  //   );
  // }

  async postCampaignStatusBatch(payload: TCampaignStatusPayload): Promise<IResponse<ICampaignStatus[]>> {
    return axios
      .post(`${this.base_uri}/campaigns/status-batch${Utils.getQueryStringByObject(this.getTenantId())}`, payload)
      .then(res => res.data)
      .catch(err => {
        logger.error(err);
        return Promise.reject(err);
      });
  }

  async campaignStart(payload: ICampaignStart): Promise<IResponse<TCampaignActionResponse>> {
    return axios
      .post(`${this.base_uri}/campaigns/start${Utils.getQueryStringByObject(this.getTenantId())}`, payload)
      .then(res => res.data)
      .catch(err => {
        logger.error(err);
        return Promise.reject(err);
      });
  }

  async campaignStop(payload: ICampaignAction): Promise<IResponse<TCampaignActionResponse>> {
    return axios
      .post(`${this.base_uri}/campaigns/stop${Utils.getQueryStringByObject(this.getTenantId())}`, payload)
      .then(res => res.data)
      .catch(err => {
        logger.error(err);
        return Promise.reject(err);
      });
  }

  async campaignForceStop(payload: ICampaignAction): Promise<IResponse<TCampaignActionResponse>> {
    return axios
      .post(`${this.base_uri}/campaigns/force-unload${Utils.getQueryStringByObject(this.getTenantId())}`, payload)
      .then(res => res.data)
      .catch(err => {
        logger.error(err);
        return Promise.reject(err);
      });
  }

  async campaignLoad(payload: ICampaignAction): Promise<IResponse<TCampaignActionResponse>> {
    return axios
      .post(`${this.base_uri}/campaigns/load${Utils.getQueryStringByObject(this.getTenantId())}`, payload)
      .then(res => res.data)
      .catch(err => {
        logger.error(err);
        return Promise.reject(err);
      });
  }

  async campaignPause(payload: ICampaignAction): Promise<IResponse<TCampaignActionResponse>> {
    return axios
      .post(`${this.base_uri}/campaigns/pause${Utils.getQueryStringByObject(this.getTenantId())}`, payload)
      .then(res => res.data)
      .catch(err => {
        logger.error(err);
        return Promise.reject(err);
      });
  }

  async campaignResume(payload: ICampaignAction): Promise<IResponse<TCampaignActionResponse>> {
    return axios
      .post(`${this.base_uri}/campaigns/resume${Utils.getQueryStringByObject(this.getTenantId())}`, payload)
      .then(res => res.data)
      .catch(err => {
        logger.error(err);
        return Promise.reject(err);
      });
  }

  async campaignChangeDial(payload: ICampaignChangeDialAction): Promise<IResponse<TCampaignActionResponse>> {
    return axios
      .post(`${this.base_uri}/campaigns/change-dial${Utils.getQueryStringByObject(this.getTenantId())}`, payload)
      .then(res => res.data)
      .catch(err => {
        logger.error(err);
        return Promise.reject(err);
      });
  }

  async campaignForceUnload(payload: ICampaignAction): Promise<IResponse<TCampaignActionResponse>> {
    return axios
      .post(`${this.base_uri}/campaigns/force-unload${Utils.getQueryStringByObject(this.getTenantId())}`, payload)
      .then(res => res.data)
      .catch(err => {
        logger.error(err);
        return Promise.reject(err);
      });
  }

  //=========================================Schedules lists ================================================

  async getSchedulesLists(payload: TGetCallingListObjectPayload): Promise<IResponse<TScheduleListsResponse[]>> {
    return await axios
      .get(`${this.base_uri}/schedules${Utils.getQueryStringByObject({ ...payload, ...this.getTenantId() })}`)
      .then(res => res.data);
  }

  async getSchedulesFolders(payload: TGetCallingListObjectPayload): Promise<IResponse<TScheduleListsResponse[]>> {
    return await axios
      .get(`${this.base_uri}/schedules/folders${Utils.getQueryStringByObject({ ...payload, ...this.getTenantId() })}`)
      .then(res => res.data);
  }

  async getSchedule(payload: TGetCallingListById): Promise<IResponse<TCallingListsExtendedResponse>> {
    return await axios
      .get(
        `${this.base_uri}/schedules/${payload.listId}${Utils.getQueryStringByObject(
          { ...payload, ...this.getTenantId() },
          ['listId'],
        )}`,
      )
      .then(res => res.data);
  }

  async putSchedule(payload: any, id: any): Promise<IResponse<TDeleteCallingListRecordsResp[]>> {
    return await axios
      .put(`${this.base_uri}/schedules/${id}${Utils.getQueryStringByObject(this.getTenantId())}`, payload)
      .then(res => res.data);
  }

  async postSchedule(payload: any): Promise<IResponse<TDeleteCallingListRecordsResp[]>> {
    return await axios
      .post(`${this.base_uri}/schedules${Utils.getQueryStringByObject(this.getTenantId())}`, payload)
      .then(res => res.data);
  }

  async deleteSchedule(payload: any): Promise<IResponse<TDeleteCallingListRecordsResp[]>> {
    return await axios
      .delete(`${this.base_uri}/schedules/${payload.listId}${Utils.getQueryStringByObject(this.getTenantId())}`)
      .then(res => res.data);
  }

  //=========================================Calling lists ================================================
  async getCallingListsTotal(): Promise<IResponse<number>> {
    return await axios
      .get(`${this.base_uri}/calling-lists/total${Utils.getQueryStringByObject({ ...this.getTenantId() })}`)
      .then(res => res.data);
  }

  async getCallingListsAll(payload: TGetCallingListPayload): Promise<IResponse<TCallingListsResponse[]>> {
    return await axios
      .get(`${this.base_uri}/calling-lists${Utils.getQueryStringByObject({ ...payload, ...this.getTenantId() })}`)
      .then(res => res.data);
  }

  async getCallingListsObject(
    payload: TGetCallingListObjectPayload,
  ): Promise<IResponse<TCallingListsObjectsResponse[] | IItemsInCallingLists>> {
    return await axios
      .get(
        `${this.base_uri}/calling-lists/objects${Utils.getQueryStringByObject({ ...payload, ...this.getTenantId() })}`,
      )
      .then(res => res.data);
  }

  async getCallingList(payload: TGetCallingListById): Promise<IResponse<TCallingListsExtendedResponse>> {
    return await axios
      .get(
        `${this.base_uri}/calling-lists/${payload.listId}${Utils.getQueryStringByObject(
          { ...payload, ...this.getTenantId() },
          ['listId'],
        )}`,
      )
      .then(res => res.data);
  }
  async getCallingListRelatedCampaiogns(payload: { listId: number }): Promise<IResponse<TCfgCampaignGroup[]>> {
    return await axios
      .get(
        `${this.base_uri}/calling-lists/${payload.listId}/campaign-groups${Utils.getQueryStringByObject(
          { ...payload, ...this.getTenantId() },
          ['listId'],
        )}`,
      )
      .then(res => res.data);
  }

  async getDoNotCallingList(): Promise<IResponse<TTableAccessResponse>> {
    return await axios
      .get(`${this.base_uri}/do-not-call-list${Utils.getQueryStringByObject(this.getTenantId())}`)
      .then(res => res.data);
  }
  async importDoNotCallingList(data: FormData): Promise<IResponse<TDoNotCallListImportResponse>> {
    return await axios
      .post(
        `${this.base_uri}/do-not-call-list/records/import${Utils.getQueryStringByObject(this.getTenantId())}`,
        data,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        },
      )
      .then(res => res.data);
  }
  async getImportDoNotCallingList(): Promise<IResponse<TDoNotCallListImportResponse>> {
    return await axios
      .get(`${this.base_uri}/do-not-call-list/records/import${Utils.getQueryStringByObject(this.getTenantId())}`)
      .then(res => res.data);
  }

  async deleteDoNotCallingList(option: string): Promise<IResponse<{ deletedRecords: number }>> {
    return await axios
      .delete(`${this.base_uri}/do-not-call-list/records${Utils.getQueryStringByObject(this.getTenantId())}`, {
        data: { option: option },
      })
      .then(res => res.data);
  }

  async getRequestLog(): Promise<IResponse<TTableAccessResponse>> {
    return await axios
      .get(`${this.base_uri}/request-log${Utils.getQueryStringByObject(this.getTenantId())}`)
      .then(res => res.data);
  }

  async putCallingList(payload: TPutCallingListById): Promise<IResponse<never>> {
    return await axios
      .put(
        `${this.base_uri}/calling-lists/${payload.listId}${Utils.getQueryStringByObject(
          { ...payload, ...this.getTenantId() },
          ['filterId', 'viewingFilter'],
        )}`,
        {
          callingList: {
            ...(payload.filterId !== undefined && { filterId: payload.filterId }),
            ...(payload.viewingFilter && { viewingFilter: payload.viewingFilter }),
          },
        },
      )
      .then(res => res.data);
  }

  async getCallingListsRecords(
    payload: TGetCallingListRecordsPayload,
  ): Promise<IResponse<TCallingListsRecordsResponse>> {
    return await axios
      .get(
        `${this.base_uri}/calling-lists/${payload.listId}/records${Utils.getQueryStringByObject(
          { ...payload, ...this.getTenantId() },
          ['listId', 'name'],
        )}`,
      )
      .then(res => res.data);
  }
  async deleteCallingListsRecords(
    payload: TDeleteCallingListRecordsPayload,
  ): Promise<IResponse<TDeleteCallingListRecordsResp[]>> {
    return await axios
      .delete(
        `${this.base_uri}/calling-lists/${payload.listId}/records${Utils.getQueryStringByObject(this.getTenantId())}`,
        { data: payload.data },
      )
      .then(res => res.data);
  }
  async putCallingListsRecords(payload: TPutCallingListRecordsPayload): Promise<IResponse<TPutCallingListRecordsResp>> {
    return await axios
      .put(
        `${this.base_uri}/calling-lists/${payload.listId}/records${Utils.getQueryStringByObject(this.getTenantId())}`,
        payload.data,
      )
      .then(res => res.data);
  }
  async postCallingListsRecords(
    payload: TPostCallingListRecordsPayload,
  ): Promise<IResponse<TDeleteCallingListRecordsResp[]>> {
    return await axios
      .post(
        `${this.base_uri}/calling-lists/${payload.listId}/records${Utils.getQueryStringByObject(this.getTenantId())}`,
        payload.data.fields,
      )
      .then(res => res.data);
  }
  async importCallingListsRecords(
    listId: number,
    formData: FormData,
  ): Promise<IResponse<TDeleteCallingListRecordsResp[]>> {
    return await axios
      .post(
        `${this.base_uri}/calling-lists/${listId}/records/import${Utils.getQueryStringByObject(this.getTenantId())}`,
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        },
      )
      .then(res => res.data);
  }
  async getCallingListsRecordsImport(
    payload: TGetCallingListFieldsPayload,
  ): Promise<IResponse<TDoNotCallListImportResponse>> {
    return await axios
      .get(
        `${this.base_uri}/calling-lists/${payload.listId}/records/import${Utils.getQueryStringByObject(
          this.getTenantId(),
        )}`,
      )
      .then(res => res.data);
  }

  async exportCallingListsRecords(payload: TGetCallingListRecordsPayload): Promise<IResponse> {
    return await axios.get(
      `${this.base_uri}/calling-lists/${payload.listId}/records/export${Utils.getQueryStringByObject(
        { ...payload, ...this.getTenantId() },
        ['listId', 'name'],
      )}`,
      {
        headers: {
          accept: 'text/csv',
        },
      },
    );
  }
  async getCallingListsFields(payload: TGetCallingListFieldsPayload): Promise<IResponse<TCallingListFields[]>> {
    return await axios
      .get(`${this.base_uri}/calling-lists/${payload.listId}/fields${Utils.getQueryStringByObject(this.getTenantId())}`)
      .then(res => res.data);
  }
  async addCallingListsDBTable(payload: TGetCallingListFieldsPayload): Promise<IResponse<never>> {
    return await axios
      .post(
        `${this.base_uri}/calling-lists/${payload.listId}/db/table${Utils.getQueryStringByObject(this.getTenantId())}`,
        {},
      )
      .then(res => res.data);
  }
}

const restApi = new RestAPI();
export default restApi;
