function errorRes (req, res, errors, statusCode=500) {
	if(errors.name === 'ValidationError') {
		statusCode = 400;
		errors = formatBadRequest(errors.errors);
	}
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

function successRes (req, res, data, statusCode=200) {
	if(!data) return notFound(req, res, 'Item not found.');
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
		'message': typeof message === 'string' && message || `'${req.originalUrl}' path not found`
	}];
	return errorRes(req, res, errors, 404);
}

function formatBadRequest(errors) {
	let ers = [];
	for(let err in errors) {
		ers.push({
			'message': errors[err].message
		});
	}
	return ers;
}

module.exports = { errorRes, successRes, notFound };
