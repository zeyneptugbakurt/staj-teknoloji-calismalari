const { connect, StringCodec } = require('nats');

(async () => {
  const nc = await connect({ servers: 'localhost:4222' });
  const sc = StringCodec();

  for (let i = 1; i <= 5; i++) {
    const subject = i % 2 ? 'orders.created' : 'orders.cancelled';
    nc.publish(subject, sc.encode(JSON.stringify({ orderId: i })));
    console.log(`Gönderildi -> ${subject} #${i}`);
  }

  await nc.drain(); // bekleyen mesajları gönderip kapanır
})();
