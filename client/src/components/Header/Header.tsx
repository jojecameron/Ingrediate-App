import { HeaderProps } from "../../types";

const Header = (props: HeaderProps): JSX.Element => {
  const { setModalState, isLoggedIn, setIsLoggedIn, saveFavorites, setFavoriteRecipes } = props;

  const handleLogOut = async () => {
    try {
      await saveFavorites();
      const response = await fetch('http://localhost:3000/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firebaseUid: isLoggedIn.firebaseUid }),
      });
      if (response.ok) {
        setIsLoggedIn({
          loggedIn: false,
          displayName: '',
          email: '',
          userId: '',
          firebaseUid: '',
        });
        setFavoriteRecipes([]);
      } else {
        console.error('Failed to log out user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <header>
      <div>
        <h1>
          <em>Ingrediate</em>
        </h1>
      </div>
      {!isLoggedIn.loggedIn ? (<div>
        <p onClick={() => setModalState({isOpen: true, modalType: 'Log in'})}>Log in</p>
        <p onClick={() => setModalState({isOpen: true, modalType: 'Sign up'})}>Sign up</p>
      </div>) : (<div>
        <p onClick={() => handleLogOut()}>Log out</p>
      </div>)}
      
    </header>
  );
};
export default Header;
