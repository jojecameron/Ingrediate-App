import ClearIcon from '@mui/icons-material/Clear';
import { ModalProps } from '../../types';

const Modal = (props: ModalProps): JSX.Element => {
  const { modalState, setModalState } = props;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (modalState.modalType === 'Log in') {
      // Logic for Log in API call
    } else {
      // Logic for Sign up API call
    }
  };

  return (
    <section id="modal">
      <ClearIcon
        id="clear"
        onClick={() =>
          setModalState({ isOpen: false, modalType: modalState.modalType })
        }
      />
      <h1>{modalState.modalType}</h1>
      <form onSubmit={handleSubmit}>
        <section>
          <label>Username</label>
          <input type="text" autoFocus />
        </section>
        <section>
          <label>Password</label>
          <input type="password" />
        </section>
        <section id="bottom">
          <input
            id="button"
            type="submit"
            value={modalState.modalType === 'Log in' ? 'Log in' : 'Sign up'}
          />
        </section>
      </form>
      {modalState.modalType === 'Log in' ? (
        <>
          <p>Need an account?</p>
          <span
            onClick={() =>
              setModalState({ isOpen: true, modalType: 'Sign up' })
            }
          >
            Sign up
          </span>
        </>
      ) : (
        <>
          <p>Already have an account?</p>
          <span
            onClick={() => setModalState({ isOpen: true, modalType: 'Log in' })}
          >
            Log in
          </span>
        </>
      )}
    </section>
  );
};

export default Modal;
