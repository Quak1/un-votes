import Modal from "./Modal";

interface ModalProps {
  title: string;
  votes: string[];
  open: boolean;
  onClose: () => void;
}

const VotesModal = ({ title, votes, open, onClose }: ModalProps) => (
  <Modal open={open} onClose={onClose}>
    <div>
      <h1>{title}</h1>
      {votes.map((vote) => (
        <div>{vote}</div>
      ))}
    </div>
  </Modal>
);

export default VotesModal;
