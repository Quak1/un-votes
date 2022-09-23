interface RecordInfoProps {
  title: string;
  voteDate?: string;
  recordId: string;
}

const RecordInfo = ({ title, voteDate, recordId }: RecordInfoProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>
        {voteDate
          ? // TODO dont convert date to Date on parse
            `Voted on ${new Date(voteDate)}`
          : "This record has no voting data."}
      </p>
      <p>
        See more info on the{" "}
        <a
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
