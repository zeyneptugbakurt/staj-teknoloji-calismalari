// Basit in-memory veri
const todos = new Map();
let nextId = 1;

const todoSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    title: { type: 'string' },
    done: { type: 'boolean' }
  }
};

async function todoRoutes(fastify) {
  // Sadece bu plugin içindeki yazma işlemleri için API key kontrolü
  fastify.addHook('preHandler', async (req, reply) => {
    if (req.method !== 'GET' && req.headers['x-api-key'] !== 'secret') {
      return reply.code(401).send({ error: 'Geçersiz API key' });
    }
  });

  fastify.get('/', {
    schema: { response: { 200: { type: 'array', items: todoSchema } } }
  }, async () => [...todos.values()]);

  fastify.get('/:id', {
    schema: {
      params: { type: 'object', properties: { id: { type: 'integer' } } },
      response: { 200: todoSchema }
    }
  }, async (req, reply) => {
    const todo = todos.get(req.params.id);
    if (!todo) return reply.code(404).send({ error: 'Bulunamadı' });
    return todo;
  });

  fastify.post('/', {
    schema: {
      body: {
        type: 'object',
        required: ['title'],
        properties: { title: { type: 'string', minLength: 1 } },
        additionalProperties: false
      },
      response: { 201: todoSchema }
    }
  }, async (req, reply) => {
    const todo = { id: nextId++, title: req.body.title, done: false };
    todos.set(todo.id, todo);
    return reply.code(201).send(todo);
  });

  fastify.patch('/:id/done', {
    schema: { params: { type: 'object', properties: { id: { type: 'integer' } } } }
  }, async (req, reply) => {
    const todo = todos.get(req.params.id);
    if (!todo) return reply.code(404).send({ error: 'Bulunamadı' });
    todo.done = true;
    return todo;
  });

  fastify.delete('/:id', {
    schema: { params: { type: 'object', properties: { id: { type: 'integer' } } } }
  }, async (req, reply) => {
    if (!todos.delete(req.params.id)) return reply.code(404).send({ error: 'Bulunamadı' });
    return reply.code(204).send();
  });
}

module.exports = todoRoutes;
