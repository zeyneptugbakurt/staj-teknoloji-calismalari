
-- Görev takip projesi
-- PostgreSQL 18

CREATE TABLE IF NOT EXISTS gorevler (
    id SERIAL PRIMARY KEY,
    baslik VARCHAR(100) NOT NULL,
    aciklama TEXT,
    tamamlandi BOOLEAN NOT NULL DEFAULT FALSE,
    olusturma_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO gorevler (baslik, aciklama)
VALUES
    ('PostgreSQL öğren', 'İlk veritabanı projemi tamamla'),
    ('SQL pratiği yap', 'SELECT komutunu öğren');

-- Görevleri listele
SELECT * FROM gorevler;

-- Görevi tamamlandı olarak işaretle
UPDATE gorevler
SET tamamlandi = TRUE
WHERE id = 1;
