import ClearIcon from '@mui/icons-material/Clear';
import { ModalProps } from '../../types';
import { useState } from 'react';

const Modal = (props: ModalProps): JSX.Element => {
  const { modalState, setModalState } = props;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const emailPattern = /\S+@\S+\.\S+/;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // dynamically change the route based on the modalType
      const url =
        modalState.modalType === 'Log in' ? 'http://localhost:3000/user/login' : 'http://localhost:3000/user/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('User data submitted successfully!');
        // close modal
        setModalState({ isOpen: false, modalType: modalState.modalType });
      } else {
        console.error('Failed to submit user data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
          <label>Email Address</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </section>
        <section>
          <label>Password {modalState.modalType === 'Sign up' ? (<span>(Min. 8 characters)</span>) : (<></>)}</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </section>
        <section id="bottom">
          <input
            id="button"
            type="submit"
            value={modalState.modalType === 'Log in' ? 'Log in' : 'Sign up'}
            disabled={!formData.email || !formData.password || formData.password.length < 8 || !emailPattern.test(formData.email)}
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
