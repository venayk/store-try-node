function errorRes (req, res, errors, statusCode=500) {
	errors = errors instanceof Array ? errors : [errors];
	let response = { success: false, errors: errors };
	console.error(`
[ERROR]::${new Date()}:: ${req.originalUrl}
-> ${statusCode}
->\n${JSON.stringify(response, null, 2)}
\n`);
	console.log('------------------------------------------------------------------------------------------------------------------------------');
	return res.status(statusCode).json(response);
}

function successRes (req, res, data={}, statusCode=200) {
	let response = { success: true, data };
	console.log(`
[SUCCESS]::${new Date()}:: ${req.originalUrl}
-> ${statusCode}
->\n${JSON.stringify(response, null, 2)}
\n`);
	console.log('------------------------------------------------------------------------------------------------------------------------------');
	return res.status(statusCode).json(response);
}

function notFound(req, res, message) {
	let errors = [{
		'message': message || `'${req.originalUrl}' path not found`
	}];
	return errorRes(req, res, errors, 404);
}

module.exports = { errorRes, successRes, notFound };
