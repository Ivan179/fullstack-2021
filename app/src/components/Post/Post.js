import React from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '../Spinner';
import { PostUpdateModal } from '../PostUpdateModal';
import './post.css';

function Post(props) {
  const { setModalData } = props;
  const params = useParams();
  const [post, setPost] = React.useState(null);
  const [isError, setIsError] = React.useState(false);

  const { postId } = params;

  React.useEffect(() => {
    fetch(`http://localhost:3001/posts/${postId}`)
      .then((response) => response.json())
      .then((post) => {
        document.title = post.title;

        setPost(post);
      })
      .catch(() => {
        setIsError(true);
      });
  }, []);

  if (isError) {
    return <div>Произошла ошибка при загрузке поста</div>;
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
        <PostUpdateModal
          post={post}
          setPost={setPost}
          postId={postId}
          setModalData={setModalData}
        />
      </div>
    </div>
  );
}

export default Post;
