import { HeaderProps } from "../../types";

const Header = (props: HeaderProps): JSX.Element => {
  const { setModalState } = props;

  return (
    <header>
      <div>
        <h1>
          <em>Ingrediate</em>
        </h1>
      </div>
      <div>
        <p onClick={() => setModalState({isOpen: true, modalType: 'Log in'})}>Log in</p>
        <p onClick={() => setModalState({isOpen: true, modalType: 'Sign up'})}>Sign up</p>
      </div>
    </header>
  );
};
export default Header;
