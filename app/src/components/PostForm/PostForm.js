import React from 'react';

export function PostForm(props) {
  const {
    onButtonClick,
    buttonTitle,
    className,
    defaultTitle = '',
    defaultDescription = '',
    defaultTopic = '',
  } = props;
  const [title, setTitle] = React.useState(defaultTitle);
  const [description, setDescription] = React.useState(defaultDescription);
  const [topic, setTopic] = React.useState(defaultTopic);

  const handleClick = (event) => {
    const post = {
      title,
      description,
      topic,
    };
    event.preventDefault();
    onButtonClick(post);
  };

  return (
    <div>
      <form className={className}>
        <div>
          <label>Название</label>
          <input
            name='title'
            type='text'
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Описание</label>
          <input
            name='description'
            type='text'
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Тема</label>
          <input
            name='topic'
            type='text'
            value={topic}
            onChange={(event) => {
              setTopic(event.target.value);
            }}
          />
        </div>
        <button type='submit' onClick={handleClick}>
          {buttonTitle}
        </button>
      </form>
    </div>
  );
}
