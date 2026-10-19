const { connect, StringCodec } = require('nats');

(async () => {
  const nc = await connect({ servers: 'localhost:4222' });
  const sc = StringCodec();

  try {
    const reply = await nc.request(
      'math.add',
      sc.encode(JSON.stringify({ a: 7, b: 35 })),
      { timeout: 2000 }
    );
    console.log('Cevap:', sc.decode(reply.data));
  } catch (err) {
    console.error('Cevap alınamadı (responder çalışıyor mu?):', err.message);
  }

  await nc.drain();
})();
