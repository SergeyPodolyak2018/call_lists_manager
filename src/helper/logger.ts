import * as log from 'loglevel';
import moment from 'moment';
import pjson from '../../package.json';
import { LogLevelNames, LogLevelNumbers } from 'loglevel';

const LOG_PREFIX = 'customer';

const version = import.meta.env.VITE_BUILD_VERSION || pjson.version;

const logLevelName = process.env.NODE_ENV !== 'production' ? 'debug' : 'info';
log.setLevel(logLevelName);
log.info(`customer version ${version} logging level ${logLevelName}`);
const originalFactory = log.methodFactory;

//@ts-ignore
log.methodFactory = (methodName: LogLevelNames, logLevel: LogLevelNumbers, loggerName: string) => {
  const rawMethod = originalFactory(methodName, logLevel, loggerName);

  return (message: any, attr: any) => {
    const timestamp = moment([]).format('hh:mm:ss');
    const msg = `${timestamp} [${methodName.toUpperCase()}] [${LOG_PREFIX}]: ${message}`;

    if (attr) {
      rawMethod(msg, attr);
    } else {
      rawMethod(msg);
    }
  };
};
//@ts-ignore
log.setMethodFactory = (methodName: LogLevelNames, logLevel: LogLevelNumbers, loggerName: string) => {

};

log.setLevel(log.getLevel());

export default log;
