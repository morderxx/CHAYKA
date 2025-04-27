import { useState } from 'react';

export default function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://web-messenger-production.up.railway.app/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        onLoginSuccess();
      } else {
        setError(data.error || 'Ошибка входа');
      }
    } catch (err) {
      console.error(err);
      setError('Ошибка сервера');
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 animate-fadeIn">
      <input
        type="text"
        placeholder="Логин"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input w-full"
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input w-full"
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="btn-primary w-full">
        Войти
      </button>
    </form>
  );
}
