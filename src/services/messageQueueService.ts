type QueueMessage = unknown;

const STORAGE_KEY = "ws_message_queue";

function getQueue(): QueueMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setQueue(queue: QueueMessage[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
}

export const enqueueMessage = (message: QueueMessage) => {
  const queue = getQueue();
  queue.push(message);
  setQueue(queue);
};

export const flushQueue = (socket: WebSocket) => {
  if (socket.readyState !== WebSocket.OPEN) return;

  const queue = getQueue();

  const newQueue: QueueMessage[] = [];

  for (const msg of queue) {
    try {
      socket.send(JSON.stringify(msg));
    } catch {
      newQueue.push(msg);
    }
  }

  setQueue(newQueue);
};

export const getQueueSize = () => getQueue().length;
