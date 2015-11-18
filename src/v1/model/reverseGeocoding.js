import { fetchUrl } from 'fetch';

const url = "http://nominatim.openstreetmap.org/search";

export default (address, done) => {
	address = encodeURIComponent(address);
	
	fetchUrl(`${url}?format=json&q=${address}`, (err, meta, body) => {
		body = JSON.parse(body);		
		if(body.length === 0) {
			done(null, null);
		} else {
			done(Number(body[0].lon), Number(body[0].lat));
		}		
	});
};