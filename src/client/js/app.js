/* Global Variables */
var difference;
var selectedDate;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() +1 ) + '/' + d.getDate() + '/' + d.getFullYear();

//this function takes the selected date, converts and finds difference between today's date and selected date//
function countdown(){
  selectedDate = document.getElementById("start").value;
  selectedDate = new Date(selectedDate.replace(/-/g, "/"));
  console.log(selectedDate);
  let todayDate = new Date();
  difference = Math.abs(selectedDate - todayDate);
  difference = Math.floor(difference / (60*60*24*1000));
  console.log(difference);

};

// Personal API Key for Geonames //
let baseURL = "http://api.geonames.org/searchJSON?q=";
let apiKey = "&maxRows=01&username=i3ecca";


// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", performAction);
document.getElementById("start").addEventListener("change", countdown);
/* Function called by event listener */
function performAction(e) {
    const enteredCity = document.getElementById("city").value;
    const howFeeling = document.getElementById("feelings").value;


    getCoordinates(baseURL, enteredCity, apiKey)
        .then(function(data) {
            console.log(data);
            //add data to POST request
            console.log("The value of NewDate", newDate )
            postData("/add", {
                date: "Date: " + newDate,
                latitude: "Latitude: " + data.geonames[0].lat,
                longitude: "Longitude:" + data.geonames[0].lng,
                content: "Feeling: " + howFeeling
            });
            getWeather(data.geonames[0].lat,data.geonames[0].lng,"&key=61d5d974bf03412997232040306efb56")
            .then(function(data) {
                console.log(data);
                //add data to POST request
                console.log("The value of NewDate", newDate )
            });
        })
};

/* Function to GET Web API Data*/
const getCoordinates = async (baseURL, enteredCity, apiKey) => {
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
            lat: data.latitude,
            lng: data.longitude,
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
        document.getElementById('temp').innerHTML = allData.test.lat;
        document.getElementById('temp').innerHTML += allData.test.lng;
        document.getElementById('content').innerHTML = allData.test.content;
        document.getElementById("daysLeft").innerHTML = difference;
    }

    catch (error) {
        console.log("error", error);
    }
};



/* Function to GET Web API Data for weatherBit*/
const getWeather = async (lat, lng, apiKey) => {
  if(difference <= 7){
    var weatherCurrentBaseUrl= "https://api.weatherbit.io/v2.0/current?";
    const res = await fetch(weatherCurrentBaseUrl + "lat=" + lat + "&lon=" + lng + apiKey);
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

  else{
    var weatherHistoricalBaseUrl= "https://api.weatherbit.io/v2.0/history/daily?";
    var endDate= new Date(selectedDate);
    console.log(endDate);
    console.log(selectedDate);
    endDate.setDate(endDate.getDate()+1);
    console.log(endDate);
    console.log(selectedDate);
    // endDate= endDate.toString();
    console.log(newDate);
    var endDate = (new Date().getFullYear()-1) + '-' + (endDate.getMonth() +1) + '-' + endDate.getDate();
    console.log(endDate);
    // let startDate = (selectedDate.replace(/\//g, "-"));

    console.log(selectedDate);
    let startDate = (new Date().getFullYear()-1) + '-' + (selectedDate.getMonth() +1) + '-' + selectedDate.getDate()
    // var dateHolder = startDate.split('-');
    // var temp = dateHolder[1];
    // dateHolder[1]=dateHolder[0];
    // dateHolder[0]=dateHolder[2];
    // dateholder[2]=temp;
    // dateHolder.join('-');
    console.log(startDate);

      const res = await fetch(weatherHistoricalBaseUrl + "lat=" + lat + "&lon=" + lng + "&start_date=" + startDate + "&end_date=" + endDate + apiKey);
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
}

// function countdown(){
//   selectedDate = document.getElementById("start").value;
//   selectedDate = new Date(selectedDate.replace(/-/g, "/"));
//   console.log(selectedDate);
//   let todayDate = new Date();
//   difference = Math.abs(selectedDate - todayDate);
//   difference = Math.floor(difference / (60*60*24*1000));
//   console.log(difference);
//
// };




export { performAction };
