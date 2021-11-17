import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import MainPage from './components/MainPage';
import InfoPage from './components/InfoPage';
import Header from './components/Header';
import Footer from './components/Footer';
import PostCreate from './components/PostCreate';
import Post from './components/Post';
import MyPosts from './components/MyPosts';
import Login from './components/Login';
import Registration from './components/Registration';
import { Modal } from './components/Modal';
import { ApiClientService } from './services/ApiClientService';

export function App() {
  const [user, setUser] = React.useState(null);
  const [isLogin, setIsLogin] = React.useState(
    window.localStorage.getItem('ACCESS')
  );

  const fetchUser = async () => {
    const user = await ApiClientService('user/current');
    setUser(user);
  };

  React.useEffect(() => {
    if (isLogin) {
      void fetchUser();
    }
  }, [isLogin]);

  return (
    <>
      <Router>
        <Header isLogin={isLogin} setIsLogin={setIsLogin} user={user} />
        <Switch>
          <Route path='/info'>
            <InfoPage />
          </Route>
          <Route path='/post_create'>
            {isLogin ? <PostCreate /> : <Redirect to='/login' />}
          </Route>
          <Route path='/post/:postId'>
            <Post isLogin={isLogin} />
          </Route>
          <Route path='/my_posts'>
            {isLogin ? (
              <MyPosts user={user} isLogin={isLogin} />
            ) : (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/login'>
            <Login setIsLogin={setIsLogin} />
          </Route>
          <Route path='/registration'>
            <Registration setIsLogin={setIsLogin} />
          </Route>
          <Route path='/logout'>
            <Redirect to='/' />
          </Route>
          <Route path='/'>
            <MainPage isLogin={isLogin} user={user} />
          </Route>
        </Switch>
      </Router>
      <Modal />
      <Footer />
    </>
  );
}
