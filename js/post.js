const postNode = document.querySelector('.item')

const id = window.location.search.replace('?id=', '');

fetch(`http://localhost:3000/posts/${id}`).then((response) => response.json()).then(post => {
  const postElement = document.createElement('div');

  document.title = post.title

  postElement.innerHTML = `
    <h4>${post.title}</h4>
    <p>${post.description}</p>
    <b>${post.topic}</b>
  `

  postNode.appendChild(postElement);
})