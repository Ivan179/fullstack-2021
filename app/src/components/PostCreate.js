import React from 'react';
import { useHistory } from 'react-router-dom';
import { PostForm } from './PostForm';

export default function PostCreate() {
  const history = useHistory();

  const handleClick = (post) => {
    fetch('http://localhost:3001/posts', {
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(post),
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => history.push(`/post/${data.id}`));
  };

  return (
    <PostForm
      className='post-create_form'
      buttonTitle='Создать пост'
      onButtonClick={handleClick}
    />
  );
}
