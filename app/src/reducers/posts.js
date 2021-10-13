export const SET_POST_LIST = 'SET_POST_LIST';
export const SET_POST = 'SET_POST';
export const SET_ERROR = 'SET_ERROR';

const initialState = {
  postList: [],
  posts: {},
  isError: false,
};

export function posts(state = initialState, action) {
  switch (action.type) {
    case SET_POST_LIST: {
      return {
        postList: action.payload.postList,
        posts: action.payload.posts,
        isError: false,
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
      let postList = state.postList;

      if (!postList.includes(post.id)) {
        postList.push(post.id);
      }

      return {
        postList,
        posts: {
          ...state.posts,
          [post.id]: post,
        },
        isError: false,
      };
    }

    default: {
      return state;
    }
  }
}
