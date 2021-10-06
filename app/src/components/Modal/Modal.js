import './modal.css';

export function Modal(props) {
  const { onClose, children } = props;

  if (!children) {
    return null;
  }

  return (
    <div className='modal_wrapper' onClick={onClose}>
      <div className='modal' onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
