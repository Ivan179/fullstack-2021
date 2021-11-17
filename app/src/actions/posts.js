import { schema, normalize } from 'normalizr';
import {
  SET_POST_LIST,
  SET_POST,
  SET_ERROR,
  SET_POST_LIST_MORE,
  SET_COMMENT,
} from '../reducers/posts';
import { ApiClientService } from '../services/ApiClientService';
import { POST_KEY } from '../constants/keys';

const userSchema = new schema.Entity('user');
const commentsSchema = new schema.Entity('comments', { user: userSchema });
const postSchema = new schema.Entity('post', {
  user: userSchema,
  comments: [commentsSchema],
});

function setPosts(data, count, postKey) {
  const { result, entities } = normalize(data, [postSchema]);

  return {
    type: SET_POST_LIST,
    payload: {
      count,
      postList: result,
      posts: entities.post,
      users: entities.user,
      comments: entities.comments,
      postKey,
    },
  };
}

function setPostsMore(data, postKey) {
  const { result, entities } = normalize(data, [postSchema]);

  return {
    type: SET_POST_LIST_MORE,
    payload: {
      postList: result,
      posts: entities.post,
      users: entities.user,
      comments: entities.comments,
      postKey,
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
      const data = await ApiClientService('posts/');
      dispatch(setPosts(data.results, data.count, POST_KEY.main));
    } catch {
      dispatch(setIsError());
    }
  };
}

export function fetchMyPosts() {
  return async (dispatch) => {
    try {
      const data = await ApiClientService('myposts/');
      dispatch(setPosts(data.results, data.count, POST_KEY.my));
    } catch {
      dispatch(setIsError());
    }
  };
}

export function fetchPostsMore() {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const page = state.posts.page;
      const data = await ApiClientService(`posts?page=${page + 1}`);
      dispatch(setPostsMore(data.results, POST_KEY.main));
    } catch {
      dispatch(setIsError());
    }
  };
}

export function fetchMyPostsMore() {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const page = state.posts.page;
      const data = await ApiClientService(`myposts?page=${page + 1}`);
      dispatch(setPostsMore(data.results, POST_KEY.my));
    } catch {
      dispatch(setIsError());
    }
  };
}

export function fetchPost(postId) {
  return async (dispatch) => {
    try {
      const post = await ApiClientService(`posts/${postId}/`);
      document.title = post.title;

      dispatch(setPost(post));
    } catch {
      dispatch(setIsError());
    }
  };
}

export function createComment(text, post) {
  return async (dispatch) => {
    try {
      const comment = await ApiClientService('comments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
          text,
          post,
        }),
      });

      dispatch({
        type: SET_COMMENT,
        payload: comment,
      });
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
