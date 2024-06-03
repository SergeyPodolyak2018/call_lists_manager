import { tableConfigurations } from '../constants/tablesInfo';
import { TableType } from '../constants/tablesTypes';
import { CfgFieldType, SpecialFields } from 'src/api/ts/constants/codes';
import { TCallingListFields } from 'src/api/ts/interfaces/CallingLists.response';
import moment from 'moment';

export const getTableInfoByType = (type: TableType) => {
  return tableConfigurations[type];
};

export const nameModifier = (name: string) => {
  const regex = /^c_/i;
  const clearName = name.replace(regex, '');
  const nsplitedName = clearName.split('_');
  const normalName = nsplitedName
    .map(el => {
      return el[0].toUpperCase() + el.substring(1);
    })
    .join(' ');
  return normalName;
};

export const fieldTransformer = (fieldName: TCallingListFields, value: number | string) => {
  if (fieldName.name in SpecialFields) {
    const dictionary = SpecialFields[fieldName.name as keyof typeof SpecialFields];
    return dictionary[value as keyof typeof dictionary];
  } else if (fieldName.fieldType === CfgFieldType.CFGFTFrom || fieldName.fieldType === CfgFieldType.CFGFTUntil) {
    return secToTimeConverter(value as string);
  } else if (fieldName.fieldType === CfgFieldType.CFGFTScheduledTime) {
    return secToDateTimeConverter(value as string);
  } else {
    return value;
  }
};

export const getOrdinalNum = (n: string) => {
  return n + (+n > 0 ? ['th', 'st', 'nd', 'rd'][(+n > 3 && +n < 21) || +n % 10 > 3 ? 0 : +n % 10] : '');
};
export const generateArray = (
  length: number,
  offset = 0,
  mul = 1,
  str = '',
  valueKey = 'optionKey',
  name = 'optionLabel',
) => {
  return Array.from(
    {
      length,
    },
    (u, value) => ({
      [valueKey]: (value + offset) * mul,
      [name]: `${
        ['Day', 'Week', 'Month'].includes(str)
          ? getOrdinalNum(String(value + offset))
          : ['min', 'sec'].includes(str) && value < +'10'
          ? '0' + String(value + offset)
          : value + offset
      } ${str}`,
    }),
  );
};

export const scheduleFieldTransformer = (fieldName: TCallingListFields, value: number | string, o: any) => {
  // const { t } = useTranslation();
  if (['lastRun', 'createdDate', 'modifiedDate'].includes(fieldName.name)) {
    return new Date(value).toLocaleString();
  } else if (fieldName.name === 'state') {
    return value === 1 ? 'Idle' : 'Disabled';
  } else if (fieldName.name === 'scheduleColumn') {
    const typeMap = { daily: 'labelDay', weekly: 'labelWeek', monthly: 'labelMonth' };
    const weekStr = [
      'labelSunday',
      'labelMonday',
      'labelTuesday',
      'labelWednesday',
      'labelThursday',
      'labelFriday',
      'labelSaturday',
    ];
    const { execute, every, cycle, startTime, dateFrom } = o;
    if (!every && !startTime && !dateFrom) return o;

    let evr = 'Every';
    if (
      every === 1 &&
      (execute === 'daily' ||
        (execute === 'weekly' && cycle.length === +'7') ||
        (execute === 'monthly' && cycle.length === +'32'))
    ) {
      evr += 'day';
    } else {
      if (execute !== 'once') {
        // @ts-ignore
        evr += ` ${getOrdinalNum(String(every))} ${typeMap[execute]}`;
      } else evr = `Once ${moment(dateFrom).format('L')}`;
      if (
        (execute === 'weekly' && cycle && cycle.length === +'7') ||
        (execute === 'monthly' && cycle && cycle.length === +'32')
      )
        evr += ', everyday';
      else {
        if (execute === 'weekly') evr += `, on ${cycle.map((c: any) => weekStr[c]).join(', ')}`;
        if (execute === 'monthly') {
          evr += `, on ${cycle.sort((a: number, b: number) => a - b).join(', ')} date${
            cycle.length > 1 ? 's' : ''
          }`.replace('32', 'last day of the month');
        }
      }
    }
    const start = ` at ${startTime.replace(/\./g, (a: any, b: any) => ([1, 2].includes(b) ? ':' : ' '))}`;
    return `${evr}${start}`;
  } else {
    return value;
  }
};

export const timeToSecConverter = (time: string): number => {
  const seconds = new Date('1970-01-01T' + time + 'Z').getTime() / 1000;
  return seconds;
};
export const isoToTimeStampConverter = (time: string): number => {
  const date = new Date(time);
  const res = date.getTime();
  if (isNaN(res)) return 0;
  return res / 1000;
};

export const secToTimeConverter = (sec: string, hours12?: boolean, date?: boolean): string | undefined => {
  if (sec !== undefined) {
    const numSec: number = +sec;
    if (!isNaN(numSec)) {
      return new Date(numSec * 1000).toLocaleTimeString(hours12 ? 'en-US' : 'en-GB', {
        timeZone: 'Etc/UTC',
        hour12: hours12,
        hour: '2-digit',
        minute: '2-digit',
      });
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};

export const secToDateTimeConverter = (sec: string, hours12?: boolean): string | undefined => {
  if (sec !== undefined) {
    const numSec: number = +sec;
    if (!isNaN(numSec) && numSec !== 0) {
      return new Date(numSec * 1000).toLocaleString(hours12 ? 'en-US' : 'en-GB', {
        timeZone: 'Etc/UTC',
        hour12: hours12,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};

export const secToDateIsoConverter = (sec: string, hours12?: boolean): string | undefined => {
  if (sec !== undefined) {
    const numSec: number = +sec;
    if (!isNaN(numSec) && numSec !== 0) {
      const newDte = new Date(numSec * 1000);
      return (
        newDte.getUTCFullYear() +
        '-' +
        pad(newDte.getUTCMonth() + 1) +
        '-' +
        pad(newDte.getUTCDate()) +
        'T' +
        pad(newDte.getUTCHours()) +
        ':' +
        pad(newDte.getUTCMinutes())
      );
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};

function pad(number: number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}
