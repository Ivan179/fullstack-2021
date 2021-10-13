const initialState = {
  modalData: null,
};

export const SET_MODAL_DATA = 'SET_MODAL_DATA';
export const CLEAN_MODAL_DATA = 'CLEAN_MODAL_DATA';

export function modal(state = initialState, action) {
  switch (action.type) {
    case SET_MODAL_DATA:
      return {
        modalData: action.payload,
      };
    case CLEAN_MODAL_DATA:
      return {
        modalData: null,
      };
    default: {
      return state;
    }
  }
}
