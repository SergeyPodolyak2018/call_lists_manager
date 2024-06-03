import { type } from 'os';
import { io, Socket } from 'socket.io-client';
import { TCfgCampaignGroup } from 'src/api/ts/interfaces/FindFolders.response';
import Utils from 'src/helper/utils';
import { NotificationsError, ConnectionStatusNotification } from 'src/interfaces/webSocketsNotifyTypes';

interface IOcsStatus {
  ocsId: number;
  status: string;
}
class WebSocketManager {
  private static instance: WebSocketManager | null = null;
  private ioClient: Socket | null = null;
  private ocsStatuses: IOcsStatus[] = [];
  private callbacksMap: Map<string, any> = new Map();
  private currentOcsId = 0;
  public getOcsIsAvailable(ocsId: number) {
    return this.ocsStatuses.find(x => x.ocsId === ocsId)?.status;
  }

  private constructor() {}

  public static getInstance(): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager();
    }
    return WebSocketManager.instance;
  }

  public disconnectWebSocket() {
    if (this.ioClient) {
      this.ioClient.disconnect();
    }
  }
  public initializeWebSocket() {
    if (!this.ioClient) {
      const token = sessionStorage.getItem('access_token')?.toString();
      this.ioClient = io(`${Utils.baseUri}`, {
        autoConnect: false,
        transports: ['websocket'],
        query: {
          token: token,
        },
        path: '/customer/notifications/',
      });

      this.ioClient.connect();

      this.ioClient.on('disconnect', () => {
        console.log('Disconnected from WebSocket');
      });
      this.ioClient.on('campaigns', data => {
        const payload: any = {
          dialMode: data.data.dialMode,
          groupId: data.data.groupId,
          campaignId: data.data.campaignId,
          ivrProfile: '',
          maxQueueSize: 1,
          optMethod: data.data.optimizeBy,
          schedule: '',
          statServer: '',
          optMethodValue: data.data.optimizeGoal,
          trunkGroup: '',
          voiceTransferDestination: '',
          scheduleName: data.data.scheduleName,
        };
        if (data.data.status) {
          this.ocsStatuses.map(x => {
            if (x.ocsId === data.data.ocsId) {
              return { ...x, status: data.data.status };
            }
            return x;
          });
        }

        const key = `${payload.groupId}_${payload.campaignId}`;
        const callback = this.callbacksMap.get(key);
        if (data.data.status) {
          this.callbacksMap.forEach(x => {
            x(
              payload,
              {
                campaignId: payload.campaignId,
                campaignStatus: data.data.groupStatus,
                groupId: payload.groupId,
              },
              data as NotificationsError,
              data as ConnectionStatusNotification,
            );
          });
        } else {
          if (callback) {
            callback(
              payload,
              {
                campaignId: payload.campaignId,
                campaignStatus: data.data.groupStatus,
                groupId: payload.groupId,
              },
              data as NotificationsError,
              data as ConnectionStatusNotification,
            );
          }
        }
      });
    }
  }

  public subscribeCampaign(campaign: TCfgCampaignGroup, ocsId: number, callBack: any) {
    this.initializeWebSocket();

    if (ocsId !== this.currentOcsId) {
      this.callbacksMap.clear();
      this.currentOcsId = ocsId;
    }

    const key = `${campaign.groupId}_${campaign.campaignId}`;

    if (!this.ocsStatuses.find(x => x.ocsId === ocsId)) {
      this.ocsStatuses.push({ ocsId: ocsId, status: 'UNAVAILABLE' });
    }

    this.callbacksMap.set(key, callBack);
    this.subscribeCampaignStatus(campaign, ocsId);
  }

  public subscribeCampaignStatus(campaign: TCfgCampaignGroup, ocsId: number) {
    if (this.ioClient) {
      this.ioClient.emit('subscribeCampaignStatus', {
        campaignId: campaign.campaignId,
        groupId: campaign.groupId,
        ocsId: ocsId,
      });
    }
  }
}

export const webSocketManager = WebSocketManager.getInstance();
