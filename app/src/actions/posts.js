import { schema, normalize } from 'normalizr';
import { SET_POST_LIST, SET_POST, SET_ERROR } from '../reducers/posts';

const userSchema = new schema.Entity('user');
const commentsSchema = new schema.Entity('comments', { user: userSchema });
const postSchema = new schema.Entity('post', {
  user: userSchema,
  comments: [commentsSchema],
});

function setPosts(data) {
  const { result, entities } = normalize(data, [postSchema]);

  return {
    type: SET_POST_LIST,
    payload: {
      postList: result,
      posts: entities.post,
      users: entities.user,
      comments: entities.comments,
    },
  };
}

function setIsError() {
  return {
    type: SET_ERROR,
  };
}

export function fetchPosts() {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3001/posts');
      const data = await response.json();
      dispatch(setPosts(data));
    } catch {
      dispatch(setIsError());
    }
  };
}

export function fetchPost(postId) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}`);
      const post = await response.json();
      document.title = post.title;

      dispatch(setPost(post));
    } catch {
      dispatch(setIsError());
    }
  };
}

export function setPost(payload) {
  return {
    type: SET_POST,
    payload,
  };
}
