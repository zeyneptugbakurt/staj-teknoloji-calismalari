// Wildcard ile "orders.*" altındaki tüm mesajları dinler
const { connect, StringCodec } = require('nats');

(async () => {
  const nc = await connect({ servers: 'localhost:4222' });
  const sc = StringCodec();
  const sub = nc.subscribe('orders.*');
  console.log('orders.* dinleniyor...');

  for await (const m of sub) {
    console.log(`[${m.subject}] ${sc.decode(m.data)}`);
  }
})();
