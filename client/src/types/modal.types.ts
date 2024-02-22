import { User, Favorite } from './index';

export interface ModalState {
  isOpen: boolean;
  modalType: 'Log in' | 'Sign up';
}

export interface ModalProps {
  modalState: ModalState;
  setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<User>>;
  setFavoriteRecipes: React.Dispatch<React.SetStateAction<Favorite[]>>;
}

export interface HeaderProps {
  setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
  isLoggedIn: User;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<User>>;
  saveFavorites: () => void;
  setFavoriteRecipes: React.Dispatch<React.SetStateAction<Favorite[]>>;
}
