import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
// eslint-disable-next-line no-restricted-imports
import { join } from 'path';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1715762127428_1467';

  // add your egg config in here
  config.middleware = [
    'logger',
    'customError',
  ];

  config.logger = {
    consoleLevel: 'DEBUG',
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['http://localhost:8080'],
  };
  config.bcrypt = {
    saltRounds: 10,
  };
  config.session = {
    encrypt: false,
  };
  config.jwt = {
    enable: true,
    secret: process.env.JWT_SECRET || '',
    match: ['/api/users/getUserInfo', '/api/works', '/api/utils/upload-img', '/api/channel'],
  };
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  };

  config.multipart = {
    whitelist: ['.png', '.jpg', '.gif', '.webp'],
    fileSize: '1mb',
  };
  config.static = {
    dir: [
      { prefix: '/public', dir: join(appInfo.baseDir, 'app/public') },
      { prefix: '/uploads', dir: join(appInfo.baseDir, 'uploads') },
    ],
  };
  // config.cors = {
  //   origin: 'http://localhost:8080',
  //   allowMethods: 'GET,HEAD,PUT,OPTIONS,POST,DELETE,PATCH'
  // }
  config.oss = {
    client: {
      accessKeyId: process.env.ALC_ACCESS_KEY || '',
      accessKeySecret: process.env.ALC_SECRET_KEY || '',
      bucket: 'qpl-backend',
      endpoint: 'oss-cn-guangzhou.aliyuncs.com',
    },
  };
  const aliCloudConfig = {
    accessKeyId: process.env.ALC_ACCESS_KEY,
    accessKeySecret: process.env.ALC_SECRET_KEY,
    endpoint: 'dysmsapi.aliyuncs.com',
  };
  // gitee oauth config
  const giteeOauthConfig = {
    cid: process.env.GITEE_CID,
    secret: process.env.GITEE_SECRET,
    redirectURL: 'http://localhost:7001/api/users/passport/gitee/callback',
    authURL: 'https://gitee.com/oauth/token?grant_type=authorization_code',
    giteeUserAPI: 'https://gitee.com/api/v5/user',
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    logger: {
      // 增加中间件配置
      // allowedMethod: ['Get'],
    },
    mongoose: {
      url: 'mongodb://127.0.0.1:27017/qpl',
    },
    baseUrl: 'default.url',
    aliCloudConfig,
    giteeOauthConfig,
    H5BaseURL: 'http://localhost:7001/api/pages',
    jwtExpires: '1h',
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
