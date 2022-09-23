import { ParsedUrlQuery } from "querystring";
import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";

import { IRecords, IVoteRecord } from "../../models/record";
import { loadRecordByRecordId } from "../../utils/loadRecord";
import useWorldAtlas from "../../hooks/useWorldAtlas";
import Map from "../../components/Map";
import MapContainer from "../../components/MapContainer";
import { ColorScale } from "../../types";
import NavBar from "../../components/NavBar";
import RecordInfo from "../../components/RecordInfo";

const colorScale: ColorScale = {
  "Non-Voting": "grey",
  A: "yellow",
  N: "red",
  Y: "green",
};

interface RecordPageProps {
  record: IRecords | IVoteRecord;
}

const RecordPage: NextPage<RecordPageProps> = ({ record }) => {
  // TODO get world atlas in with getStaticProps
  const worldAtlas = useWorldAtlas();
  if (!worldAtlas) return <div>Loading...</div>;

  return (
    <div>
      <Head>
        <title>Record</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* TODO move styles */}
      <main style={{ maxWidth: 960, margin: "0 auto" }}>
        <NavBar id={record.recordId} />
        <RecordInfo
          title={record.title}
          recordId={record.recordId}
          voteDate={record?.voteDate}
        />
        <MapContainer
          record={record}
          worldAtlas={worldAtlas}
          colorScale={colorScale}
        />
        {/* {record.type === "Other" || !record.vote ? (
          <div>Record {record.recordId} has no vote</div>
        ) : (
          <svg viewBox="0 0 960 500">
            <Map
              worldAtlas={worldAtlas}
              countryVotes={record.vote}
              colorScale={colorScale}
            />
          </svg>
        )} */}
      </main>
    </div>
  );
};

export default RecordPage;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<RecordPageProps, Params> = async (
  context
) => {
  const { id } = context.params!;
  const record = await loadRecordByRecordId(id);

  return {
    props: {
      // TODO alternative to hacky way?
      // seems to strip the moongose overhead
      record: JSON.parse(JSON.stringify(record)),
    },
  };
};
