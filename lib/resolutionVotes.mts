import { JSDOM } from "jsdom";

const getResolutionData = async (URL: string) => {
  const document = (await JSDOM.fromURL(URL)).window.document;
  const table = document.querySelectorAll("#details-collapse .metadata-row");

  const parsedTable: Record<string, any> = {
    link: URL,
  };

  table.forEach((row) => {
    const title = row.querySelector(".title")?.textContent?.trim();
    const value = row.querySelector(".value");

    if (title === "Title") {
      parsedTable.title = value?.textContent;
    } else if (title === "Resolution") {
      const a = value?.querySelector("a");
      parsedTable.resolution = {
        link: a?.href,
        text: a?.textContent,
      };
    } else if (title === "Vote date") {
      parsedTable.voteDate = new Date(value?.textContent!);
    } else if (title === "Note") {
      parsedTable.note = value?.textContent;
    } else if (title === "Vote summary") {
      parsedTable.voteSummary = value?.lastChild?.textContent;
    } else if (title === "Vote") {
      parsedTable.vote = parseVote(value!);
    }
  });

  return parsedTable;
};

interface CountryVote {
  country: string;
  vote: string;
}

const parseVote = (value: Element) => {
  const countryRows = value.innerHTML.trim().split("<br>");
  const votes: CountryVote[] = [];

  countryRows?.forEach((row) => {
    const country = row.trim();
    if (country[1] !== " ")
      return votes.push({
        country: country,
        vote: "Non-Voting",
      });

    return votes.push({
      country: country.slice(2),
      vote: country[0],
    });
  });
  return votes;
};

export const getResolutionByRecordNumber = async (
  recordNumber: string | number
) => {
  const URL = `https://digitallibrary.un.org/record/${recordNumber}`;
  return await getResolutionData(URL);
};

getResolutionByRecordNumber(3967778).then((data) => console.log(data));
