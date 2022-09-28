import styles from "../styles/RecordPage.module.css";

interface RecordInfoProps {
  title: string;
  voteDate?: Date;
  recordId: string;
}

const RecordInfo = ({ title, voteDate, recordId }: RecordInfoProps) => {
  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.info}>
        {voteDate ? `Voted on ${voteDate}` : "This record has no voting data."}
      </p>
      <p className={styles.info}>
        Get more information on the{" "}
        <a
          className="underline"
          href={`https://digitallibrary.un.org/record/${recordId}`}
          target="_blank"
          rel="noreferrer"
        >
          UN Digital Library
        </a>
      </p>
    </div>
  );
};

export default RecordInfo;
