module.exports = promise => promise.then(data => ({data})).catch(error => Promise.resolve({error}));