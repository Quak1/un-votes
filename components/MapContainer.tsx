import { useState } from "react";
import { IRecords, IVoteRecord } from "../models/record";
import { VotingOptions } from "../types";
import VoteSummary from "./VoteSummary";
import Map from "./Map";
import VotesModal from "./VotesModal";

import styles from "../styles/Map.module.css";

interface MapContainerProps {
  record: IRecords | IVoteRecord;
  worldAtlas: any;
}

const MapContainer = ({ record, worldAtlas }: MapContainerProps) => {
  const [openModal, setOpenModal] = useState(true);

  const groupedVotes: Record<VotingOptions, string[]> = {
    Y: [],
    N: [],
    A: [],
    "Non-Voting": [],
  };

  if ("vote" in record) {
    for (const vote in record.vote) {
      groupedVotes[record.vote[vote]].push(vote);
    }
  }

  return record.type === "Other" || !record.vote ? null : (
    <div>
      <VoteSummary voteSummary={record.voteSummary} />
      <svg className={styles.map} viewBox="0 0 960 500">
        <Map worldAtlas={worldAtlas} countryVotes={record.vote} />
      </svg>

      {record.type === "General Assembly" ? (
        <Notice message="united nations" />
      ) : record.type === "Security Council" ? (
        <Notice message="security council" />
      ) : null}

      {"vote" in record && (
        <VotesModal
          title="Yes"
          votes={groupedVotes.Y}
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

const Notice = ({ message }: { message: string }) => (
  <div className={styles.notice}>
    <span className={styles.marker} /> regions are not members of the {message}
  </div>
);

export default MapContainer;
