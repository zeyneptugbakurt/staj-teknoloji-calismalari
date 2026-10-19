const { Worker } = require('@temporalio/worker');
const activities = require('./activities');

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue: 'order-queue'
  });
  console.log('Worker çalışıyor (task queue: order-queue)');
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
