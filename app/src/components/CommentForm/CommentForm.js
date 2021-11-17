import React from 'react';
import { useDispatch } from 'react-redux';
import { createComment } from '../../actions/posts';

export function CommentForm(props) {
  const { postId } = props;
  const dispatch = useDispatch();
  const [text, setText] = React.useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    dispatch(createComment(text, postId));
    setText('');
  };

  return (
    <div className='comment_wrapper'>
      <form>
        <textarea
          placeholder='Оставьте комментарий'
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button type='submit' onClick={onSubmit}>
          Создать
        </button>
      </form>
    </div>
  );
}
