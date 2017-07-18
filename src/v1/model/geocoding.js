import { fetchUrl } from "fetch";
import { parseString } from "xml2js";
import { getCachedQuery, addCachedQuery } from "../../db/loki";

const url = "http://api.mapy.cz/geocode";

/**
 * Display address in the form of "<road> <house number>, <city>, <postcode>"
 */
const formatAddress = address => {
  return address.split(",").slice(0, -3).join(",");
};

export default (address, done) => {
  address = encodeURIComponent(address);

  let query = getCachedQuery(address);
  if (query) {
    done(query.x, query.y, query.addresses);
    return;
  }

  const fullUrl = `${url}?query=${address}`;

  // search in the Czech Republic only
  fetchUrl(fullUrl, (err, meta, body) => {
    parseString(body, (err, result) => {
      body = result;
    });

    const items = body.result.point[0].item;

    if (items.length === 0) {
      done(null);
    } else {
      const addresses = items
        .map(item => formatAddress(item.$.title))
        .reduce(
          (acc, address) =>
            (acc.indexOf(address) === -1 && address.length > 0
              ? [...acc, address]
              : acc),
          []
        );

      const foundSpot = items[0].$;

      addCachedQuery(
        address,
        Number(foundSpot.x),
        Number(foundSpot.y),
        addresses
      );

      done(Number(foundSpot.x), Number(foundSpot.y), addresses);
    }
  });
};
