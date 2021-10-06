import React from 'react';
import PostItem from './PostItem';

export default function MainPage(props) {
  const { setModalData } = props;
  const [postList, setPostNodeList] = React.useState([]);

  React.useEffect(() => {
    const postNodeList = [];

    fetch('http://localhost:3001/posts')
      .then((response) => response.json())
      .then((data) => {
        data.forEach((post) => {
          postNodeList.push(post);
        });
        setPostNodeList(postNodeList);
      })
      .catch((error) => console.log(error));
  }, []);

  function updatePost(newPost) {
    const currentPost = postList.find((postItem) => postItem.id === newPost.id);
    const newPostArray = [...postList];
    newPostArray[postList.indexOf(currentPost)] = newPost;
    setPostNodeList(newPostArray);
  }

  return (
    <div className='wrapper'>
      {postList.map((post) => (
        <PostItem
          key={post.id}
          id={post.id}
          title={post.title}
          description={post.description}
          topic={post.topic}
          updatePost={updatePost}
          setModalData={setModalData}
        />
      ))}
    </div>
  );
}
