const { Kafka } = require('kafkajs');

const kafka = new Kafka({ clientId: 'uretim-consumer', brokers: ['localhost:9092'] });
const consumer = kafka.consumer({ groupId: 'uretim-grubu' });

async function calistir() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'uretim-verileri', fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log('Alındı:', JSON.parse(message.value.toString()));
    },
  });
}

calistir();