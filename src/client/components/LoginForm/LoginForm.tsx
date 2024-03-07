// LoginForm.tsx
import { useState } from 'react';
import { LoginFormProps } from '../../types';

const LoginForm = (props: LoginFormProps) => {

  const { setFavoriteRecipes, setAccountModal, setIsLoggedIn } = props;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const emailPattern = /\S+@\S+\.\S+/;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const url = 'http://localhost:3000/user/login';
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
        if (data.favorites) {
          setFavoriteRecipes((prevFavorites) => [
            ...prevFavorites,
            ...data.favorites,
          ]);
        }
        setAccountModal({ isOpen: false, modalType: 'Log in' });
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
      <h1 id="login-title">Log in</h1>
      <form id="login-form" onSubmit={handleSubmit}>
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
          <label>Password</label>
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
            value="Log in"
            disabled={
              !formData.email ||
              !formData.password ||
              formData.password.length < 8 ||
              !emailPattern.test(formData.email)
            }
          />
        </section>
      </form>
      <p id="need-account">Need an account?</p>
      <span id="signup-link"
        onClick={() => setAccountModal({ isOpen: true, modalType: 'Sign up' })}
      >
        Sign up
      </span>
    </>
  );
};

export default LoginForm;
