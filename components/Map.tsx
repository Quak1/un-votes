import { geoNaturalEarth1, geoPath, geoGraticule } from "d3-geo";
// Types
import { FeatureCollection, MultiLineString } from "geojson";
import { ColorScale, CountryVotes } from "../types/index";

const path = geoPath(geoNaturalEarth1());
const graticule = geoGraticule();

const missingDataColor = "black";

interface MapProps {
  worldAtlas: {
    countries: FeatureCollection;
    interiors: MultiLineString;
  };
  countryVotes: CountryVotes;
  colorScale: ColorScale;
}

const Map = ({
  worldAtlas: { countries, interiors },
  countryVotes,
  colorScale,
}: MapProps) => {
  return (
    <g className="marks">
      <path className="sphere" d={path({ type: "Sphere" }) || undefined} />
      <path className="graticules" d={path(graticule()) || undefined} />

      {countries.features.map((feature) => {
        const countryVote = countryVotes[feature.id!];
        if (!countryVote) console.log("no vote", feature?.properties?.name);
        return (
          <path
            key={feature.properties?.name}
            fill={countryVote ? colorScale[countryVote.vote] : missingDataColor}
            d={path(feature) || undefined}
          />
        );
      })}

      <path className="borders" d={path(interiors) || undefined} />
    </g>
  );
};

export default Map;
