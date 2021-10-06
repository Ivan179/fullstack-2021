import React from 'react';
import { PostForm } from '../PostForm';

export function PostUpdateModal(props) {
  const { postId, setPost, post, setModalData } = props;

  const handleUpdate = (newPost) => {
    fetch(`http://localhost:3001/posts/${postId}`, {
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(newPost),
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((updatedPost) => {
        setModalData(null);
        setPost(updatedPost);
      });
  };

  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setModalData(
          <PostForm
            buttonTitle='Сохранить'
            className='post-update'
            onButtonClick={handleUpdate}
            defaultTitle={post.title}
            defaultDescription={post.description}
            defaultTopic={post.topic}
          />
        );
      }}
    >
      Редактировать пост
    </button>
  );
}
