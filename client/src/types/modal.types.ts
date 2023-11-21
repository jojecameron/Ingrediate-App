export interface ModalState {
  isOpen: boolean;
  modalType: 'Log in' | 'Sign up';
}

export interface ModalProps {
    modalState: ModalState;
    setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
  }

export interface HeaderProps {
  setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
}
