const button = document.querySelector('form > button')
const inputs = document.querySelectorAll('input')

const post = {}

button.onclick = (event) => {
  event.preventDefault();
  inputs.forEach((input) => {
    post[input.name] = input.value
  });
  fetch('http://localhost:3000/posts', {
    headers: {
      'Content-Type': "Application/json"
    },
    body: JSON.stringify(post),
    method: 'POST'
  }).then((response) => response.json()).then((data) => window.location.href = `post.html?id=${data.id}`)
}