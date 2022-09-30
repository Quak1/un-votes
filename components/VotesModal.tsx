import Modal from "./Modal";
import styles from "../styles/VotesModal.module.css";

interface ModalProps {
  title: string;
  votes: string[];
  open: boolean;
  onClose: () => void;
}

const VotesModal = ({ title, votes, open, onClose }: ModalProps) => (
  <Modal open={open} onClose={onClose}>
    <h1>{title}</h1>
    <div className={styles.body}>
      {votes.map((vote) => (
        <div>{vote}</div>
      ))}
    </div>
  </Modal>
);

export default VotesModal;
