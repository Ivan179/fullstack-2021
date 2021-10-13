import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../actions/modal';
import './modal.css';

export function Modal() {
  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modal.modalData);

  if (!modalData) {
    return null;
  }

  return (
    <div className='modal_wrapper' onClick={() => dispatch(closeModal())}>
      <div className='modal' onClick={(event) => event.stopPropagation()}>
        {modalData}
      </div>
    </div>
  );
}
