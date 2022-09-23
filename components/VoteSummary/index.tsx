import { IVoteRecord } from "../../models/record";
import SummaryCard from "./SummaryCard";

import styles from "../../styles/VoteSummary.module.css";

type VoteSummaryProps = Pick<IVoteRecord, "voteSummary">;

const VoteSummary = ({ voteSummary }: VoteSummaryProps) => {
  if (!voteSummary) return null;

  return (
    <div className={styles.container}>
      <SummaryCard title="Yes" value={voteSummary.Yes} />
      <SummaryCard title="No" value={voteSummary.No} />
      <SummaryCard title="Non-voting" value={voteSummary["Non-Voting"]} />
      <SummaryCard title="Abstention" value={voteSummary.Abstentions} />
    </div>
  );
};

export default VoteSummary;
