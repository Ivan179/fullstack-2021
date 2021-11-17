import React from 'react';
import { useDispatch } from 'react-redux';
import { setModalData, closeModal } from '../../actions/modal';
import { setPost } from '../../actions/posts';
import { PostForm } from '../PostForm';
import { ApiClientService } from '../../services/ApiClientService';

export function PostUpdateModal(props) {
  const { postId, post } = props;
  const dispatch = useDispatch();

  const handleUpdate = async (newPost) => {
    const updatedPost = await ApiClientService(`posts/${postId}/`, {
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(newPost),
      method: 'PUT',
    });

    dispatch(closeModal());
    dispatch(setPost(updatedPost));
  };

  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(
          setModalData(
            <PostForm
              buttonTitle='Сохранить'
              className='post-update'
              onButtonClick={handleUpdate}
              defaultTitle={post.title}
              defaultDescription={post.description}
              defaultTopic={post.topic}
              defaultImage={post.image}
            />
          )
        );
      }}
    >
      Редактировать пост
    </button>
  );
}
