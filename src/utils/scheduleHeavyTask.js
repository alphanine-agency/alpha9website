const MAX_CONCURRENT = 2;
let activeCount = 0;
const queue = [];

function drainQueue() {
  while (activeCount < MAX_CONCURRENT && queue.length > 0) {
    const start = queue.shift();
    start();
  }
}

function scheduleHeavyTask(task) {
  return new Promise((resolve, reject) => {
    const run = () => {
      activeCount += 1;

      Promise.resolve()
        .then(task)
        .then(resolve, reject)
        .finally(() => {
          activeCount -= 1;
          drainQueue();
        });
    };

    if (activeCount < MAX_CONCURRENT) {
      run();
    } else {
      queue.push(run);
    }
  });
}

export default scheduleHeavyTask;
