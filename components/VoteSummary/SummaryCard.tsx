import styles from "../../styles/VoteSummary.module.css";

interface SummaryCardProps {
  title: string;
  value: string | number;
}

const SummaryCard = ({ title, value }: SummaryCardProps) => {
  return (
    <div className={styles[title]}>
      <p className={styles.title}>{title}</p>
      <div className={styles.value}>{value}</div>
    </div>
  );
};

export default SummaryCard;
