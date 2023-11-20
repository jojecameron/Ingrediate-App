import ClearIcon from '@mui/icons-material/Clear';

interface ModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalState: string;
  setModalState: React.Dispatch<React.SetStateAction<string>>;
}

const Modal = (props: ModalProps): JSX.Element => {
  const { setOpenModal, modalState, setModalState } = props;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (modalState === 'Log in') {
      // Logic for Log in API call
    } else {
      // Logic for Sign up API call
    }
  };

  return (
    <section id="modal">
      <ClearIcon id="clear" onClick={() => setOpenModal(false)}/>
      <h1>{modalState}</h1>
      <form onSubmit={handleSubmit}>
        <section>
          <label>Username</label>
          <input type="text" autoFocus
          />
        </section>
        <section>
          <label>Password</label>
          <input type="password" />
        </section>
        <section id="bottom">
          <input
            id="button"
            type="submit"
            value={modalState === 'Log in' ? 'Log in' : 'Sign up'}
          />
        </section>
      </form>
      {modalState === 'Log in' ? (
            <>
              <p>Need an account?</p>
              <span onClick={() => setModalState('Sign up')}>Sign up</span>
            </>
          ) : (
            <>
              <p>Already have an account?</p>
              <span onClick={() => setModalState('Log in')}>Log in</span>
            </>
          )}
    </section>
  );
};

export default Modal;
