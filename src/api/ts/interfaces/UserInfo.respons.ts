import { IResponse } from '../interfaces/response';
export type TUserInfoResponse = IResponse<TUserInfoData>;
export type TUserInfoData = {
  id: number;
  appVersion: string;
  nodeVersion: string;
  firstName: string;
  lastName: string;
  userName: string;
  tenantId: number;
  employeeId: string;
};
