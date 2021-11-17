import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyPosts, fetchMyPostsMore } from '../actions/posts';
import PostItem from './PostItem';
import { POST_KEY } from '../constants/keys';

export default function MainPage(props) {
  const { isLogin, user } = props;
  const dispatch = useDispatch();
  const postList = useSelector(
    (state) => state.posts.postList[POST_KEY.my] || []
  );
  const isError = useSelector((state) => state.posts.isError);
  const count = useSelector((state) => state.posts.count);

  React.useEffect(() => {
    dispatch(fetchMyPosts());
  }, []);

  if (isError) {
    return (
      <div className='wrapper'>
        <h1>Произошла ошибка!</h1>
      </div>
    );
  }

  return (
    <div>
      <div className='wrapper'>
        {postList.map((postId) => (
          <PostItem key={postId} id={postId} isLogin={isLogin} user={user} />
        ))}
      </div>
      {postList.length < count && (
        <button
          className='post-list_button'
          onClick={() => dispatch(fetchMyPostsMore())}
        >
          Показать еще
        </button>
      )}
    </div>
  );
}
