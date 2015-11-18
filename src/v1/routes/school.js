import { Router } from 'express';
import * as StatusCode from '../../config/statusCodes';
import find from '../model/school';

const getSchool = (req, res) => {
	find(req.params.id)
		.then(schools => {
			const school = schools.docs.pop()._source;
			res.status(StatusCode.OK).json({
				success: true,
				school: school
			});
		})
		.catch(err => {
			res.status(StatusCode.NOT_FOUND).json({
				success: false,
				msg: `Cannot find school with id '${req.params.id}'`
			});
		});
};

const getSchools = (req, res) => {
	find(...req.body.ids)
		.then(schools => {
			const foundSchools = schools.docs.filter(doc => doc.found).map(doc => Object.assign({ "_id": doc._id }, doc._source));
			const notFoundSchools = schools.docs.filter(doc => !doc.found).map(doc => doc._id);
			res.status(StatusCode.OK).json({
				success: true,
				schools: foundSchools, // I am interested in all school
				notFound: notFoundSchools
			});
		})
		.catch(err => {
			res.status(StatusCode.NOT_FOUND).json({
				success: false,
				msg: `Cannot find schools with ids '${req.body.ids.toString()}'`
			});
		});
};

const querySchema = {
	"ids": {
		"required": true,
		"type": "array",
		"items": { "type": "string" },
	}	
};

/**
 * This function defines application routes for handling
 */
export default (app, middleware) => {
	
	// define the prefix for this section
	let router = Router();		
	app.use('/school', router);
	
	router.get('/:id', getSchool);
	router.get('/', middleware.validateRequestBody(querySchema), getSchools)
	router.post('/', middleware.validateRequestBody(querySchema), getSchools); // POST may contain the body of the request => so multiple schools can be requested at once
	
	return router;
}
