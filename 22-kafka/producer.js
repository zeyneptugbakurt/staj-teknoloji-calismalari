const { Kafka } = require('kafkajs');

const kafka = new Kafka({ clientId: 'uretim-producer', brokers: ['localhost:9092'] });
const producer = kafka.producer();

async function calistir() {
  await producer.connect();
  for (let i = 1; i <= 5; i++) {
    const mesaj = { urunId: i, adet: i * 10, zaman: new Date().toISOString() };
    await producer.send({
      topic: 'uretim-verileri',
      messages: [{ value: JSON.stringify(mesaj) }],
    });
    console.log('Gönderildi:', mesaj);
  }
  await producer.disconnect();
}

calistir();