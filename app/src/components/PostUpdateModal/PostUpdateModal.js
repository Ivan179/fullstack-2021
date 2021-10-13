import React from 'react';
import { useDispatch } from 'react-redux';
import { setModalData, closeModal } from '../../actions/modal';
import { setPost } from '../../actions/posts';
import { PostForm } from '../PostForm';

export function PostUpdateModal(props) {
  const { postId, post } = props;
  const dispatch = useDispatch();

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
        dispatch(closeModal());
        dispatch(setPost(updatedPost));
      });
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
            />
          )
        );
      }}
    >
      Редактировать пост
    </button>
  );
}
