
/**
 * The message, which will be displayed to the user when he does 'GET /' request
 */
export default (app) => {
	app.get('/', (req, res) => {
		res.json({
			"app": "Naše školy",
			"version": "0.1-alfa",
			"website": "https://github.com/nase-skoly/public-api",
			"authors": [
				"Šimon Rozsíval <simon@rozsival.com>"
			]
		});
	});
}
