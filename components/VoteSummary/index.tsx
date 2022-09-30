import { IVoteRecord } from "../../models/record";
import { VotingOptions } from "../../types";
import SummaryCard from "./SummaryCard";

import styles from "../../styles/VoteSummary.module.css";

type VoteSummaryProps = Pick<IVoteRecord, "voteSummary"> & {
  onClick: (option: VotingOptions) => void;
};

const VoteSummary = ({ voteSummary, onClick }: VoteSummaryProps) => {
  if (!voteSummary) return null;

  return (
    <div className={styles.container}>
      <SummaryCard
        title="Yes"
        value={voteSummary.Yes}
        onClick={() => onClick("Y")}
      />
      <SummaryCard
        title="No"
        value={voteSummary.No}
        onClick={() => onClick("N")}
      />
      <SummaryCard
        title="Abstentions"
        value={voteSummary.Abstentions}
        onClick={() => onClick("A")}
      />
      <SummaryCard
        title="Non-Voting"
        value={voteSummary["Non-Voting"]}
        onClick={() => onClick("Non-Voting")}
      />
    </div>
  );
};

export default VoteSummary;
