const Fastify = require('fastify');
const todoRoutes = require('./routes/todos');

function buildApp(opts = {}) {
  const app = Fastify(opts);

  // Hook: her isteğe süre bilgisi ekler
  app.addHook('onRequest', async (req) => {
    req.startTime = Date.now();
  });
  app.addHook('onResponse', async (req, reply) => {
    req.log.info(`${req.method} ${req.url} -> ${reply.statusCode} (${Date.now() - req.startTime}ms)`);
  });

  app.get('/health', async () => ({ status: 'ok' }));

  // Plugin: /todos prefix'i altında route'lar
  app.register(todoRoutes, { prefix: '/todos' });

  return app;
}

module.exports = buildApp;
