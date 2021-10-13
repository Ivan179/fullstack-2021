import { SET_POST_LIST } from './posts';

const initialState = {
  users: {},
};

export function user(state = initialState, action) {
  switch (action.type) {
    case SET_POST_LIST: {
      if (action.payload.users) {
        return {
          ...state.users,
          ...action.payload.users,
        };
      }

      return state;
    }

    default: {
      return state;
    }
  }
}
