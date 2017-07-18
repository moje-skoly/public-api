import flatten from "flat";
import elasticClient from "../../db/elastic";
import { _index, _type } from "./elasticSchoolIndex";

// maximum count of results
const sizeLimit = 15;

export default (lon, lat, radius, unitType, params) => {
  const body = {
    query: {
      nested: {
        path: "units",
        query: {
          bool: {
            must: {
              term: { "units.unitType": unitType }
            },
            should: Object.keys(params).map(key => {
              const type = Array.isArray(params[key])
                ? "array"
                : typeof params[key];
              //const value = type === "array" ? params[key][0] : params[key];
              const value = params[key];

              return {
                nested: {
                  path: "units.information",
                  filter: {
                    bool: {
                      should: [
                        { term: { item: key } },
                        { term: { [type]: value } }
                      ]
                    }
                  }
                }
              };
            })
          }
        }
      }
    },
    sort: [
      {
        _geo_distance: {
          "metadata.address.location": { lat, lon },
          order: "asc",
          unit: "km"
        }
      }
    ],
    size: sizeLimit
  };

  console.log("\n\n\n");
  console.log(JSON.stringify(body));
  console.log("\n\n\n");

  return elasticClient.search({
    index: _index,
    type: _type,
    body
  });
};
