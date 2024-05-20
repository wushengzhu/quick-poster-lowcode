import { Application, IBoot } from 'egg';
import { createConnection } from 'mongoose';
// eslint-disable-next-line no-restricted-imports
import assert from 'assert';
// import * as assert from 'assert';
// import { join } from 'path';

export default class AppRoot implements IBoot {
  private readonly app: Application;
  constructor(app: Application) {
    console.log('你执行了吗吗吗');
    this.app = app;
    const { url } = this.app.config.mongoose;
    assert(url, '[egg-mongoose] url is required on config');
    const db = createConnection(url);
    db.on('connected', () => {
      app.logger.info(`[egg-mongoose] ${url} connected successfully`);
    });
  }
  configWillLoad(): void {
    // 此时config文件已经被读取并合并，但是还并未生效
    // 这里是应用层修改配置的最后时机

  }

  configDidLoad(): void {
    // 配置插件加载完成
  }

  // didLoad(): Promise<void> {
  //   // 文件加载完成异步
  // }
  // willReady(): Promise<void> {
  //   // 插件启动完毕异步
  //   const dir = join(this.app.config.baseUrl, 'app/model')
  //   // app/model/user.ts => app.model.User
  //   this.app.loader.loadToApp(dir, 'model', {
  //     caseStyle: 'upper'
  //   })
  // }
  // didReady(): Promise<void> {
  //   // 应用已经启动完毕异步
  // }
  // serverDidReady(): Promise<void> {
  //   // http/https server已启动开始接受外部请求
  // }
}

/**
 * 日志分类
 * appLogger：应用相关日志
 * errorLogger：任何logger.error()调用输出的日志都会重定向到这里
 * coreLogger egg-web.log：框架内核、插件日志
 * agentLogger egg-agent.log agent 进程日志
 */
