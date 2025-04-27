import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Chat from './Chat';

export default function App() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <>
        <div className="absolute top-4 right-4">
          <button onClick={handleLogout} className="btn-primary">
            Выйти
          </button>
        </div>
        <Chat />
      </>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md animate-fadeIn">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLoginView ? 'Вход' : 'Регистрация'}
        </h1>

        {isLoginView ? (
          <LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />
        ) : (
          <RegisterForm onRegisterSuccess={() => setIsLoginView(true)} />
        )}

        <div className="mt-4 text-center">
          {isLoginView ? (
            <p>
              Нет аккаунта?{' '}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setIsLoginView(false)}
              >
                Зарегистрироваться
              </button>
            </p>
          ) : (
            <p>
              Уже есть аккаунт?{' '}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setIsLoginView(true)}
              >
                Войти
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
