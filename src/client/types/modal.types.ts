import { User, Favorite } from './index';

export interface AccountModal {
  isOpen: boolean;
  modalType: 'Log in' | 'Sign up';
}

export interface RecipeModal {
  isOpen: boolean;
  recipe: {recipeTitle: string, recipeText: string, id: string};
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
  saveFavorites: (isLoggedIn: User, favoriteRecipes: Favorite[]) => void;
  setFavoriteRecipes: React.Dispatch<React.SetStateAction<Favorite[]>>;
  favoriteRecipes: Favorite[];
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
