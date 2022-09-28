import { ParsedUrlQuery } from "querystring";
import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";

import { IRecords, IVoteRecord } from "../../models/record";
import { loadRecordByRecordId } from "../../utils/loadRecord";
import { useWorldAtlas } from "../../hooks/useWorldAtlas";
import MapContainer from "../../components/MapContainer";
import NavBar from "../../components/NavBar";
import RecordInfo from "../../components/RecordInfo";

import styles from "../../styles/RecordPage.module.css";

interface RecordPageProps {
  record: IRecords | IVoteRecord;
}

const RecordPage: NextPage<RecordPageProps> = ({ record }) => {
  const worldAtlas = useWorldAtlas();
  if (!worldAtlas) return <div>Loading...</div>;

  return (
    <div>
      <Head>
        <title>{record.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.pageContainer}>
        <div className={styles.infoContainer}>
          <NavBar id={record.recordId} />
          <RecordInfo
            title={record.title}
            recordId={record.recordId}
            voteDate={"voteDate" in record ? record.voteDate : undefined}
          />
        </div>

        <MapContainer record={record} worldAtlas={worldAtlas} />
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

  if (!record) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      // strips the moongose overhead?
      // otherswise next cant serialize the object
      record: JSON.parse(JSON.stringify(record)),
    },
  };
};
