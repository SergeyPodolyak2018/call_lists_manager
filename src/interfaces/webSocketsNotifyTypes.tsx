export type NotificationsError = {
  name: string;
  data: ErrorData;
};

export type ConnectionStatusNotification = {
  name: string;
  data: ConnectionStatusData;
};

type ConnectionStatusData = {
  ocsId: number;
  status: string;
};
type ErrorData = {
  message: string;
};
