import React from 'react';
import { useHistory } from 'react-router-dom';
import { PostForm } from './PostForm';
import { ApiClientService } from '../services/ApiClientService';

export default function PostCreate() {
  const history = useHistory();

  const handleClick = async (post) => {
    const formData = new FormData();
    for (let postKey in post) {
      formData.append(postKey, post[postKey]);
    }

    const data = await ApiClientService('posts/', {
      method: 'POST',
      body: formData,
    });

    history.push(`/post/${data.id}`);
  };

  return (
    <PostForm
      className='post-create_form'
      buttonTitle='Создать пост'
      onButtonClick={handleClick}
    />
  );
}
