import { useState, useEffect } from "react";
import { json } from "d3-fetch";
import { feature, mesh } from "topojson-client";
// Types
import { Topology } from "topojson-specification";
import { FeatureCollection, MultiLineString } from "geojson";

const jsonUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

interface Data {
  countries: FeatureCollection;
  interiors: MultiLineString;
}

export const useWorldAtlas = () => {
  const [data, setData] = useState<Data>();

  useEffect(() => {
    const fetchMapData = async (jsonUrl: string) => {
      const topology = (await json(jsonUrl)) as Topology;
      const { countries } = topology.objects;

      setData({
        countries: feature(topology, countries) as FeatureCollection,
        // @ts-ignore
        interiors: mesh(topology, countries, (a, b) => a !== b),
      });
    };

    fetchMapData(jsonUrl);
  }, []);

  return data;
};

export default useWorldAtlas;
