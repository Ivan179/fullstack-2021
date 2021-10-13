import { SET_MODAL_DATA, CLEAN_MODAL_DATA } from '../reducers/modal';

export function setModalData(payload) {
  return {
    type: SET_MODAL_DATA,
    payload,
  };
}

export function closeModal() {
  return {
    type: CLEAN_MODAL_DATA,
  };
}
