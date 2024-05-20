// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportGzip from '../../../app/middleware/gzip';
import ExportLogger from '../../../app/middleware/logger';

declare module 'egg' {
  interface IMiddleware {
    gzip: typeof ExportGzip;
    logger: typeof ExportLogger;
  }
}
