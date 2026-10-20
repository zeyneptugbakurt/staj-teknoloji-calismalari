# OPA (Open Policy Agent) Yetkilendirme Demo

Yetkilendirme kurallarını uygulama kodundan çıkarıp Rego politikası olarak yazdığımız küçük örnek.

- `policy/authz.rego` — rol tabanlı erişim kuralları
- `policy/authz_test.rego` — politika birim testleri
- `check.js` — OPA'nın REST API'sine soru soran Node istemcisi

## Kurulum (macOS, Docker'sız)

```bash
brew install opa
opa version
```

## Kurallar

| Rol | İzin |
|-----|------|
| admin | Her şey |
| editor | Makale okuma, oluşturma, güncelleme; sadece kendi makalesini silme |
| viewer | Sadece makale okuma |

## 1) Politika testlerini çalıştırma

`opa-authz` klasöründe:
```bash
opa test ./policy -v
```
5 testin de `PASS` olması beklenir.

## 2) OPA sunucusunu başlatma

Ayrı bir terminal sekmesinde, `opa-authz` klasöründe:
```bash
opa run --server --addr :8181 ./policy
```
Bu komut terminali meşgul eder ve sunucu açık kalmalıdır. Durdurmak için `Ctrl+C`.

## 3) Sorguları çalıştırma

Başka bir sekmede, yine `opa-authz` klasöründe:
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