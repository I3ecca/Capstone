/* Global Variables */
var difference;
var selectedDate;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
//this function takes the selected date, converts and finds difference between today's date and selected date//
function countdown() {
	selectedDate = document.getElementById("start").value;
	selectedDate = new Date(selectedDate.replace(/-/g, "/"));
	let todayDate = new Date();
	difference = Math.abs(selectedDate - todayDate);
	difference = Math.floor(difference / (60 * 60 * 24 * 1000));
};
// Personal API Key for Geonames //
let baseURL = "http://api.geonames.org/searchJSON?q=";
let apiKey = "&maxRows=01&username=i3ecca";
// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", performAction);
document.getElementById("start").addEventListener("change", countdown);
document.getElementById("remove").addEventListener("click", removeTrip);
/* Function called by event listener */
function performAction(e) {
	const enteredCity = document.getElementById("city").value.trim();
	//data validation//
	if (!enteredCity || selectedDate <= new Date()) {
		displayError();
		return;
	}
	getCoordinates(baseURL, enteredCity, apiKey).then(function (data) {
		document.getElementById("error").innerHTML = "";
		if (data.totalResultsCount === 0) {
			displayError();
			return;
		}
		//add data to POST request
		postData("/add", {
			date: "Date: " + newDate,
			latitude: "Latitude: " + data.geonames[0].lat,
			longitude: "Longitude:" + data.geonames[0].lng,
		});
		getWeather(data.geonames[0].lat, data.geonames[0].lng, "&key=61d5d974bf03412997232040306efb56").then(function (data) {
			//add data to POST request
			//if within week,find current weather//
			if (difference <= 7) {
				document.getElementById('daysLeft').innerHTML = difference + " days until your trip!";
				document.getElementById('tempDataHeader').innerHTML = "Weather currently for " + data.data[0].city_name + " is: ";
				document.getElementById('basicWeather').innerHTML = data.data[0].weather.description + " with a current temperature of " + celsiusToFahrenheit(data.data[0].temp) + "°F";
				document.getElementById('photo').innerHTML = "";
				getPhoto(data.data[0].city_name);
			}
			//else, get a historical weather for how weather is typically on this date//
			else {
				document.getElementById('daysLeft').innerHTML = difference + " days until your trip!";
				document.getElementById('tempDataHeader').innerHTML = "Typical weather for " + data.city_name + " around this time is: ";
				document.getElementById('basicWeather').innerHTML = data.data[0].weather.description + " with an average temperature of " + celsiusToFahrenheit(data.data[0].temp) + "°F";
				document.getElementById('photo').innerHTML = "";
				getPhoto(data.city_name);
			}
		});
	})
};
/* Function to GET Web API Data*/
const getCoordinates = async(baseURL, enteredCity, apiKey) => {
		const res = await fetch(baseURL + enteredCity + apiKey);
		try {
			const data = await res.json();
			return data;
		}
		// appropriately handle the error //
		catch (error) {
		}
	}
	/* Function to POST data */
const postData = async(url = "", data = {}) => {
	const req = await fetch(url, {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			date: data.date,
			lat: data.latitude,
			lng: data.longitude,
			content: data.content
		})
	})
};
const updateUI = async() => {
	const request = await fetch('/all');
	try {
		const allData = await request.json();
		// update new entry values
		document.getElementById('date').innerHTML = allData.test.date;
		document.getElementById('temp').innerHTML = allData.test.lat;
		document.getElementById('temp').innerHTML += allData.test.lng;
		document.getElementById('content').innerHTML = allData.test.content;
		document.getElementById("daysLeft").innerHTML = difference;
	} catch (error) {
	}
};
/* Function to GET Web API Data for weatherBit*/
const getWeather = async(lat, lng, apiKey) => {
	if (difference <= 7) {
		var weatherCurrentBaseUrl = "https://api.weatherbit.io/v2.0/current?";
		const res = await fetch(weatherCurrentBaseUrl + "lat=" + lat + "&lon=" + lng + apiKey);
		try {
			const data = await res.json();
			return data;
		}
		// appropriately handle the error //
		catch (error) {
		}
	} else {
		var weatherHistoricalBaseUrl = "https://api.weatherbit.io/v2.0/history/hourly?";
		var endDate = new Date(selectedDate);
		endDate.setDate(endDate.getDate() + 1);
		// endDate= endDate.toString();
		var endDate = (new Date().getFullYear() - 1) + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate();
		// let startDate = (selectedDate.replace(/\//g, "-"));
		let startDate = (new Date().getFullYear() - 1) + '-' + (selectedDate.getMonth() + 1) + '-' + selectedDate.getDate()
		const res = await fetch(weatherHistoricalBaseUrl + "lat=" + lat + "&lon=" + lng + "&start_date=" + startDate + "&end_date=" + endDate + apiKey);
		try {
			const data = await res.json();
			return data;
		}
		// appropriately handle the error //
		catch (error) {
		}
	}
}

function celsiusToFahrenheit(celsius) {
	return Math.floor((celsius * 9 / 5) + 32);
};
const getPhoto = async(enteredCity) => {
	const res = await fetch("https://pixabay.com/api/?key=18090116-2b1b8d103ff35b260976c7b3c&q=" + enteredCity + "&image_type=photo&pretty=true");
	try {
		const data = await res.json();
		var img = document.createElement('img');
		img.src = data.hits[0].largeImageURL;
		img.style.height = '300px';
		img.style.width = "auto";
		document.getElementById('photo').innerHTML = "";
		document.getElementById('photo').appendChild(img);
		return data;
	}
	// appropriately handle the error //
	catch (error) {
	}
}

function displayError() {
	document.getElementById("error").innerHTML = "";
	document.getElementById('photo').innerHTML = "";
	document.getElementById('daysLeft').innerHTML = "";
	document.getElementById('tempDataHeader').innerHTML = "";
	document.getElementById('basicWeather').innerHTML = "";
	document.getElementById("error").innerHTML = "Please enter a valid city and date.";
	return;
}

function removeTrip(e) {
	document.getElementById("error").innerHTML = "";
	document.getElementById('photo').innerHTML = "";
	document.getElementById('daysLeft').innerHTML = "";
	document.getElementById('tempDataHeader').innerHTML = "";
	document.getElementById('basicWeather').innerHTML = "";
}
export {
	performAction
}
export {
	removeTrip
}
