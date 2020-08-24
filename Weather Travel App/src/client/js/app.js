/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();


// Personal API Key for OpenWeatherMap API
let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "&units=imperial&APPID=d0ee12581822ccc9e0e9f83fac9c5df8";
// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", performAction);
/* Function called by event listener */
function performAction(e) {
    const enteredZip = document.getElementById("zip").value;
    const howFeeling = document.getElementById("feelings").value;

    getWeather(baseURL, enteredZip, apiKey)
        .then(function(data) {
            console.log(data);
            //add data to POST request
            postData("/add", {
                date: "Date: " + newDate,
                temp: "Temperature: " + data.main.temp + "°F",
                content: "Feeling: " + howFeeling
            });
            updateUI();
        })
};

/* Function to GET Web API Data*/
const getWeather = async (baseURL, enteredZip, apikey) => {
    const res = await fetch(baseURL + enteredZip + apikey);
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
            temp: data.temp,
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
    } catch (error) {
        console.log("error", error);
    }
};


export { performAction }
