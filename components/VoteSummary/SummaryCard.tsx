import styles from "../../styles/VoteSummary.module.css";
import { VotingOptions } from "../../types";

interface SummaryCardProps {
  title: string;
  value: string | number;
  onClick: () => void;
}

const SummaryCard = ({ title, value, onClick }: SummaryCardProps) => {
  return (
    <div className={`${styles[title]} ${styles.card}`} onClick={onClick}>
      <p className={styles.title}>{title}</p>
      <div className={styles.value}>{value}</div>
    </div>
  );
};

export default SummaryCard;
