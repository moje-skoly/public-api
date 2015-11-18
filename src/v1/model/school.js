import elasticClient from '../../db/elastic';
import { _index, _type } from './elasticSchoolIndex';

const sizeLimit = 30;

export default (...ids) => {
	const cfg = {
		index: _index,
		type: _type,
		body: { ids } 
	};
	
	return elasticClient.mget(cfg);	
}