import { useState } from 'react';

export default function RegisterForm({ onRegisterSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('https://web-messenger-production.up.railway.app/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Регистрация успешна!');
        setUsername('');
        setPassword('');
        setTimeout(onRegisterSuccess, 1000); // Переключаемся через секунду
      } else {
        setError(data.error || 'Ошибка регистрации');
      }
    } catch (err) {
      console.error(err);
      setError('Ошибка сервера');
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4 animate-fadeIn">
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
      {success && <p className="text-green-500">{success}</p>}
      <button type="submit" className="btn-primary w-full">
        Зарегистрироваться
      </button>
    </form>
  );
}
