import { parse } from "csv-parse/sync";

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

const getCountryCodes = async (URL = defaultURL) => {
  const res = await fetch(URL);
  const data = await res.text();
  const parsedData = parse(data, {
    columns: true,
    trim: true,
    cast: (value, context) => {
      console.log(context.column);
      if (context.column === "Numeric code") return value.padStart(3, "0");
      return value;
    },
  });
  return parsedData;
};

export const getCountryNumericCodeByName = async () => {
  const codes = await getCountryCodes();
  const numericCodesByName = new Map();

  codes.forEach((country: ParsedCountry) =>
    numericCodesByName.set(country["Country"], country["Numeric code"])
  );

  return numericCodesByName;
};
