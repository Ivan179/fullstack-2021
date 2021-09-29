import { Link } from 'react-router-dom'

export default function PostItem(props) {
  const { id, title, description, topic } = props 
  
  return (
    <Link to={'/post/' + id}>
      <div className='item'>
        <h4>{title}</h4>
        <p>{description}</p>
        <b>{topic}</b>
      </div>
    </Link>
  );
}
