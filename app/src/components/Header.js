import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div className='menu'>
        <Link to='/'>Главная</Link>
        <Link to='/my_posts'>Мои записи</Link>
        <Link to='/post_create'>Создать пост</Link>
        <Link to='/info'>Полезная информация</Link>
      </div>
    </header>
  );
}
