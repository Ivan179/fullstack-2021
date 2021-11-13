import React from 'react';
import { useHistory } from 'react-router-dom';
import { PostForm } from './PostForm';
import { ApiClientService } from '../services/ApiClientService';

export default function PostCreate() {
  const history = useHistory();

  const handleClick = async (post) => {
    // const formData = new FormData();
    // for (let postKey in post) {
    //   formData[postKey] = post[postKey];
    // }

    // console.log(formData);

    const data = await ApiClientService('posts/', {
      headers: {
        'Content-Type': 'Application/JSON',
      },
      method: 'POST',
      body: JSON.stringify(post),
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
