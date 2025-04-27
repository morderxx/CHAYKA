import { useEffect, useState, useRef } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Нет токена! Пользователь не авторизован.');
      return;
    }

    ws.current = new WebSocket('wss://web-messenger-production.up.railway.app');

    ws.current.onopen = () => {
      console.log('Соединение с сервером открыто');
    };

    ws.current.onmessage = (event) => {
      const message = event.data;
      setMessages((prev) => [...prev, message]);
    };

    ws.current.onclose = () => {
      console.log('Соединение закрыто');
    };

    ws.current.onerror = (error) => {
      console.error('Ошибка WebSocket:', error);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() && ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl h-[80vh] flex flex-col animate-fadeIn">
        <div className="flex-1 overflow-y-auto mb-4">
          {messages.map((msg, idx) => (
            <div key={idx} className="p-2 border-b">
              {msg}
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Введите сообщение..."
            className="input flex-1"
          />
          <button type="submit" className="btn-primary">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}
