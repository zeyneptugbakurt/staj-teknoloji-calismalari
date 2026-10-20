# Temporal Sipariş Workflow'u

Temporal ile yazılmış küçük bir sipariş akışı:

1. Kart çek (`chargeCard`)
2. Stok ayır (`reserveStock`)
   - Başarısız olursa **telafi**: `refundCard` ile iade (Saga deseni)
3. 5 saniye dayanıklı timer
4. Onay e-postası gönder (`sendEmail`)

## Gereksinimler

- Node.js 20+
- Temporal CLI ([kurulum](https://docs.temporal.io/cli)) — yerel geliştirme sunucusu için

## Kurulum

```bash
npm install
```

## Çalıştırma

Terminal 1 — Temporal dev sunucusu (Web UI ile birlikte):
```bash
temporal server start-dev
```
Web UI: http://localhost:8233

Terminal 2 — Worker:
```bash
npm run worker
```

Terminal 3 — Başarılı sipariş:
```bash
npm start
```

Başarısız (telafili) sipariş:
```bash
npm run start:fail
```
Bu durumda `reserveStock` 3 kez denenir, sonra workflow `refundCard` çalıştırıp hata ile biter.
