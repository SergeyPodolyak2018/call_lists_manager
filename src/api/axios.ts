import axios, { AxiosError } from 'axios';

import { RootStore } from '../redux/store';
import { StatusCodes } from './ts/constants/codes';
import Utils, { NODE_ENV_TYPE } from '../helper/utils';

import { setupCache } from 'axios-cache-interceptor';
import logger from '../helper/logger';
import { IToast } from 'src/component/ToastProvider';
import { P } from '@genesys/arkui-react';

let store: RootStore;

export const injectStore = (_store: RootStore) => {
  store = _store;
};

const apiRequester = setupCache(
  axios.create({
    withCredentials: true,
    maxContentLength: 1000,
    timeout: Utils.GATEWAY_TIME_OUT,
  }),
  {
    methods: ['post', 'delete', 'put'],
    cachePredicate: {
      statusCheck: (status: any) => [200].includes(status),
      responseMatch: (res: any) => {
        return Utils.CACHED_ENDPOINTS.some((endpoint: any) => res.config.url?.includes(endpoint));
      },
    },
    ttl: Utils.CACHE_TTL,
  },
);

apiRequester.interceptors.response.use(
  response => {
    if (response.status === 207 && response.data && response.data.status && response.data.status.code) {
      const title = Utils.getToastHeader(response.request.responseURL);
      const data: IToast = {
        title: title,
        message: response.data.errors.join(' '),
        type: response.status,
      };
      document.dispatchEvent(new CustomEvent('toastMessage', { detail: { data: data } }));
    }
    return response;
  },
  err => {
    const title = Utils.getToastHeader(err.request.responseURL);
    const exclude = Utils.excludePath(err.request.responseURL);
    if (!exclude) {
      if (err && err.response && err.response.data && err.response.data.status && err.response.data.status.code) {
        const data: IToast = {
          title: title,
          message:
            typeof err.response.data.status.message === 'object'
              ? err.response.data.status.message.message
              : err.response.data.status.message,
          type: err.response.data.status.code,
        };
        if (!title.includes('Campaigns Error')) {
          document.dispatchEvent(new CustomEvent('toastMessage', { detail: { data: data } }));
        }
      } else {
        if (err && err.response.data && err.response.data.message) {
          const data: IToast = {
            title: title,
            message: err.response.data.message,
            type: err.response.data.statusCode,
          };
          document.dispatchEvent(new CustomEvent('toastMessage', { detail: { data: data } }));
        }
      }
    }

    return Promise.reject(err);
  },
);

apiRequester.interceptors.request.use(
  response => {
    response.headers['X-customer-User'] = `${sessionStorage.getItem('access_token')}`;
    return response;
  },
  (error: AxiosError) => {
    const partialAxiosError = {
      message: error.message,
      code: error.code,
    };
    return Promise.reject(error);
  },
);

export default apiRequester;
