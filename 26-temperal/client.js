const { Client } = require('@temporalio/client');

async function run() {
  const client = new Client(); // varsayılan: localhost:7233

  const item = process.argv[2] || 'laptop';
  const order = { id: Date.now().toString(), item, amount: 1500 };

  const handle = await client.workflow.start('orderWorkflow', {
    taskQueue: 'order-queue',
    workflowId: `order-${order.id}`,
    args: [order]
  });
  console.log(`Workflow başladı: ${handle.workflowId}`);

  try {
    const result = await handle.result();
    console.log('Sonuç:', result);
  } catch (err) {
    console.log('Workflow başarısız:', err.cause?.cause?.message || err.message);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
