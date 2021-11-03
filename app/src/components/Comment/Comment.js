import React from 'react';

export function Comment(props) {
  const { text, date_creation, user } = props;

  return (
    <div>
      <div>{text}</div>
      <div>{date_creation}</div>
      <div>{user.username}</div>
    </div>
  );
}
