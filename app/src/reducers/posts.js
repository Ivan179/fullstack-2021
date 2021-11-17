export const SET_POST_LIST = 'SET_POST_LIST';
export const SET_POST = 'SET_POST';
export const SET_ERROR = 'SET_ERROR';
export const SET_POST_LIST_MORE = 'SET_POST_LIST_MORE';
export const SET_COMMENT = 'SET_COMMENT';
import { POST_KEY } from '../constants/keys';

const initialState = {
  postList: {},
  posts: {},
  isError: false,
  page: 0,
  count: 0,
};

export function posts(state = initialState, action) {
  switch (action.type) {
    case SET_POST_LIST: {
      return {
        ...state,
        count: action.payload.count,
        postList: {
          ...state.postList,
          [action.payload.postKey]: action.payload.postList,
        },
        posts: action.payload.posts,
        isError: false,
        page: 1,
      };
    }

    case SET_POST_LIST_MORE: {
      return {
        ...state,
        postList: {
          ...state.postList,
          [action.payload.postKey]: [
            ...state.postList[action.payload.postKey],
            ...action.payload.postList,
          ],
        },
        posts: { ...state.posts, ...action.payload.posts },
        isError: false,
        page: state.page + 1,
      };
    }

    case SET_ERROR: {
      return {
        ...state,
        isError: true,
      };
    }

    case SET_POST: {
      const post = action.payload;
      let postList = state.postList[POST_KEY.main] || [];

      if (!postList.includes(post.id)) {
        postList.push(post.id);
      }

      return {
        ...state,
        postList: {
          [POST_KEY.main]: postList,
        },
        posts: {
          ...state.posts,
          [post.id]: post,
        },
        isError: false,
      };
    }

    case SET_COMMENT: {
      if (!action.payload) {
        return state;
      }
      const post = state.posts[action.payload.post];

      return {
        ...state,
        posts: {
          ...state.posts,
          [post.id]: {
            ...state.posts[post.id],
            comment_set: [...state.posts[post.id].comment_set, action.payload],
          },
        },
      };
    }

    default: {
      return state;
    }
  }
}
