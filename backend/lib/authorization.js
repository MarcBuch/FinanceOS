const axios = require('axios');

const authServerIP = process.env.AUTHSERVICE_SERVICE_HOST;
const authServerPort = process.env.AUTHSERVICE_SERVICE_PORT;
const authServer = (`${authServerIP}:${authServerPort}`);

module.exports.verifyToken = async (req, res, next) => {
	/**
	 * @desc Middleware to verify a bearer token via the authorization service.
	 */

	if (!req.headers.authorization) {
		return res.status(401).json({ error: { msg: 'Please provide an authorization header' } });
	}

	if (!req.headers.authorization.includes('Bearer')) {
		return res.status(401).json({ error: { msg: 'Token is invalid' } });
	}

	try {
		const isValid = await axios.get(`http://${authServer}/api/auth/verify`, {
			headers: { authorization: req.headers.authorization },
		});

		req.body.userID = isValid.data.userID;

		if (isValid.data.valid === true) {
			return next();
		}

		return res.status(400).json({ error: { msg: 'Token is invalid' } });
	} catch (err) {
		console.log(err);
		return res.status(500);
	}
};
