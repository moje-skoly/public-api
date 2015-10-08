
export default function(app) {
	
	let protection = setupAccessProtection(); 
	initRoutes(app, protection);		
	
}

function setupAccessProtection() {
	return (req, res, next) => next();
}

/**
 * Init the routes of the API
 */
function initRoutes(app, protection) {
	initWelcomeRoute(app, protection);
}

/**
 * The message, which will be displayed to the user when he does 'GET /' request
 */
function initWelcomeRoute(app, protection) {
	app.get('/',
		protection,
		(req, res) => {
			res.json({
				"app": "Naše školy",
				"version": "0.1-alfa",
				"website": "https://github.com/nase-skoly/public-api",
				"authors": [
					"Šimon Rozsíval <simon@rozsival.com>"
				]
			});
		}
	);
}