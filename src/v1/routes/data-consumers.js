import { Router } from 'express';
import DataConsumer from '../model/DataConsumer';
import * as StatusCode from '../../config/statusCodes';

/**
 * This function defines application routes for handling
 */
export default (app, middleware) => {
	
	// define the prefix for this section
	let router = Router();		
	app.use('/data-consumer', router);
	
	/**
	 * GET /
	 * - fetches the list of all data consumers
	 */
	router.get('/', (req, res) => {
		DataConsumer.find().exec((err, accounts) => {			
			if(err) {
				console.log("DB fetching data consumers failed");
				res.status(StatusCode.INTERNAL_ERROR).json({
					"success": false,
					"msg": `Cannot query the data consumers.`
				});
				return;
			}
			
			res.json({
				"success": true,
				"accounts": accounts
			});
		});
	});
	
	/**
	 * POST /
	 * - add a new data consumer
	 */
	app.post('/',	
		middleware.validateRequestBody({
			name: { type: 'string', required: true },
			email: { type: 'string', format: 'email', required: true }
		}),
		(req, res) => {		
			// the request is now validated.
			
			var account = new DataConsumer({
				name: req.body.name,
				email: req.body.email
			});
			
			account.save((err) => {
				if(err) {
					console.log(`Cannot create new data consumer with name '${account.name}' and email ${account.email}`);
					res.status(StatusCode.FORBIDDEN).json({
						"success": false,
						"msg": "Data consumer account could not be created."
					});
					return;
				}
				
				res.status(StatusCode.CREATED).json({
					"success": true,
					"account": account
				});		 
			});		
		}
	);	
}