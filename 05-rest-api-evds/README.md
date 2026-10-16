# TCMB Döviz Kurları REST API

Node.js ve Express.js kullanılarak geliştirilen bu proje, Türkiye Cumhuriyet Merkez Bankasının EVDS API'sinden döviz kuru verilerini alır ve JSON formatında sunar.

## Özellikler

- ABD doları (USD), euro (EUR) ve İngiliz sterlini (GBP) kurlarını getirir.
- TCMB EVDS API'si ile iletişim kurar.
- Verileri JSON formatında döndürür.
- Express.js ile bir REST API uç noktası oluşturur.
- API anahtarını `.env` dosyasında tutar.

## Kullanılan Teknolojiler

- Node.js
- Express.js
- REST API
- TCMB EVDS API
- dotenv

## Kurulum

Bağımlılıkları yüklemek için:

```bash
npm install
```

Proje klasöründe `.env` dosyası oluşturun ve kendi EVDS API anahtarınızı ekleyin:

```text
API_KEY=BURAYA_API_ANAHTARINIZI_YAZIN
```

## Çalıştırma

```bash
node index.js
```

## API Kullanımı

Tarayıcıda aşağıdaki adresi açın:

`http://localhost:3000/doviz`

API, başarılı olduğunda tarih ve döviz kurlarını JSON formatında döndürür.
