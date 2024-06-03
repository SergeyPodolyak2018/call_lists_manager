import logger from './logger';
import { EClass, TFindFoldersResponseStandartPart } from 'src/api/ts/interfaces/FindFolders.response';
import { TFindFoldersPayload } from '../api/ts/interfaces/FindFolders.payload';
import { TGetCallingListRecordsPayload } from 'src/api/ts/interfaces/CallingLists.payload';
import React from 'react';
import { allPaths, allPathsKeys, allPathsWithError, excludePath } from 'src/constants/path';
import { constants } from 'fs/promises';
import { P } from '@genesys/arkui-react';

export enum NODE_ENV_TYPE {
  PROD = 'production',
  DEV = 'development',
}

const NODE_ENV = process.env.NODE_ENV as NODE_ENV_TYPE;

const baseUri = import.meta.env.VITE_BASE_URI || `${window.location.protocol}//${window.location.host}`;
const wfmUri = import.meta.env.VITE_WFM_URI || `${window.location.protocol}//${window.location.host}`;
const apiPrefix = import.meta.env.VITE_COMMON_API_PREFIX || '/customer';
const wfmApiPrefix = import.meta.env.VITE_COMMON_WFM_API_PREFIX || '/customer';
const scheduleBuilderEnabled = import.meta.env.VITE_SCHEDULE_BUILDER_ENABLED;
const betaFeaturesEnabled = import.meta.env.VITE_BETA_FEATURES_ENABLED;
const buildVersion = import.meta.env.VITE_BUILD_VERSION || 'unknown';

const requestChunkSize = import.meta.env.VITE_REQUEST_CHUNK_SIZE_IN_BYTES || 1000 * 1024; // 1 MB. Note: May be greater than this value. Since only one field is split into chunks
const GATEWAY_TIME_OUT = import.meta.env.VITE_GATEWAY_TIME_OUT || 100 * 1000; // default 100 sec
const GATEWAY_TIME_OUT_LARGE_REQ = import.meta.env.VITE_GATEWAY_TIME_OUT || 60 * 10 * 1000; // default 10 min

const CACHED_ENDPOINTS =
  import.meta.env.VITE_CACHED_ENDPOINTS ||
  'buildTreeWithTeamByBuAndSiteId,timezone,buildTreeWithAgents,findActivitySet,findActivities,findShifts,findExceptions,findTimeOffs';
const CACHE_TTL = import.meta.env.VITE_CACHE_TTL || 5 * 60 * 1000; // 5 min

