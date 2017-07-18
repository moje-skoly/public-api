import loki from "lokijs";

const LOCATIONS = "locations";
const DB_NAME = "locations.db";

let lokidb = null;

const databaseInitialize = () => {
  console.log("initializing!");
  let locations = lokidb.getCollection(LOCATIONS);
  if (locations === null) {
    lokidb.addCollection(LOCATIONS);
  }
};

lokidb = new loki(DB_NAME, {
  autoload: true,
  autoloadCallback: databaseInitialize,
  autosave: true,
  autosaveInterval: 4000
});

export const addCachedQuery = (query, x, y, addresses) => {
  console.log("addCachedQuery: " + query);
  let obj = {
    query,
    x,
    y,
    addresses
  };
  lokidb.getCollection(LOCATIONS).insert(obj);
};

export const getCachedQuery = (query, location) => {
  console.log("getCachedQuery: " + query);
  let result = lokidb.getCollection(LOCATIONS).find({
    query
  });
  if (result.length > 0) {
    console.log("success!");
    return result[0];
  } else {
    console.log("not found!");
    return undefined;
  }
};
