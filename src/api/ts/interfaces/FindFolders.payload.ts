export type TFindFoldersPayload = {
  id?: number;
  parentId?: number;
  name?: string;
  ownerId?: number;
  offset?: number;
  limit: number;
};

export type TFindCampaignsPayload = {
  id?: number;
  name?: string;
};
