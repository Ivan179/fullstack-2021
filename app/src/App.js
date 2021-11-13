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

export function App() {
  const [isLogin, setIsLogin] = React.useState(
    window.localStorage.getItem('ACCESS')
  );

  return (
    <>
      <Router>
        <Header isLogin={isLogin} setIsLogin={setIsLogin} />
        <Switch>
          <Route path='/info'>
            <InfoPage />
          </Route>
          <Route path='/post_create'>
            {isLogin ? <PostCreate /> : <Redirect to='/login' />}
          </Route>
          <Route path='/post/:postId'>
            <Post />
          </Route>
          <Route path='/my_posts'>
            {isLogin ? <MyPosts /> : <Redirect to='/login' />}
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
            <MainPage isLogin={isLogin} />
          </Route>
        </Switch>
      </Router>
      <Modal />
      <Footer />
    </>
  );
}
