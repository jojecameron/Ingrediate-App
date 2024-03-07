import ClearIcon from '@mui/icons-material/Clear';
import { ModalProps } from '../../types';

const Modal = (props: ModalProps): JSX.Element => {
  const { isOpen, onClose, children } = props;

  if (!isOpen) {
    return <></>;
  }

  return (
    <section id="modal">
      <ClearIcon id="clear" onClick={onClose} />
      {children}
    </section>
  );
};

export default Modal;
