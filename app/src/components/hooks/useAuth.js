import { useHistory } from 'react-router-dom';

export function useAuth(setIsLogin, setError) {
  const history = useHistory();

  const onAuth = async (login, password) => {
    const response = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        username: login,
        password,
      }),
    });
    const data = await response.json();

    if (response.method !== 200) {
      setError(data.detail);
    }
    setIsLogin(true);
    window.localStorage.setItem('ACCESS', data.access);
    window.localStorage.setItem('REFRESH', data.refresh);
    history.push('/');
  };

  return { onAuth };
}
