import { Link } from 'react-router-dom';
import { PostUpdateModal } from './PostUpdateModal';

export default function PostItem(props) {
  const { id, title, description, topic, updatePost, setModalData } = props;

  return (
    <div>
      <Link to={'/post/' + id}>
        <div className='item'>
          <h4>{title}</h4>
          <p>{description}</p>
          <b>{topic}</b>
          <br />
          <PostUpdateModal
            setModalData={setModalData}
            postId={id}
            post={{ title, description, topic }}
            setPost={updatePost}
          />
        </div>
      </Link>
    </div>
  );
}
