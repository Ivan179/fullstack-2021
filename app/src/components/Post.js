import React from 'react';
import { withRouter } from 'react-router-dom'

function Post(props) {
  React.useEffect(() => {
    const postNode = document.querySelector('.item')

    const id = props.match.params.postId

    fetch(`http://localhost:3001/posts/${id}`).then((response) => response.json()).then(post => {
      const postElement = document.createElement('div');

      document.title = post.title

      postElement.innerHTML = `
        <h4>${post.title}</h4>
        <p>${post.description}</p>
        <b>${post.topic}</b>
      `

      postNode.appendChild(postElement);
    })
  }, [])
  return (
    <div>
      <div className="item"></div>
    </div>
  )
}

export default withRouter(Post)