const Utils = {
  baseUri,
  wfmUri,
  apiPrefix,
  wfmApiPrefix,
  cookieName: 'JSESSIONID',

  get NODE_ENV() {
    return NODE_ENV;
  },

  get CACHE_TTL() {
    return Number(CACHE_TTL);
  },

  get CACHED_ENDPOINTS() {
    return CACHED_ENDPOINTS.split(',').map((i: any) => i.trim());
  },

  get GATEWAY_TIME_OUT() {
    return Number(GATEWAY_TIME_OUT);
  },

  get GATEWAY_TIME_OUT_LARGE_REQ() {
    return Number(GATEWAY_TIME_OUT_LARGE_REQ);
  },

  get BUILD_VERSION() {
    return buildVersion;
  },

  get REQUEST_CHUNK_SIZE_IN_BYTES() {
    return requestChunkSize;
  },

  get scheduleBuilderEnabled() {
    return this.checkEnvFlag(scheduleBuilderEnabled);
  },

  get betaFeaturesEnabled() {
    return this.checkEnvFlag(betaFeaturesEnabled);
  },
  getOS() {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    let os = 'Mac OS';

    if (macosPlatforms.includes(platform)) {
      os = 'Mac OS';
    } else if (iosPlatforms.includes(platform)) {
      os = 'iOS';
    } else if (windowsPlatforms.includes(platform)) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
      os = 'Linux';
    }

    return os;
  },

  getIcon(type: EClass): string {
    switch (type) {
      case EClass.TABLE_ACCESS:
        return 'icon-accessgroup1';
      // case EClass.CfgAccessGroup:
      //   return "icon-accessgroup1";
      // case EClass.CfgAgentGroup:
      //   return "icon-agentgroup";
      // case EClass.CfgAgentLogin:
      //   return "icon-personality2";
      // case EClass.CfgApplication:
      //   return "icon-settings";
      case EClass.CALLING_LIST:
        return 'icon-doc-list';
      case EClass.CAMPAIGN:
      case EClass.CAMPAIGM_GROUP:
        return 'icon-usergroup2';
        // case EClass.CfgDN:
        // case EClass.CfgDNGroup:
        // case EClass.CfgSwitch:
        return 'icon-dn';
      case EClass.FOLDER:
        return 'icon-folderclosed';
      // case EClass.CfgGVPIVRProfile:
      //   return "icon-edit";
      // case EClass.CfgHost:
      //   return "icon-host";
      // case EClass.CfgPlace:
      // case EClass.CfgPlaceGroup:
      //   return "icon-place1";
      // case EClass.CfgRole:
      //   return "icon-roles";
      // case EClass.CfgScript:
      //   return "icon-settings";
      // case EClass.CfgSkill:
      //   return "icon-skill3";
      // case EClass.CfgTenant:
      //   return "icon-cube";
      default:
        // Возвращайте значение по умолчанию, если тип не совпадает с ни одним case
        return 'icon-default';
    }
  },

  getFuncPerformance(name: string) {
    let time = Date.now();
    return () => {
      time = Date.now() - time;
      logger.debug(`function ${name}  performance: ${(time / 1000).toFixed(4)}s`);
    };
  },

  allowOnlyNumeric(event: any) {
    const validInputRegex = /^[0-9]$/;
    const key = event.key;

    if (!validInputRegex.test(key) && key !== 'Backspace') {
      event.preventDefault();
    }
  },

  splitNames(fullNames: string) {
    const firstNames: string[] = [];
    const lastNames: string[] = [];

    fullNames.split(',').forEach(fullName => {
      const strArr = fullName.trim().split(' ');
      strArr.forEach(str => {
        firstNames.push(str);
        lastNames.push(str);
      });
      // firstNames.push(firstName.trim());
      // if (!lastName) return lastNames.push(firstName.trim());
      //
      // lastNames.push(lastName.trim());
    });

    return {
      firstNames: firstNames.join(','),
      lastNames: lastNames.join(','),
    };
  },

  findMatch(string: string, substrings: string) {
    if (!substrings) return false;

    const escapeRegExp = (str: string) => {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    const parts = substrings
      .split(',')
      .flatMap(str => str)
      .map(str => escapeRegExp(str.trim()))
      .filter(str => !!str);

    const regex = new RegExp(`(${parts.join('|')})`, 'gi');

    return string.match(regex);
  },

  removeFirstDuplicatesByKey<T, K extends keyof T>(arr: T[], key: K) {
    const seen = new Set<T[K]>();
    return arr.filter(item => {
      const value = item[key];
      if (seen.has(value)) {
        return false;
      }
      seen.add(value);
      return true;
    });
  },

  findItemAndIndex<T>(items: T[], callback: (item: T) => boolean): [T | null, number | null] {
    return items.reduce(
      (result: [T | null, number | null], item, index) => {
        if (!result[0] && callback(item)) {
          result = [item, index];
        }
        return result;
      },
      [null, null],
    );
  },

  removeTrailingComma(str: string) {
    return str.replace(/,+$/, '');
  },

  escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  },

  markPartOfString(string: string, substrings: string) {
    if (!substrings || !string) return string;

    const escapeHtml = (str: string) => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const parts = substrings
      .split(',')
      .flatMap(str => str.split(' '))
      .map(str => this.escapeRegExp(str.trim()))
      .filter(str => !!str);

    const regex = new RegExp(`(${parts.join('|')})`, 'gi');
    return string.replace(regex, match => `<mark>${escapeHtml(match)}</mark>`);
  },

  isAllArraysInObjEmpty(obj: any) {
    for (const prop in obj) {
      if (Array.isArray(obj[prop]) && obj[prop].length > 0) {
        return false;
      }
    }
    return true;
  },

  sortObjectByName(obj: { [key: string | number]: { name?: string; firstName?: string; lastName?: string } }) {
    const sortedKeys = Object.keys(obj).sort((a, b) => {
      let nameA = '';
      let nameB = '';
      if (obj[a].firstName || obj[b].firstName || obj[a].lastName || obj[b].lastName) {
        const fullNameA = `${obj[a].firstName || ''} ${obj[a].lastName || ''}`;
        const fullNameB = `${obj[b].firstName || ''} ${obj[b].lastName || ''}`;
        nameA = fullNameA.toUpperCase();
        nameB = fullNameB.toUpperCase();
      } else if (obj[a].name || obj[b].name) {
        nameA = obj[a].name?.toUpperCase() || '';
        nameB = obj[b].name?.toUpperCase() || '';
      }

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    const items: string[] = [];
    sortedKeys.forEach(key => {
      items.push(key);
    });

    return items;
  },

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  // TODO: remove this function after all usages will be replaced with stringChecker
  getParsedNum(value: string | number): number {
    return typeof value === 'string' ? parseInt(value) : value;
  },

  getBrowser(): 'Unknown' | 'Chrome' | 'Safari' | 'Edge' | 'Opera' | 'Internet Explorer' | 'Firefox' {
    const userAgent = window.navigator.userAgent;
    if (!userAgent) return 'Unknown';

    if (userAgent.includes('Firefox')) {
      return 'Firefox';
    } else if (userAgent.includes('Chrome')) {
      return 'Chrome';
    } else if (userAgent.includes('Safari')) {
      return 'Safari';
    } else if (userAgent.includes('Edge')) {
      return 'Edge';
    } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
      return 'Opera';
    } else if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) {
      return 'Internet Explorer';
    } else {
      return 'Unknown';
    }
  },

  setCookie(cName: string, cookie: string, path = '/wfm') {
    const expires = new Date();
    expires.setDate(expires.getDate() + 1);
    document.cookie = `${cName}=${encodeURIComponent(cookie)};expires=${expires.toUTCString()};path=${path}`;
  },

  getCookie(name: string) {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
    return null;
  },

  preventDefault(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
  },

  searchValue<T>(input: T, searchedValue: T extends Array<infer U> ? U : T): boolean {
    if (Array.isArray(input)) {
      // If the input is an array, iterate over each element and check for a match
      for (let i = 0; i < input.length; i++) {
        if (input[i] === searchedValue) {
          return true; // Match found
        }
      }
    } else if (typeof input === 'number') {
      // If the input is a single number, check for a direct match
      if (input === searchedValue) {
        return true; // Match found
      }
    }

    return false; // No match found
  },

  findLastIndex<T>(items: T[], cb: (item: T) => boolean): number {
    for (let i = items.length - 1; i >= 0; i--) {
      if (cb(items[i])) {
        return i;
      }
    }
    return -1;
  },

  errorMessage(errorMsg: string, params: any[]): string {
    return params.reduce((acc, p, idx) => acc.replaceAll(`%${idx}`, String(p)), errorMsg);
  },

  to2Digits(time: number) {
    return ('0' + time).slice(-2);
  },

  stringChecker(id: string | number) {
    if (typeof id === 'string') {
      return parseInt(id);
    }
    return id;
  },

  getBooleanFromBitmask(bitmask: number, itemIndex: number): boolean {
    return ((bitmask >> itemIndex) & 1) === 1;
  },

  getBooleansFromBitmask(bitmask: number, size = 8): boolean[] {
    return Array(size)
      .fill(false)
      .map((b, idx) => this.getBooleanFromBitmask(bitmask, idx));
  },

  checkEnvFlag(variable: any | undefined): boolean {
    return variable && String(variable).toLowerCase() == 'true';
  },

  getQueryStringByObject(
    paramsObj: TFindFoldersPayload | TGetCallingListRecordsPayload | { tenantId: number },
    exclude?: string[],
  ): string {
    const clearObj = { ...paramsObj };
    if (exclude && exclude.length > 0) {
      exclude.forEach(el => {
        if (el in clearObj) {
          delete clearObj[el as keyof typeof clearObj];
        }
      });
    }
    const searchParams = new URLSearchParams(clearObj as never as Record<string, string>).toString();
    return searchParams ? `?${searchParams}` : searchParams;
  },

  getObjectPath(rootObj: object | [], key: string, value: string | number): string[] {
    const path: any[] = [];
    function finder(obj: object | [], key: string, value: string | number): boolean {
      // @ts-ignore
      if (obj[key] === value) return true;

      if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
          if (finder(obj[i], key, value)) {
            path.push(`${i}`);
            return true;
          }
        }
      }

      // @ts-ignore
      if (typeof obj === 'object' && obj.items) {
        // for (const i in obj){
        // @ts-ignore
        if (finder(obj.items, key, value)) {
          path.push('items');
          return true;
        }
        // }
      }
      return false;
    }
    finder(rootObj, key, value);
    return path.reverse();
  },
  getObjectPathForCampaigns(rootObj: object | [], key: string, value: string | number | undefined): string[] {
    const path: any[] = [];
    const partPath: any[] = [];
    let some = false;
    function finder(obj: object | [], key: string, value: string | number | undefined): boolean {
      // @ts-ignore
      if (obj[key] === value) {
        // @ts-ignore

        return true;
      }

      if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
          if (finder(obj[i], key, value)) {
            path.push(`${i}`);
            path.push('items');
            path.push(some ? obj[i].items.length - 1 : obj[i].items.length);

            return true;
          } else if (obj[i].items && obj[i].items.length > 0) {
            // Рекурсивный вызов для вложенных items
            path.push(`${i}`);
            path.push('items');
            if (finder(obj[i].items, key, value)) {
              return true;
            }
            // Если элемент не найден в текущем уровне вложенности, убираем добавленные элементы из path
            path.pop();
            path.pop();
          }
        }
      }
      return false;

      // @ts-ignore
      if (obj.items) {
        // @ts-ignore
        for (let i = 0; i < obj.items.length; i++) {
          // @ts-ignore

          // @ts-ignore
          if (obj.items[i]['id'] === value) {
            some = true;
            partPath.push('items');
            // @ts-ignore
            // @ts-ignore
            partPath.push(obj.items[i].items.length);
            console.log('single', partPath);
            return true;
          }
        }
      }
      return false;
    }

    finder(rootObj, key, value);

    const originPath = path.concat(partPath);

    return originPath;
  },

  throttle(cb: any, ms: number) {
    let lastTime = 0;
    return () => {
      const now = Date.now();
      if (now - lastTime >= ms) {
        cb();
        lastTime = now;
      }
    };
  },
  useIdle(ms = 1000 * 60) {
    const [idle, setIdle] = React.useState(false);

    React.useEffect(() => {
      let timeoutId: any;

      const handleTimeout = () => {
        setIdle(true);
      };

      const handleEvent = Utils.throttle(() => {
        setIdle(false);

        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(handleTimeout, ms);
      }, 500);

      const handleVisibilityChange = () => {
        if (!document.hidden) {
          handleEvent();
        }
      };

      timeoutId = window.setTimeout(handleTimeout, ms);

      const events = ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel'];
      events.forEach(name => window.addEventListener(name, handleEvent));
      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        events.forEach(name => window.removeEventListener(name, handleEvent));
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.clearTimeout(timeoutId);
      };
    }, [ms]);

    return idle;
  },
  getToastHeader(url: string): string {
    const posiblePathKeys = Object.keys(allPathsKeys);
    for (const i of posiblePathKeys) {
      const reg1 = new RegExp(`.*${allPathsKeys[i as keyof typeof allPathsKeys]}.*`);
      if (reg1.test(url)) {
        return allPathsWithError[i as keyof typeof allPathsWithError];
      }
    }
    return 'Request Error';
  },
  excludePath(url: string): boolean {
    const posiblePathKeys = Object.keys(excludePath);
    for (const i of posiblePathKeys) {
      const reg1 = new RegExp(`.*${excludePath[i as keyof typeof excludePath]}.*`);
      if (reg1.test(url)) {
        return true;
      }
    }
    return false;
  },
};

export default Utils;
