import { Link } from 'react-router-dom';

export default function Header(props) {
  const { isLogin, setIsLogin } = props;
  return (
    <header>
      <div className='menu'>
        <Link to='/'>Главная</Link>
        <Link to='/my_posts'>Мои записи</Link>
        <Link to='/post_create'>Создать пост</Link>
        <Link to='/info'>Полезная информация</Link>
        {isLogin ? (
          <Link
            to='/logout'
            onClick={() => {
              setIsLogin(false);
              window.localStorage.clear();
            }}
          >
            Выйти
          </Link>
        ) : (
          <Link to='/login'>Войти</Link>
        )}
      </div>
    </header>
  );
}
