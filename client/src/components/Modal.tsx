import { useState } from 'react';

interface ModalProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    modalState: string;
}

const Modal = (props: ModalProps): JSX.Element => {

  const {setOpenModal, modalState} = props;

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
      <h2>{modalState}</h2>
      <form onSubmit={handleSubmit}>
        <section>
          <label>Username</label>
          <input type="text" />
        </section>
        <section>
          <label>Password</label>
          <input type="password" />
        </section>
        <section id="buttons">
          <input
            id="button"
            type="submit"
            value={modalState === 'Log in' ? 'Log in' : 'Sign up'}
          />
        </section>
      </form>
    </section>
  );
};

export default Modal;
