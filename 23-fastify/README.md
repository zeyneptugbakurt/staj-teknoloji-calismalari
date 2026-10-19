# Fastify Todo API

Fastify ile yazılmış küçük bir REST API. Şunları gösterir:

- **Plugin sistemi** (`routes/todos.js` bir plugin, `/todos` prefix'iyle kaydedilir)
- **JSON Schema ile doğrulama** (istek ve yanıt şemaları)
- **Hook'lar** (`onRequest`, `onResponse`, `preHandler`)
- **`app.inject()`** ile sunucu ayağa kaldırmadan test

## Kurulum ve çalıştırma

```bash
npm install
npm start
```

Sunucu `http://localhost:3000` adresinde açılır.

## Endpoint'ler

| Metot | Yol | Açıklama | API key |
|-------|-----|----------|---------|
| GET | `/health` | Sağlık kontrolü | Hayır |
| GET | `/todos` | Tüm todo'lar | Hayır |
| GET | `/todos/:id` | Tek todo | Hayır |
| POST | `/todos` | Yeni todo | Evet |
| PATCH | `/todos/:id/done` | Tamamlandı yap | Evet |
| DELETE | `/todos/:id` | Sil | Evet |

Yazma işlemleri için `x-api-key: secret` header'ı gerekir.

## Deneme

```bash
curl -X POST localhost:3000/todos \
  -H "content-type: application/json" \
  -H "x-api-key: secret" \
  -d '{"title":"Fastify öğren"}'

curl localhost:3000/todos
curl -X PATCH localhost:3000/todos/1/done -H "x-api-key: secret"
```

Geçersiz body (`{"title":""}`) gönderirseniz Fastify otomatik olarak `400` döner.

## Test

```bash
npm test
```
