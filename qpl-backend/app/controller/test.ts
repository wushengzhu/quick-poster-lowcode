import { Controller } from 'egg';

export default class TestController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.logger.warn('Warn');// 调试函数有其他info...
    ctx.body = 'hello word';
    ctx.status = 200;
  }
}
