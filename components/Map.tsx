import { geoNaturalEarth1, geoPath, geoGraticule } from "d3-geo";
// Types
import { FeatureCollection, MultiLineString } from "geojson";
import { VotingOptions } from "../types/index";

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

import styles from "../styles/Map.module.css";

interface MapProps {
  worldAtlas: {
    countries: FeatureCollection;
    interiors: MultiLineString;
  };
  countryVotes: Record<string, VotingOptions>;
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
            className={countryVote ? styles[countryVote] : styles["noData"]}
            d={path(feature) || undefined}
          />
        );
      })}

      <path className={styles.borders} d={path(interiors) || undefined} />
    </g>
  );
};

export default Map;
