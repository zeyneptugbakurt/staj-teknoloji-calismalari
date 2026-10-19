// Queue group: aynı gruptaki worker'lar mesajları paylaşır (load balancing).
// Bu dosyayı birden fazla terminalde çalıştırın: WORKER_NAME=A npm run worker
const { connect, StringCodec } = require('nats');

(async () => {
  const name = process.env.WORKER_NAME || 'worker';
  const nc = await connect({ servers: 'localhost:4222' });
  const sc = StringCodec();
  const sub = nc.subscribe('jobs.process', { queue: 'workers' });
  console.log(`${name} hazır`);

  for await (const m of sub) {
    console.log(`${name} işledi: ${sc.decode(m.data)}`);
  }
})();
