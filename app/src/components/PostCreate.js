import React from "react"

export default function PostCreate() {
  React.useEffect(() => {
    const button = document.querySelector('form > button')
    const inputs = document.querySelectorAll('input')

    const post = {}

    button.onclick = (event) => {
      event.preventDefault();
      inputs.forEach((input) => {
        post[input.name] = input.value
      });
      fetch('http://localhost:3001/posts', {
        headers: {
          'Content-Type': "Application/json"
        },
        body: JSON.stringify(post),
        method: 'POST'
      }).then((response) => response.json()).then((data) => window.location.href = `/post/${data.id}`)
    }
  }, [])

  return (
    <div>
      <form class="post-create_form">
        <div><label>Название</label><input name="title" type="text" /></div>
        <div>
          <label>Описание</label><input name="description" type="text" />
        </div>
        <div><label>Тема</label><input name="topic" type="text" /></div>
        <button type="submit">Создать пост</button>
      </form>
    </div>
  )
}