# OPA (Open Policy Agent) Yetkilendirme Demo

Yetkilendirme kurallarını uygulama kodundan çıkarıp **Rego** politikası olarak yazdığımız küçük örnek.

- `policy/authz.rego` — rol tabanlı erişim kuralları
- `policy/authz_test.rego` — politika birim testleri
- `check.js` — OPA'nın REST API'sine soru soran Node istemcisi

## Gereksinimler

- Docker
- Node.js 18+ (yerleşik `fetch` için)
- (Opsiyonel) `opa` CLI — testleri yerelde çalıştırmak için

## Kurallar

| Rol | İzin |
|-----|------|
| admin | Her şey |
| editor | Makale okuma, oluşturma, güncelleme; sadece **kendi** makalesini silme |
| viewer | Sadece makale okuma |

## Çalıştırma

OPA sunucusunu başlatın:
```bash
docker compose up -d
```

Sorguları çalıştırın:
```bash
node check.js
```

Beklenen çıktı:
```
İZİN   | admin siler
İZİN   | viewer okur
RED    | viewer yazar -> viewer sadece okuyabilir
İZİN   | editor kendi makalesini siler
RED    | editor başkasınınkini siler
```

Elle sorgu:
```bash
curl -X POST localhost:8181/v1/data/httpapi/authz/allow \
  -H "content-type: application/json" \
  -d '{"input":{"user":{"name":"veli","role":"viewer"},"method":"GET","path":"/articles/1"}}'
# {"result":true}
```

## Politika testleri

```bash
docker run --rm -v "$(pwd)/policy:/policy" openpolicyagent/opa:latest test /policy -v
```
(veya yerel CLI ile: `opa test ./policy -v`)

## Politikayı canlı değiştirme

`policy/authz.rego` dosyasını düzenleyip OPA'yı yeniden başlatın (`docker compose restart opa`) ve `node check.js` ile sonucu görün. Uygulama kodunuza dokunmanıza gerek yok; OPA'nın asıl faydası budur.

## Öğrenme notları

- Rego **bildirimseldir**: bir kuralın gövdesindeki tüm satırlar doğruysa kural doğrudur. Aynı isimli birden fazla `allow` kuralı **VEYA** mantığıyla birleşir.
- `default allow := false` ile "varsayılan red" güvenli bir başlangıçtır.
- Bu örnekte `rego.v1` söz dizimi kullanıldı (`if`, `in` anahtar kelimeleri).
- Üretimde OPA genellikle sidecar olarak çalışır; politikalar bundle olarak merkezi bir yerden dağıtılır.
