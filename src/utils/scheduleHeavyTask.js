import { isMobileLiteMode } from "../hooks/useMobileLite";

function getMaxConcurrent() {
  return isMobileLiteMode() ? 1 : 2;
}

let maxConcurrent = getMaxConcurrent();
let activeCount = 0;
const queue = [];

function drainQueue() {
  maxConcurrent = getMaxConcurrent();
  while (activeCount < maxConcurrent && queue.length > 0) {
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

    maxConcurrent = getMaxConcurrent();
    if (activeCount < maxConcurrent) {
      run();
    } else {
      queue.push(run);
    }
  });
}

export default scheduleHeavyTask;
