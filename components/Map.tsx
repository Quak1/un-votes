import { geoNaturalEarth1, geoPath, geoGraticule } from "d3-geo";
// Types
import { FeatureCollection, MultiLineString } from "geojson";
import { IVote } from "../models/record";

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

import styles from "../styles/Map.module.css";

interface MapProps {
  worldAtlas: {
    countries: FeatureCollection;
    interiors: MultiLineString;
  };
  countryVotes: Record<string, IVote>;
}

const Map = ({
  worldAtlas: { countries, interiors },
  countryVotes,
}: MapProps) => {
  return (
    <g className={styles.marks}>
      <path
        className={styles.sphere}
        d={path({ type: "Sphere" }) || undefined}
      />
      <path className={styles.graticules} d={path(graticule()) || undefined} />

      {countries.features.map((feature) => {
        const countryVote = countryVotes[feature.id!];
        // if (!countryVote) console.log("no vote", feature?.properties?.name);
        return (
          <path
            key={feature.properties?.name}
            // fill={countryVote ? colorScale[countryVote] : missingDataColor}
            className={
              countryVote ? styles[countryVote.vote] : styles["noData"]
            }
            d={path(feature) || undefined}
          >
            {/* TODO enable/change tooltip for mobile */}
            <title>
              {feature.properties?.name}
              {countryVote && ` - ${countryVote.vote}`}
            </title>
          </path>
        );
      })}

      <path className={styles.borders} d={path(interiors) || undefined} />
    </g>
  );
};

export default Map;
