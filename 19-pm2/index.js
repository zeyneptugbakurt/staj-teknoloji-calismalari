
console.log("PM2 uygulaması başlatıldı!");

setInterval(() => {
  console.log("Uygulama çalışmaya devam ediyor:", new Date().toLocaleTimeString());
}, 5000);
