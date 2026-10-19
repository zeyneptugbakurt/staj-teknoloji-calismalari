// Workflow kodu DETERMINISTIK olmalı: Math.random, Date.now, ağ çağrısı yok.
// Bunlar için activity kullanılır.
const { proxyActivities, sleep } = require('@temporalio/workflow');

const { chargeCard, reserveStock, refundCard, sendEmail } = proxyActivities({
  startToCloseTimeout: '10 seconds',
  retry: { maximumAttempts: 3 }
});

async function orderWorkflow(order) {
  await chargeCard(order);

  try {
    await reserveStock(order);
  } catch (err) {
    // Saga / telafi: stok ayrılamazsa parayı iade et
    await refundCard(order);
    throw err;
  }

  // Dayanıklı timer: worker kapansa bile süre işler
  await sleep('5 seconds');

  await sendEmail(order);
  return `Sipariş ${order.id} tamamlandı`;
}

module.exports = { orderWorkflow };
