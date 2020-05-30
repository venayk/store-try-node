function logRequest(req, res, next) {
	console.log(`
[REQUEST]::${new Date()}:: ${req.originalUrl}
-> METHOD:: ${req.method}
-> PARAMS::\n${JSON.stringify(req.params, null, 2)}\n
-> BODY::\n${JSON.stringify(req.body, null, 2)}\n
-> QUERY::\n${JSON.stringify(req.query, null, 2)}\n
`);
	next();
}

module.exports = { logRequest };
