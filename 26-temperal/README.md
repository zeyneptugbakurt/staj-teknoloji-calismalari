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

## Denemeniz gereken şeyler

1. `npm start` yaptıktan sonra 5 saniyelik bekleme sırasında worker'ı `Ctrl+C` ile durdurun, sonra tekrar başlatın. Workflow kaldığı yerden devam eder; kart yeniden çekilmez.
2. Web UI'da workflow'un **Event History** sekmesine bakın.
3. `activities.js` içinde `sendEmail`'e rastgele hata ekleyin ve otomatik retry'ı izleyin.

## Dosya yapısı

```
activities.js   # Yan etkili işler (retry edilebilir)
workflows.js    # İş akışı mantığı (deterministik)
worker.js       # Workflow ve activity'leri çalıştıran süreç
client.js       # Workflow'u başlatan istemci
```

## Öğrenme notları

- **Workflow** = orkestrasyon mantığı, deterministik olmak zorunda. Temporal olay geçmişini tekrar oynatarak (replay) durumu yeniden kurar.
- **Activity** = gerçek iş; ağ, DB, e-posta burada yapılır. Timeout ve retry politikası workflow tarafında tanımlanır.
- **Worker** kodu çalıştırır, **Temporal Server** durumu saklar. Worker çökse bile iş kaybolmaz.
- Üretimde idempotent activity yazın: aynı activity retry nedeniyle birden fazla çalışabilir.
