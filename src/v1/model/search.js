import flatten from 'flat';
import elasticClient from '../../db/elastic';
import { _index, _type } from './elasticSchoolIndex';

const sizeLimit = 30;

export const Schema = {
	name: { type: "string", required: false },
	email: { type: "string", format: "email", "required": false }
};

export default (lon, lat, radius, unitType, params) => {
	const body = {
		"query": {
			"function_score": {
				"functions": [
					{
						"gauss": {
							"location": {
								"origin": { lat, lon },
								"offset": `${radius}km`,
								"scale": "1km",
								"decay": 0.25
							}
						}
					}
				],
				"query": {
                    "nested": {
                        "path": "units",
                        "query": {
                            "filtered": {
                                "query": {
                                    "bool": {
                                        "must":{
                                            "term": { unitType }
                                        },
                                        "should": Object.keys(params).map(key => {
                							const type = Array.isArray(params[key]) ? "array" : typeof(params[key]);
                                            //const value = type === "array" ? params[key][0] : params[key];
                                            const value = params[key];

                							return {
                                                "nested": {
                                                    "path": "units.information",
                                                    "filter": {
                                                        "bool": {
                                                            "should": [
                                                                { "term": { "item": key } },
                                                                { "term": { [type]: value } }
                                                            ]
                                                        }
                                                    }
                                                }
                                            };
                						})
                                    }
                                }
                            }
                        }
                    }
                }
		    }
		}
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
