import React from 'react';
import PostItem from './PostItem';

export default function MainPage(props) {
  const [postList, setPostNodeList] = React.useState([])
  
  React.useEffect(() => {
    const container = document.querySelector('.wrapper');
    const postNodeList = []

    fetch('http://localhost:3001/posts').then((response) => response.json()).then((data) => {
      data.forEach((post) => {
        const postNode = document.createElement('a')
      
        postNode.href = `/post/${post.id}`;
        postNode.innerHTML = `<div class="item">
              <h4>${post.title}</h4>
              <p>${post.description}</p>
              <b>${post.topic}</b>
            </div>`;
      
        container.appendChild(postNode);
        postNodeList.push(post)
      })
      setPostNodeList(postNodeList)
    });
  }, [])

  return (
    <div className='wrapper'>
      {postList.map((post) => 
        <PostItem 
          id={post.id}
          title={post.title}
          description={post.description}
          topic={post.topic}
        />
      )}
    </div>
  );
}
