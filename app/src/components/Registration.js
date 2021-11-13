import React from 'react';
import { useAuth } from './hooks/useAuth';

export default function Registration(props) {
  const { setIsLogin } = props;
  const [login, setLogin] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const { onAuth } = useAuth(setIsLogin, setError);

  React.useEffect(() => {
    if (error) {
      setError('');
    }
  }, [login, password, email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!login) {
      setError('Поле логин не должно быть пустым');

      return;
    }

    if (!password) {
      setError('Поле пароль не должно быть пустым');

      return;
    }

    if (!email) {
      setError('Поле email не должно быть пустым');

      return;
    }

    const response = await fetch('http://localhost:8000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        username: login,
        password,
        email,
      }),
    });
    const data = await response.json();

    if (response.method !== 200) {
      setError(data.detail);
    }

    await onAuth(login, password);
  };

  return (
    <div className='login_form'>
      <form>
        <div>
          <label>Логин</label>
          <input
            type='text'
            value={login}
            onChange={(event) => setLogin(event.target.value)}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></input>
        </div>
        <div>
          <label>Пароль</label>
          <input
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
        </div>
        <div className='login_form__error'>{error}</div>
        <button type='submit' onClick={handleSubmit}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
