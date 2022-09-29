import { parse } from "csv-parse/sync";

interface ParsedCountry {
  name: string;
  alpha3: string;
  alpha2: string;
  numeric: string;
}

const defaultURL =
  "https://gist.githubusercontent.com/Quak1/462030af4a06de58181138ba48363afe/raw/country-codes-upper.csv";

const getCountryCodes = async (URL = defaultURL) => {
  const res = await fetch(URL);
  const data = await res.text();
  const parsedData = parse(data, {
    columns: true,
    trim: true,
    cast: (value, context) => {
      if (context.column === "numeric") return value.padStart(3, "0");
      return value;
    },
  });
  return parsedData;
};

export const getCountryNumericCodeByName = async () => {
  const codes = await getCountryCodes();
  const numericCodesByName = new Map();

  codes.forEach((country: ParsedCountry) =>
    numericCodesByName.set(country["name"], country["numeric"])
  );

  return numericCodesByName;
};
