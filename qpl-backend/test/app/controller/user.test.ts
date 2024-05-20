import { strict as assert } from 'node:assert';
import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/user.test.ts', () => {
  it('should GET /', async () => {
    const res = await app.httpRequest().get('/user').query({ userId: '20170901' });
    assert.equal(res.status, 200);
    assert.equal(res.text, 'hello, 20170901');
  });
});
