import flatten from 'flat';
import elasticClient from '../../db/elastic';
import { _index, _type } from './elasticSchoolIndex';

const sizeLimit = 30;

export const Schema = {
	name: { type: "string", required: false },
	email: { type: "string", format: "email", "required": false }
};

export default (lon, lat, radius, params) => {	
	const flattened = flatten(params);					
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
					"bool": {
						"should": Object.keys(flattened).map(key => {
							let match = {};
							match[key] = flattened[key];
							return { match };
						})
					}
				} 
			}
		}
	};
	
	return elasticClient.search({
		index: _index,
		type: _type,
		body		
	});
};