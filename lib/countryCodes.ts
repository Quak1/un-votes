import fetch from "node-fetch";
import { parse } from "csv-parse/sync";
import fs from "fs";

interface ParsedCountry {
  Country: string;
  "Alpha-2 code": string;
  "Alpha-3 code": string;
  "Numeric code": string;
  "Latitude (average)": string;
  "Longitude (average)": string;
}

const defaultURL =
  "https://gist.githubusercontent.com/tadast/8827699/raw/countries_codes_and_coordinates.csv";

export const getCountryCodes = async (URL = defaultURL) => {
  const res = await fetch(URL);
  const data = await res.text();
  const parsedData = parse(data, {
    columns: true,
    trim: true,
  });

  const countryCodes: Record<string, string> = parsedData.reduce(
    (countries: Record<string, string>, country: ParsedCountry) => {
      const name = country.Country.toUpperCase();
      const code = country["Numeric code"].padStart(3, "0");
      return Object.assign(countries, { [name]: code });
    },
    {}
  );

  return countryCodes;
};

export const generateCountriesJSON = async (URL = defaultURL) => {
  const countryCodes = await getCountryCodes(URL);
  const data = JSON.stringify(countryCodes);
  fs.writeFileSync("./lib/countryCodes.json", data);
  console.log("JSON data is saved.");
};

// generateCountriesJSON();
// getCountryCodes();
