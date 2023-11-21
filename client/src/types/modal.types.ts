import { User } from "/Users/johannacameron/Desktop/Codesmith/Ingrediate-App/client/src/types/user.types";

export interface ModalState {
  isOpen: boolean;
  modalType: 'Log in' | 'Sign up';
}

export interface ModalProps {
    modalState: ModalState;
    setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<User>>;
  }

export interface HeaderProps {
  setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
  isLoggedIn: User;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<User>>;
}
