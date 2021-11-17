import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PostUpdateModal } from './PostUpdateModal';

export default function PostItem(props) {
  const { id, isLogin, user } = props;
  const post = useSelector((state) => state.posts.posts[id]);
  const { title, description, topic, image, user: author } = post || {};

  console.log(user, author, isLogin);

  return (
    <div>
      <Link to={'/post/' + id}>
        <div className='item'>
          <h4>{title}</h4>
          <img src={image} />
          <p>{description}</p>
          <b>{topic}</b>
          <br />
          {isLogin && user.id === author && (
            <PostUpdateModal postId={id} post={{ title, description, topic }} />
          )}
        </div>
      </Link>
    </div>
  );
}
