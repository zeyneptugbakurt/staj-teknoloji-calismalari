const test = require('node:test');
const assert = require('node:assert');
const buildApp = require('../app');

test('todo oluştur ve listele', async () => {
  const app = buildApp();

  const created = await app.inject({
    method: 'POST',
    url: '/todos',
    headers: { 'x-api-key': 'secret' },
    payload: { title: 'Fastify öğren' }
  });
  assert.strictEqual(created.statusCode, 201);

  const list = await app.inject({ method: 'GET', url: '/todos' });
  assert.strictEqual(list.json().length, 1);
  await app.close();
});

test('API key olmadan 401 döner', async () => {
  const app = buildApp();
  const res = await app.inject({ method: 'POST', url: '/todos', payload: { title: 'x' } });
  assert.strictEqual(res.statusCode, 401);
  await app.close();
});

test('geçersiz body 400 döner', async () => {
  const app = buildApp();
  const res = await app.inject({
    method: 'POST', url: '/todos',
    headers: { 'x-api-key': 'secret' },
    payload: { title: '' }
  });
  assert.strictEqual(res.statusCode, 400);
  await app.close();
});
