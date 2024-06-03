import { TCallingListRecors } from './CallingLists.response';

export type TGetCallingListPayload = {
  id?: number;
  name?: string;
  limit?: number;
  page?: number;
  ofset?: number;
};

export type TGetCallingListById = {
  listId?: number;
  extended?: boolean;
};

export type TPutCallingListById = {
  listId: number;
  filterId?: number;
  viewingFilter?: {
    criteria: string;
    orderBy: string;
    useFilter: boolean;
  }
};


export type TGetCallingListObjectPayload = {
  parentId?: number;
  name?: string;
  limit?: number;
  page?: number;
  offset?: number;
};

export type TGetCallingListRecordsPayload = {
  listId: number;
  limit?: number;
  sortBy?: string;
  offset?: number;
  orderBy?: 'ASC' | 'DESC';
  useFilter?:boolean;
  whereCondition?: string;
  orderByCondition?: string;
  include?: string;
};
export type TGetCallingListFieldsPayload = {
  listId: number;
};

export type TDeleteCallingListRecordsPayload = {
  listId: number;
  name: string;
  data: {
    recordIds: number[];
    negation: boolean;
    fields?: TCallingListRecors;
    useFilter:boolean;
    whereCondition?:string;
  };
};

export type TPutCallingListRecordsPayload = {
  listId: number;
  name: string;
  data: {
    recordIds: number[];
    negation: boolean;
    fields: Partial<TCallingListRecors>;
    useFilter:boolean;
    whereCondition?:string;
  };
};

export type TPostCallingListRecordsPayload = {
  listId: number;
  name: string;
  data: {
    fields: Partial<TCallingListRecors>;
  };
};

export type TImportDoNotCallingListPayload = {
  file:FormData;
  mode:'APPEND_ONLY' | 'APPEND_AND_UPDATE'
}