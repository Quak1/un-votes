import styles from "../styles/Modal.module.css";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;
  return (
    <>
      <div className={styles.background} onClick={onClose} />
      <div className={styles.container}>{children}</div>
    </>
  );
};

export default Modal;
