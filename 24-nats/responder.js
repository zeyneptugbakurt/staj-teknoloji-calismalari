// Request/Reply: "math.add" isteklerine cevap verir
const { connect, StringCodec } = require('nats');

(async () => {
  const nc = await connect({ servers: 'localhost:4222' });
  const sc = StringCodec();
  const sub = nc.subscribe('math.add');
  console.log('math.add isteklerine cevap veriliyor...');

  for await (const m of sub) {
    const { a, b } = JSON.parse(sc.decode(m.data));
    m.respond(sc.encode(JSON.stringify({ result: a + b })));
  }
})();
