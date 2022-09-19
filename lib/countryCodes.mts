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

  const countryCodes = parsedData.reduce(
    (countries: Record<string, string>, country: ParsedCountry) =>
      Object.assign(countries, {
        [country.Country]: country["Numeric code"].padStart(3, "0"),
      }),
    {}
  );

  return countryCodes;
};

export const generateCountriesJSON = async (URL = defaultURL) => {
  const countryCodes = await getCountryCodes(URL)
    .then((data) => JSON.stringify(data))
    .then((data) => {
      fs.writeFileSync("./lib/countries.json", data);
    })
    .then(() => console.log("JSON data is saved"));
  const data = JSON.stringify(countryCodes);
  fs.writeFile("./lib/countries.json", data, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });
};

// generateCountriesJSON(defaultURL);
