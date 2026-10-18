# BullMQ İş Kuyruğu

## Projenin Amacı
BullMQ kullanarak Node.js üzerinde arka plan görevlerini bir iş kuyruğuna eklemek ve çalıştırmak.

## Kullanılan Teknolojiler
- Node.js
- BullMQ
- Redis
- ioredis

## Çalışma Mantığı
1. Redis bağlantısı kurulur.
2. Üç görev iş kuyruğuna eklenir.
3. Worker, görevleri sırayla işler.
4. Her görevin tamamlanması simüle etmek amacıyla 2 saniye beklenir.
5. Görevlerin işlenme ve tamamlanma bilgileri terminale yazdırılır.

## Çalıştırma
Öncelikle Redis servisinin çalıştığından emin olun:

```bash
redis-cli ping
```

`PONG` yanıtı alındıktan sonra:

```bash
npm install
node index.js
```