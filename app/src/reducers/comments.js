import { SET_POST_LIST } from './posts';

const initialState = {
  comments: {},
};

export function comments(state = initialState, action) {
  switch (action.type) {
    case SET_POST_LIST: {
      if (action.payload.comments) {
        return {
          ...state.comments,
          ...action.payload.comments,
        };
      }

      return state;
    }

    default: {
      return state;
    }
  }
}
