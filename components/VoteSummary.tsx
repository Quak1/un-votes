import { IVoteRecord } from "../models/record";
import SummaryCard from "./SummaryCard";

type VoteSummaryProps = Pick<IVoteRecord, "voteSummary">;

const VoteSummary = ({ voteSummary }: VoteSummaryProps) => {
  if (!voteSummary) return null;

  return (
    <div>
      <SummaryCard title="Yes" value={voteSummary.Yes} />
      <SummaryCard title="No" value={voteSummary.No} />
      <SummaryCard title="Non-voting" value={voteSummary["Non-Voting"]} />
      <SummaryCard title="Abstention" value={voteSummary.Abstentions} />
    </div>
  );
};

export default VoteSummary;
