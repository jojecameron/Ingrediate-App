import { User, Favorite } from './index';

export interface AccountModal {
  isOpen: boolean;
  modalType: 'Log in' | 'Sign up';
}

export interface RecipeModal {
  isOpen: boolean;
  recipe: {recipeTitle: string, recipeText: string} | null;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface HeaderProps {
  setModalState: React.Dispatch<React.SetStateAction<AccountModal>>;
  isLoggedIn: User;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<User>>;
  saveFavorites: () => void;
  setFavoriteRecipes: React.Dispatch<React.SetStateAction<Favorite[]>>;
}

export interface LoginFormProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<User>>;
  setAccountModal: React.Dispatch<React.SetStateAction<AccountModal>>;
  setFavoriteRecipes: React.Dispatch<React.SetStateAction<Favorite[]>>;
}

export interface SignupFormProps { 
  setIsLoggedIn: React.Dispatch<React.SetStateAction<User>>;
  setAccountModal: React.Dispatch<React.SetStateAction<AccountModal>>;
}
