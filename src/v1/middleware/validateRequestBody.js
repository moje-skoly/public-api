import * as StatusCode from '../../config/statusCodes';
import { createSchema } from 'json-gate';

const defaultValidationFailResponse = {
	"success": false,
	"msg": `The body of your request is not valid.`
};

/**
 * This middleware validates the request body against a JSON schema. If the request is OK,
 * then the middleware will pass the request through. If the request is not valid,
 * then a 
 * @param {Object} propertiesDefinition The JSON schema to validate the request against.
 */
export default (propertiesDefinition, failResponse = defaultValidationFailResponse) => {
	return (req, res, next) => {		
		const requestSchema = createSchema({
			type: 'object',
			properties: propertiesDefinition
		});		
		try {
			requestSchema.validate(req.body);
			next();
		} catch (err) {
			res.status(StatusCode.BAD_REQUEST).json(failResponse);
			return;
		} 
	}
}