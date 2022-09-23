import { IRecords, IVoteRecord } from "../models/record";
import VoteSummary from "./VoteSummary";
import Map from "./Map";

interface MapContainerProps {
  record: IRecords | IVoteRecord;
  worldAtlas: any;
  colorScale: any;
}

const MapContainer = ({
  record,
  worldAtlas,
  colorScale,
}: MapContainerProps) => {
  return record.type === "Other" || !record.vote ? (
    <div>Record {record.recordId} has no vote</div>
  ) : (
    <div>
      <VoteSummary voteSummary={record.voteSummary} />
      <div>
        <svg viewBox="0 0 960 500">
          <Map
            worldAtlas={worldAtlas}
            countryVotes={record.vote}
            colorScale={colorScale}
          />
        </svg>
      </div>
    </div>
  );
};

export default MapContainer;
