import { IRecords, IVoteRecord } from "../models/record";
import VoteSummary from "./VoteSummary";
import Map from "./Map";

import styles from "../styles/Map.module.css";

interface MapContainerProps {
  record: IRecords | IVoteRecord;
  worldAtlas: any;
}

const MapContainer = ({ record, worldAtlas }: MapContainerProps) => {
  return record.type === "Other" || !record.vote ? null : (
    <div>
      <VoteSummary voteSummary={record.voteSummary} />
      <svg className={styles.map} viewBox="0 0 960 500">
        <Map worldAtlas={worldAtlas} countryVotes={record.vote} />
      </svg>
    </div>
  );
};

export default MapContainer;
