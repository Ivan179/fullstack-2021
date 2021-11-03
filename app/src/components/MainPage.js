import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchPostsMore } from '../actions/posts';
import PostItem from './PostItem';

export default function MainPage() {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.posts.postList);
  const isError = useSelector((state) => state.posts.isError);
  const count = useSelector((state) => state.posts.count);

  React.useEffect(() => {
    dispatch(fetchPosts());
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
          <PostItem key={postId} id={postId} />
        ))}
      </div>
      {postList.length < count && (
        <button
          className='post-list_button'
          onClick={() => dispatch(fetchPostsMore())}
        >
          Показать еще
        </button>
      )}
    </div>
  );
}
