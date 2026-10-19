# NATS Pub/Sub Demo

NATS'in üç temel mesajlaşma modelini gösteren küçük örnek:

1. **Pub/Sub** + wildcard (`orders.*`)
2. **Request/Reply** (`math.add`)
3. **Queue group** (iş dağıtımı / load balancing)


## Kurulum (macOS, Docker'sız)

```bash
brew install nats-server
npm install
```

## NATS sunucusunu başlatma

Ayrı bir terminal sekmesinde:
```bash
nats-server -js
```
Bu komut terminali meşgul eder ve sunucu açık kalmalıdır. NATS `localhost:4222` üzerinde dinler. `-js` JetStream'i (kalıcı mesajlaşma) açar; bu örneklerde zorunlu değil.

Durdurmak için sekmede `Ctrl+C`.

## 1) Pub/Sub

Sekme A:
```bash
npm run subscriber
```
Sekme B:
```bash
npm run publisher
```
Subscriber `orders.created` ve `orders.cancelled` mesajlarının ikisini de alır.

## 2) Request/Reply

Sekme A:
```bash
npm run responder
```
Sekme B:
```bash
npm run requester
```
Beklenen çıktı: `Cevap: {"result":42}`

## 3) Queue group

İki sekmede:
```bash
WORKER_NAME=A npm run worker
WORKER_NAME=B npm run worker
```
Üçüncü sekmeden birkaç mesaj gönderin (NATS CLI kuruluysa):
```bash
nats pub jobs.process "is-1"
nats pub jobs.process "is-2"
nats pub jobs.process "is-3"
```
Her mesaj yalnızca bir worker'a gider; yük iki worker arasında paylaşılır.
