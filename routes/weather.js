const express = require('express');
const router = express.Router();
const darkSky = new (require('dark-sky-skeleton'))('f6bbdd7845974a62ce9629f5d2c032be', true);

const { successRes, errorRes, notFound } = require('../common/response');

router.get('/', (req, res) => {
	res.render('weather/index');
});

router.get('/api/:lat/:lang', async (req, res) => {

	let { lat, lang } = req.params;
	if (!lat || !lang) {
		return errorRes(req, res, 'latitude or longitude is missing', 400);
	}

	let weather = await darkSky.latitude(lat).longitude(lang).units('si').get();
	if(weather.code){
		return errorRes(req, res, weather.error, weather.code)
	}
	return successRes(req, res, weather, 200);
});

module.exports = router;