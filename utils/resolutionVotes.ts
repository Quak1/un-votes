import { JSDOM } from "jsdom";
import { getCountryNumericCodeByName } from "./countryCodes";

import { IVote } from "../models/record";
import { isVotingOption } from "../types";

export const getRecordData = async (recordNumber: string | number) => {
  try {
    const URL = `https://digitallibrary.un.org/record/${recordNumber}?ln=en`;
    const document = (await JSDOM.fromURL(URL)).window.document;
    const table = Array.from(
      document.querySelectorAll("#details-collapse .metadata-row")
    );

    const parsedTable: Record<string, any> = {
      recordId: recordNumber,
    };

    for (const row of table) {
      const title = row.querySelector(".title")?.textContent?.trim();
      const value = row.querySelector(".value");

      if (title === "Title") {
        parsedTable.title = value?.textContent;
      } else if (title === "Resolution") {
        const a = value?.querySelector("a");
        parsedTable.resolution = parseResolution(value);
      } else if (title === "Vote date") {
        parsedTable.voteDate = value?.textContent;
      } else if (title === "Note") {
        parsedTable.note = value?.textContent;
      } else if (title === "Vote summary") {
        parsedTable.voteSummary = parseSummary(value);
      } else if (title === "Vote") {
        const countryCodes = await getCountryNumericCodeByName();
        parsedTable.vote = await parseVotes(value, countryCodes);
      }
    }

    if (!parsedTable.title) {
      parsedTable.title = "This Record Doesn't Have A Title";
    }

    return parsedTable;
  } catch (e) {
    console.log("failed getting record", recordNumber);
    if (e instanceof Error) {
      console.log("failed getting record", recordNumber);
    }
  }
};

const parseResolution = (value: Element | null) => {
  if (!value) return;
  const a = value?.querySelector("a");
  if (!a) return { text: value.textContent };
  return {
    link: a?.href,
    text: a?.textContent,
  };
};

const parseSummary = (value: Element | null) => {
  if (!value) return;
  if (value.firstChild?.textContent?.trim() !== "Voting Summary") return;
  const parts = value.lastChild?.textContent?.trim().split(" | ");
  if (!parts) return;

  const parsed: Record<string, number> = {};
  for (const part of parts) {
    const [key, value] = part.split(": ");
    if (!value) parsed[key.slice(0, -1)] = 0;
    else parsed[key] = +value;
  }

  return parsed;
};

interface CountryVote {
  country: string;
  vote: string;
  code: string;
}

const parseVotes = async (
  value: Element | null,
  countryCodes: Map<string, string>
) => {
  if (!value) return;
  const countryRows = value.innerHTML.trim().split("<br>");

  const votes: Record<string, IVote> = {};

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

    let code = countryCodes.get(countryName);
    if (!code) ({ countryName, code } = await fetchCodeFromAPI(countryName));

    if (!isVotingOption(vote)) throw new Error("wrong vote format");

    votes[code] = {
      vote,
      countryName,
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
  countryName = renameCountry(countryName);

  const URL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true&fields=name,ccn3`;
  const res = await fetch(URL);
  const data = (await res.json()) as APICountry[];
  if (!Array.isArray(data)) throw new Error("missing country: " + countryName);

  return {
    countryName: data[0].name.common.toUpperCase(),
    code: data[0].ccn3,
  };
};

// Special cases
const renamedCountries = new Map([
  ["CABO VERDE", "CAPE VERDE"],
  ["TÜRKİYE", "TURKEY"],
]);

const renameCountry = (name: string): string => {
  const parenthesisIndex = name.indexOf(" (");
  if (parenthesisIndex !== -1) return name.slice(0, parenthesisIndex);

  return renamedCountries.get(name) || name;
};
