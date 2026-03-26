import { enqueueMessage, flushQueue } from "@/src/services/messageQueueService";

let socket: WebSocket | null = null;

let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
let reconnectAttempts = 0;

let isConnecting = false;
let manualClose = false;

const MAX_RECONNECT_ATTEMPTS = 10;

// Подписчик на события сокета
type MessageListener = (event: MessageEvent) => void;

const listeners = new Set<MessageListener>();

export const subscribeToSocket = (listener: MessageListener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

// Получение свежего access токена
const getFreshToken = async (): Promise<string | null> => {
  try {
    const res = await fetch("/api/get-token");

    if (!res.ok) {
      console.log("Token refresh failed");
      return null;
    }

    const { token } = await res.json();
    return token;
  } catch (err) {
    console.log("Token fetch error", err);
    return null;
  }
};

// Отправка данных через сокет с очередью
export const sendThroughSocket = async (data: unknown) => {
  enqueueMessage(data);

  await connectSocket({ force: true });

  // пробуем отправить сразу
  if (socket?.readyState === WebSocket.OPEN) {
    flushQueue(socket);
  }
};

// Настройка слушателей онлайн/офлайн для автоматического реконнекта
let isOnlineListenerAttached = false;

const setupNetworkListeners = () => {
  if (isOnlineListenerAttached) return;

  isOnlineListenerAttached = true;

  window.addEventListener("online", () => {
    console.log("Internet restored → reconnecting WS");
    connectSocket();
  });

  window.addEventListener("offline", () => {
    console.log("Internet lost");
  });
};

// Подключение сокета
export const connectSocket = async ({ force = false } = {}): Promise<WebSocket | null> => {
  setupNetworkListeners();
  if (!force && socket?.readyState === WebSocket.OPEN) return socket;
  if (!force && isConnecting) return socket;

  if (socket && force && socket.readyState !== WebSocket.OPEN) {
    socket.close();
    socket = null;
  }

  isConnecting = true;
  manualClose = false;

  const token = await getFreshToken();
  if (!token) {
    isConnecting = false;
    return null;
  }

  return new Promise(resolve => {
    const ws = new WebSocket(`wss://api.dev.chat.ktsf.ru/ws/chat?authorization=${token}`);
    ws.onopen = () => {
      console.log("WS connected (force)");
      isConnecting = false;
      reconnectAttempts = 0;
      socket = ws;
      flushQueue(ws);
      resolve(ws);
    };
    ws.onclose = () => {
      isConnecting = false;
      socket = null;
      if (!manualClose) scheduleReconnect();
    };
    ws.onerror = () => ws.close();
    ws.onmessage = event => listeners.forEach(l => l(event));
  });
};

// Планирование реконнекта
const scheduleReconnect = () => {
  if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
    console.log("Max reconnect attempts reached");
    return;
  }

  if (reconnectTimeout) return;

  reconnectAttempts++;

  const delay = Math.min(500 * 2 ** reconnectAttempts, 5000);

  console.log(`Reconnecting in ${delay}ms...`);

  reconnectTimeout = setTimeout(async () => {
    reconnectTimeout = null;
    await connectSocket();
  }, delay);
};

// Получить текущий сокет
export const getSocket = () => socket;

//Ручное отключение (logout / unmount)
export const disconnectSocket = () => {
  manualClose = true;

  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = null;
  }

  reconnectAttempts = 0;

  if (socket) {
    socket.close();
    socket = null;
  }
};
