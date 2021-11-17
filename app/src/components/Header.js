import { Link } from 'react-router-dom';

export default function Header(props) {
  const { isLogin, setIsLogin, user } = props;
  return (
    <header>
      <div className='menu'>
        <Link to='/'>Главная</Link>
        <Link to='/my_posts'>Мои записи</Link>
        <Link to='/post_create'>Создать пост</Link>
        <Link to='/info'>Полезная информация</Link>
        {isLogin ? (
          <div className='user_button'>
            {user && <p>{user.username}</p>}
            <Link
              to='/logout'
              onClick={() => {
                setIsLogin(false);
                window.localStorage.clear();
              }}
            >
              Выйти
            </Link>
          </div>
        ) : (
          <Link to='/login'>Войти</Link>
        )}
      </div>
    </header>
  );
}
