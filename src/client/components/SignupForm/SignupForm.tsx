// SignupForm.tsx
import { useState } from 'react';
import { SignupFormProps } from '../../types';

const SignupForm = (props: SignupFormProps) => {
  const { setIsLoggedIn, setAccountModal } = props;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const emailPattern = /\S+@\S+\.\S+/;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const url = 'http://localhost:3000/user/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        // store user data in state
        setIsLoggedIn((prevUserData) => ({
          ...prevUserData,
          loggedIn: true,
          displayName: data.displayName,
          email: data.email,
          firebaseUid: data.firebaseUid,
          userId: data.userId,
        }));
        setAccountModal({ isOpen: false, modalType: 'Sign up' });
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
    <>
      <h1 id="signup-title">Sign up</h1>
      <form id="signup-form" onSubmit={handleSubmit}>
        <section className="form-field">
          <label>Email Address</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </section>
        <section className="form-field">
          <label>
            Password {' '}<span>(Min. 8 characters)</span>
          </label>
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
            value="Sign up"
            disabled={
              !formData.email ||
              !formData.password ||
              formData.password.length < 8 ||
              !emailPattern.test(formData.email)
            }
          />
        </section>
      </form>
      <p id="have-account">Already have an account?</p>
      <span id="login-link"
        onClick={() => setAccountModal({ isOpen: true, modalType: 'Log in' })}
      >
        Log in
      </span>
    </>
  );
};

export default SignupForm;
