import { Router } from 'express';
import DataConsumer from '../model/DataConsumer';
import * as StatusCode from '../../config/statusCodes';
import find, { Schema } from '../model/search';
import reverseGeocoding from '../model/reverseGeocoding';
import flatten from 'flat';

const queryParams = (req) => {
	const radius = req.body.radius || req.params.radius || 5; // 5km is the default distance
	const body = req.body || {};
					
	return { radius, params: body };
};

const search = (req, res) => {
	reverseGeocoding(req.params.address, (lon, lat) => {
		if(lon !== null && lat !== null) {
			const { radius, params } = queryParams(req);
			find(lon, lat, radius, params)
				.then(schools => {
					res.json({
						"success": true,
						"radius": `${radius}km`,
						"total": schools.hits.total,
						"max_score": schools.hits.max_score,
						"schools": schools.hits.hits.map(hit => Object.assign({
							"_id": hit._id,
							"_score": hit._score,
						}, hit._source))
					});					
				})
				.catch(err => {
					console.log(err);
					res.status(StatusCode.INTERNAL_ERROR).json({
						success: false,
						msg: 'Internal Server Error'
					});
				});
		} else {		
			res.status(StatusCode.INTERNAL_ERROR).json({
				success: false,
				msg: 'Internal Server Error'
			});
		}
	});
};



/**
 * This function defines application routes for handling
 */
export default (app, middleware) => {
	
	// define the prefix for this section
	let router = Router();		
	app.use('/search', router);
	
	router.get('/:address', middleware.validateRequestBody(Schema), search);
	router.get('/:address/:radius', middleware.validateRequestBody(Schema), search);
	router.post('/:address', middleware.validateRequestBody(Schema), search); // POST may contain the body of the request
	
	return router;
}
