
require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET .env dosyasında tanımlanmalıdır.");
}

app.get("/", (req, res) => {
  res.send("JWT projesi çalışıyor! Giriş için /login endpoint'ini kullan.");
});

// Basit giriş endpoint'i
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== "ogrenci" || password !== "12345") {
    return res.status(401).json({
      message: "Kullanıcı adı veya şifre hatalı.",
    });
  }

  const token = jwt.sign(
    { username },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Giriş başarılı!",
    token,
  });
});

// Token doğrulama middleware'i
function tokenKontrol(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Token bulunamadı.",
    });
  }

  const token = authorization.split(" ")[1];

  try {
    req.kullanici = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({
      message: "Token geçersiz veya süresi dolmuş.",
    });
  }
}

// Token gerektiren endpoint
app.get("/profil", tokenKontrol, (req, res) => {
  res.json({
    message: "Profil bilgilerine erişildi.",
    kullanici: req.kullanici.username,
  });
});

app.listen(3000, () => {
  console.log("Sunucu http://localhost:3000 adresinde çalışıyor.");
});
