import { JSDOM } from "jsdom";
import fetch from "node-fetch";
import countryCodes from "./countryCodes.json" assert { type: "json" };

const getResolutionData = async (URL: string) => {
  const document = (await JSDOM.fromURL(URL)).window.document;
  const table = Array.from(
    document.querySelectorAll("#details-collapse .metadata-row")
  );

  const parsedTable: Record<string, any> = {
    link: URL,
  };

  for (const row of table) {
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
      parsedTable.vote = await parseVotes(value!, countryCodes);
    }
  }

  return parsedTable;
};

interface CountryVote {
  country: string;
  vote: string;
  code: string;
}

const parseVotes = async (
  value: Element,
  countryCodes: Record<string, string>
) => {
  const countryRows = value.innerHTML.trim().split("<br>");

  const votes: Record<string, CountryVote> = {};

  for (const row of countryRows) {
    const country = row.trim();
    let countryName = "";
    let vote = "";

    if (country[1] !== " ") {
      countryName = country;
      vote = "Non-Voting";
    } else {
      countryName = country.slice(2);
      vote = country[0];
    }

    let code = countryCodes[countryName];
    if (!code) ({ countryName, code } = await fetchCodeFromAPI(countryName));

    votes[code] = {
      country: countryName,
      vote,
      code,
    };
  }

  return votes;
};

interface APICountry {
  name: {
    common: string;
    official: string;
  };
  ccn3: string;
}

const fetchCodeFromAPI = async (countryName: string) => {
  console.log("No Code:", countryName);

  const parenthesisIndex = countryName.indexOf(" (");
  if (parenthesisIndex !== -1)
    countryName = countryName.slice(0, parenthesisIndex);
  else if (countryName === "CABO VERDE") countryName = "CAPE VERDE";

  const URL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true&fields=name,ccn3`;
  const res = await fetch(URL);
  const data = (await res.json()) as APICountry[];
  if (!Array.isArray(data)) throw new Error("missing country");

  return {
    countryName: data[0].name.common.toUpperCase(),
    code: data[0].ccn3,
  };
};

export const getResolutionByRecordNumber = async (
  recordNumber: string | number
) => {
  const URL = `https://digitallibrary.un.org/record/${recordNumber}`;
  return await getResolutionData(URL);
};

getResolutionByRecordNumber(3967778).then((data) => console.log(data));
