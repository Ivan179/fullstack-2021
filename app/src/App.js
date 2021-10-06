import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import InfoPage from './components/InfoPage';
import Header from './components/Header';
import Footer from './components/Footer';
import PostCreate from './components/PostCreate';
import Post from './components/Post';
import MyPosts from './components/MyPosts';
import { Modal } from './components/Modal';

export function App() {
  const [modalData, setModalData] = React.useState(null);

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path='/info'>
            <InfoPage />
          </Route>
          <Route path='/post_create'>
            <PostCreate />
          </Route>
          <Route path='/post/:postId'>
            <Post setModalData={setModalData} />
          </Route>
          <Route path='/my_posts'>
            <MyPosts />
          </Route>
          <Route path='/'>
            <MainPage setModalData={setModalData} />
          </Route>
        </Switch>
      </Router>
      <Modal onClose={() => setModalData(null)}>{modalData}</Modal>
      <Footer />
    </>
  );
}
