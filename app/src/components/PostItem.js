import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PostUpdateModal } from './PostUpdateModal';

export default function PostItem(props) {
  const { id } = props;
  const post = useSelector((state) => state.posts.posts[id]);
  const { title, description, topic } = post || {};

  return (
    <div>
      <Link to={'/post/' + id}>
        <div className='item'>
          <h4>{title}</h4>
          <p>{description}</p>
          <b>{topic}</b>
          <br />
          <PostUpdateModal postId={id} post={{ title, description, topic }} />
        </div>
      </Link>
    </div>
  );
}
