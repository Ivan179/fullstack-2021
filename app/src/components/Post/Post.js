import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPost } from '../../actions/posts';
import { Spinner } from '../Spinner';
import { PostUpdateModal } from '../PostUpdateModal';
import './post.css';

function Post() {
  const dispatch = useDispatch();
  const params = useParams();

  const { postId } = params;
  const post = useSelector((state) => state.posts.posts[postId]);
  const isError = useSelector((state) => state.posts.isError);

  React.useEffect(() => {
    if (post) {
      return;
    }
    dispatch(fetchPost(postId));
  }, []);

  if (isError) {
    return (
      <div>
        <h1>Произошла ошибка при загрузке поста</h1>
      </div>
    );
  }

  if (!post) {
    return <Spinner />;
  }

  return (
    <div className='wrapper'>
      <div className='item'>
        <h4>{post.title}</h4>
        <p>{post.description}</p>
        <b>{post.topic}</b>
        <br />
        <PostUpdateModal post={post} postId={postId} />
      </div>
    </div>
  );
}

export default Post;
