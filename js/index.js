const container = document.querySelector('.wrapper');

fetch('http://localhost:3000/posts').then((response) => response.json()).then((data) => {
  data.forEach((post) => {
    const postNode = document.createElement('a')
  
    postNode.href = `post.html?id=${post.id}`;
    postNode.innerHTML = `<div class="item">
          <h4>${post.title}</h4>
          <p>${post.description}</p>
          <b>${post.topic}</b>
        </div>`;
  
    container.appendChild(postNode);
  })
});

