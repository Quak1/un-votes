import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>UN Votes</title>
        <meta name="description" content="Homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* TODO maybe move margins to global document */}
      {/* TODO style links in global document */}
      <main>
        <h1>UN Votes</h1>
        <h2>Caveats</h2>
        <ul>
          <li>
            <a href="https://research.un.org/en/docs/unvoting/undl">
              Voting data
            </a>{" "}
            is extracted directly from the{" "}
            <a href="https://digitallibrary.un.org">UN Digital Library</a>
          </li>
          <li>
            Only adopted resolutions are available. For more info visit{" "}
            <a href="https://web.archive.org/web/20221008005731/https://ask.un.org/faq/361638">
              here.
            </a>
          </li>
          <li>
            Geographical information is drawn using the{" "}
            <a href="https://github.com/topojson/world-atlas">
              topojson/world-atlas repository
            </a>{" "}
            which provides a redistribution of Natural Earth's vector data.
          </li>
          <li>
            Natural Earth shows de facto boundaries by default according to who
            controls the territory.
          </li>
        </ul>
        <h2>Most recent resolutions</h2>
        {/* TODO get items from DB */}
        <ul>
          <li>
            <Link href="/record/3976352">
              <a>item 1</a>
            </Link>
          </li>
          <li>item 2</li>
          <li>item 3</li>
          <li>item 4</li>
          <li>item 5</li>
        </ul>
      </main>
    </div>
  );
};

export default Home;
