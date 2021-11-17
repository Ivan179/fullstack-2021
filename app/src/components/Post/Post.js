import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchPost } from '../../actions/posts';
import { Spinner } from '../Spinner';
import { PostUpdateModal } from '../PostUpdateModal';
import { Comment } from '../Comment';
import { CommentForm } from '../CommentForm';
import './post.css';

function Post(props) {
  const { isLogin } = props;
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
    <div>
      <div className='wrapper'>
        <div className='item'>
          <h4>{post.title}</h4>
          <img src={post.image} />
          <p>{post.description}</p>
          <b>{post.topic}</b>
          <br />
          {isLogin && <PostUpdateModal post={post} postId={postId} />}
        </div>
      </div>
      {isLogin ? (
        <div className='comment_wrapper'>
          {post.comment_set.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
          <CommentForm postId={postId} />
        </div>
      ) : (
        <div className='comment_wrapper'>
          <div>
            <p>Авторизуйтесь, чтобы видеть комментарии к посту</p>
            <Link to='/login'>Авторизоваться</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
