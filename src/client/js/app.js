/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();


// Personal API Key for OpenWeatherMap API
let baseURL = "http://api.geonames.org/searchJSON?q=";
let apiKey = "&maxRows=01&username=i3ecca";


// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", performAction);
/* Function called by event listener */
function performAction(e) {
    const enteredCity = document.getElementById("city").value;
    const howFeeling = document.getElementById("feelings").value;

    getWeather(baseURL, enteredCity, apiKey)
        .then(function(data) {
            console.log(data);
            //add data to POST request
            postData("/add", {
                date: "Date: " + newDate,
                coordinates: "Latitude: " + data.geonames[0].lat + "Longitude:" + data.geonames[0].lng ,
                content: "Feeling: " + howFeeling
            });
            updateUI();
        })
};

/* Function to GET Web API Data*/
const getWeather = async (baseURL, enteredCity, apiKey) => {
    const res = await fetch(baseURL + enteredCity + apiKey);
    console.log(res);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    }
    // appropriately handle the error //
    catch (error) {
        console.log("error", error);
    }
}

/* Function to POST data */
const postData = async (url = "", data = {}) => {
    console.log(url);
    console.log(data);
    const req = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            date: data.date,
            temp: data.coordinates,
            content: data.content
        })
    })


};


const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData);


        // update new entry values
        document.getElementById('date').innerHTML = allData.test.date;
        document.getElementById('temp').innerHTML = allData.test.temp;
        document.getElementById('content').innerHTML = allData.test.content;
    }

    catch (error) {
        console.log("error", error);
    }
};


export { performAction };
