interface HeaderProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalState: React.Dispatch<React.SetStateAction<string>>;
}

const Header = (props: HeaderProps): JSX.Element => {
  const { setOpenModal, setModalState } = props;

  const handleLogin = () => {
    setModalState('Log in');
    setOpenModal(true);
  };

  const handleSignup = () => {
    setModalState('Sign up');
    setOpenModal(true);
  };

  return (
    <header>
      <div>
        <h1>
          <em>Ingrediate</em>
        </h1>
      </div>
      <div>
        <p onClick={handleLogin}>Log in</p>
        <p onClick={handleSignup}>Sign up</p>
      </div>
    </header>
  );
};
export default Header;
