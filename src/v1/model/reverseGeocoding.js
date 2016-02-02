import { fetchUrl } from 'fetch';

const url = "http://nominatim.openstreetmap.org/search";

/**
 * Display address in the form of "<road> <house number>, <city>, <postcode>"
 */
const formatAddress = (address) => {
	let addrParts = [];
	if (address.hasOwnProperty('road') && address.road.length > 0) {
		addrParts.push(address.road + (address.hasOwnProperty('house_number') ? ` ${address.house_number}` : ''));
	}
	
	if (address.hasOwnProperty('town')) {
		addrParts.push(address.town);
	}

	if (address.hasOwnProperty('city')) {
		addrParts.push(address.city);
	}
	
	if (address.hasOwnProperty('postcode')) {
		addrParts.push(address.postcode);
	}

	return addrParts.join(', ');
};

export default (address, done) => {
	address = encodeURIComponent(address);
	
	// search in the Czech Republic only
	fetchUrl(`${url}?q=${address}&format=json&countrycodes=cz&accept-language=cs&addressdetails=1`, (err, meta, body) => { 
		body = JSON.parse(body);
		if(body.length === 0) {
			done(null);
		} else {
			const addresses = body.map(loc => formatAddress(loc.address)).reduce((acc, address) => acc.indexOf(address) === -1 && address.length > 0 ? [...acc, address] : acc, []);
			const foundSpot = body.pop();
			done(Number(foundSpot.lon), Number(foundSpot.lat), addresses);
		}		
	});
};