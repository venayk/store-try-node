const router = require('express').Router();
const darkSky = new (require('dark-sky-skeleton'))(process.env.dark_sky_api_key, true);

const { successRes, errorRes } = require('../common/response');

router.get('/', (req, res) => res.render('weather/index'));

router.get('/api/:lat/:longt', async (req, res) => {
	let weather = await darkSky.latitude(req.params.lat).longitude(req.params.longt).units('si').get();
	return weather.code ? errorRes(req, res, weather.error, weather.code) : successRes(req, res, weather, 200);
});

module.exports = router;