# Redis ile Önbellekleme

Node.js ve Redis kullanılarak geliştirilen basit bir önbellekleme uygulamasıdır.

## Kullanılan Teknolojiler
- Node.js
- Redis
- JavaScript
- Redis Node.js istemcisi (`redis`)

## Özellikler
- Redis sunucusuna bağlantı kurma
- Veriyi Redis'e kaydetme
- Kaydedilen veriyi okuma
- Veriye 10 saniyelik son kullanma süresi (TTL) tanımlama
- Süresi dolan verinin otomatik silinmesini kontrol etme

## Kurulum

Redis'in kurulu ve çalışır durumda olması gerekir.

```bash
npm install
```

Redis servisini başlatmak için:

```bash
brew services start redis
```

Uygulamayı çalıştırmak için:

```bash
node index.js
```

## Öğrenilenler
Redis'e veri kaydetme (`SET`), veri okuma (`GET`) ve verinin yaşam süresini kontrol etme (`TTL`) işlemleri uygulanmıştır.
