import { useState, useEffect } from "react";
import { json } from "d3-fetch";
import { feature, mesh } from "topojson-client";
// Types
import { Topology } from "topojson-specification";
import { FeatureCollection, MultiLineString } from "geojson";
import { IRecords, IVoteRecord } from "../models/record";

const JSON_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

interface Data {
  countries: FeatureCollection;
  interiors: MultiLineString;
}

export const useWorldAtlas = (record: IRecords | IVoteRecord) => {
  const [data, setData] = useState<Data | string>();

  useEffect(() => {
    if ("vote" in record) {
      fetchMapData().then((worldAtlas) => {
        setData(worldAtlas);
      });
    } else {
      setData("no map needed");
    }
  }, []);

  return data;
};

export const fetchMapData = async (jsonUrl = JSON_URL) => {
  const topology = (await json(jsonUrl)) as Topology;
  const { countries } = topology.objects;

  return {
    countries: feature(topology, countries) as FeatureCollection,
    // @ts-ignore
    interiors: mesh(topology, countries, (a, b) => a !== b),
  };
};
