window.addEventListener('load', init);

API = `${location.origin}/weather/api/`;

async function init() {

	const elements = {
		timezoneElem: getElem('.timezone'),
		iconElem: getElem('.icon'),
		tempElem: getElem('.temp'),
		unitElem: getElem('.temp_unit'),
		descElem: getElem('.description'),
		tempSec: getElem('.temperature_section')
	}

	main(elements);
	setInterval(() => main(elements), 1000*60);
}

async function main(elements) {

	try {
		const {latitude, longitude} = (await getLocation()).coords;
		const { success, data } = await (await getWeather(latitude, longitude)).json();
		if(success) {
			populateElements(elements, data);
			// elements.tempSec.addEventListener('click', () => convertTemperature(elements, data.currently));
		}
	} catch (error) {
		console.error(error);
		alert(error.message);
	}


}

function getLocation() {
	return new Promise((res, rej) => {
		navigator.geolocation.getCurrentPosition(res, rej);
	});
}

async function getWeather(lat, long) {
	return await fetch(`${API}${lat}/${long}`);
}

function getElem(query) {
	return document.querySelector(query);
}

function populateElements(elems, data) {
	const { icon, temperature, summary } = data.currently;
	elems.timezoneElem.textContent = data.timezone;
	elems.tempElem.textContent = `${temperature}˚`;
	elems.unitElem.textContent = 'C';
	elems.descElem.textContent = summary;
	setIcon(icon.replace(/-/g, '_').toUpperCase());
}

function convertTemperature({tempElem, unitElem}, { temperature }) {
	if(unitElem.textContent === 'C'){
		let fahrenheit = ((temperature * (9 / 5)) + 32).toFixed(2);
		unitElem.textContent = 'F'
		tempElem.textContent = `${fahrenheit}˚`
	}
	else {
		unitElem.textContent = 'C'
		tempElem.textContent = `${temperature}˚`;
	}
}

function setIcon (icon) {
	var skycons = new Skycons({"color": "white"});
	skycons.add("icon", Skycons[icon]);
	skycons.play();
}
