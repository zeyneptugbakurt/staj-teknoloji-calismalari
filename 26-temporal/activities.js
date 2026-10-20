// Activity'ler yan etkili (side-effect) işleri yapar: API çağrısı, DB, e-posta vb.
// Hata alırlarsa Temporal otomatik olarak yeniden dener.

async function chargeCard(order) {
  console.log(`[activity] Kart çekiliyor: ${order.amount} TL (sipariş ${order.id})`);
  return `charge-${order.id}`;
}

async function reserveStock(order) {
  console.log(`[activity] Stok ayrılıyor: ${order.item}`);
  if (order.item === 'out-of-stock') {
    throw new Error('Ürün stokta yok');
  }
}

async function refundCard(order) {
  console.log(`[activity] İADE yapılıyor: ${order.amount} TL (sipariş ${order.id})`);
}

async function sendEmail(order) {
  console.log(`[activity] E-posta gönderildi: sipariş ${order.id} onaylandı`);
}

module.exports = { chargeCard, reserveStock, refundCard, sendEmail };
