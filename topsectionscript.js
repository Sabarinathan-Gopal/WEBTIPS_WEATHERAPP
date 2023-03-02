document
  .querySelector("#city-option")
  .addEventListener("change", totalCityWeather);
var date = new Date().toJSON();
let timer;
var optionBox = document.getElementById("city-option");
let cityObject;
let totalDetails;
let timeLine;

/**
 *Async Await function to perform step by step operation
 */
const asyncAwait = async () => {
  await getCityDetails();
  var cityOptionbox = document.getElementById("city-options");
  for (var value in totalDetails) {
    cityOptionbox.innerHTML =
      cityOptionbox.innerHTML +
      '<option value="' +
      totalDetails[value].cityName +
      '">';
  }
  optionBox.value = "Nome";
  totalCityWeather();
};

/**
 *To reload the topsection with 4 hours of span to update the next five hours
 */
const timeChange = async () => {
  await getCityDetails();
  var cityOptionbox = document.getElementById("city-options");
  for (var value in totalDetails) {
    cityOptionbox.innerHTML =
      cityOptionbox.innerHTML +
      '<option value="' +
      totalDetails[value].cityName +
      '">';
  }
  totalCityWeather();
};

(function () {
  asyncAwait();
  setInterval(timeChange, 14400000);
})();

class cityFunction {
  constructor() {}
  // Set values operation performed for all the needed fields

  setTotalValues(citiesTotal) {
    this.citiesTotal = citiesTotal;
  }
  setCityName(cityName) {
    this.cityName = cityName;
  }
  setDateAndTime(dateAndTime) {
    this.dateAndTime = dateAndTime;
  }
  setTimeZone(timeZone) {
    this.timeZone = timeZone;
  }
  setTemperature(temperature) {
    this.temperature = temperature;
  }
  setHumidity(humidity) {
    this.humidity = humidity;
  }
  setPrecipitation(precipitation) {
    this.precipitation = precipitation;
  }
  setNextFiveHrs(nextFiveHrs) {
    this.nextFiveHrs = nextFiveHrs;
  }
  // Get values operation performed for all the needed fields
  getTotalValues() {
    return this.citiesTotal;
  }
  getCityName() {
    return this.cityName;
  }
  getDateAndTime() {
    return this.dateAndTime;
  }
  getTimeZone() {
    return this.timeZone;
  }
  getTemperature() {
    return this.temperature;
  }
  getHumidity() {
    return this.humidity;
  }
  getPrecipitation() {
    return this.precipitation;
  }
  getNextFiveHrs() {
    return this.nextFiveHrs;
  }
  getTimeStamp(val) {
    let timestamp;
    if (val >= 12) {
      timestamp = "AM";
      return timestamp;
    } else {
      timestamp = "PM";
      return timestamp;
    }
  }
  setResponseDataFunction() {
    return totalDetails;
  }
}

/**
 *To check whether the city selected is present in the JS file
 *Calling the function topSector to perform the remaining functions
 * @param {string} cities
 */
function totalCityWeather() {
  cities = optionBox.value;
  let found = false;
  let indexValue;
  for (let value in totalDetails) {
    if (cities === totalDetails[value].cityName) {
      found = true;
    }
  }
  indexValue = checkIndex(cities);
  if (found === true) {
    topSector(cities, indexValue);
    optionBox.setAttribute("style", "border-color:transparent");
    document.getElementById("value-style1").innerText = "C";
    document.getElementById("value-style2").innerText = "F";
  } else {
    clearInterval(timer);
    errorDisplay();
  }
}

/**
 *cities value compared with the response data and temperature updated simultaneously
 *Index value of the response data returned after comparing with the Js file
 * @param {String} cities
 * @return {Integer}
 */
function checkIndex(cities) {
  for (let valuei = 0; valuei < totalDetails.length; valuei++) {
    if (totalDetails[valuei].cityName == cities) {
      return valuei;
      break;
    }
  }
}
/**
 *To display validation if invalid cities entered in datalist
 */
function errorDisplay() {
  let errorItem = document.getElementsByClassName("error-validation");
  let errorImage = document.getElementsByClassName("weather-img");
  optionBox.setAttribute("style", "border-color:red");
  for (let valuei = 0; valuei < errorItem.length; valuei++) {
    errorItem[valuei].innerHTML = "NIL";
  }
  for (let i = 0; i < errorImage.length; i++) {
    errorImage[i].src =
      "./Assets/HTML_&_CSS/General_Images_&_Icons/warning.svg";
  }
  document.getElementById("value-style1").innerText = "";
  document.getElementById("value-style2").innerText = "";
  document.getElementById("time-state").src =
    "./Assets/HTML_&_CSS/General_Images_&_Icons/warning.svg";
  document
    .getElementById("city-seperate-image")
    .setAttribute(
      "style",
      "background-image: url('./Assets/HTML_&_CSS/General_Images_&_Icons/warning.svg')"
    );
}

/**
 *To set DOM functions to the respective div elements
 *To assign city details with the help of the JS file
 * @param {string} cities
 */
const topSector = async (cities, indValue) => {
  let currentFiveHrs;
  cityObject = new cityFunction();
  cityObject.setTotalValues(totalDetails);
  cityObject.setCityName(totalDetails[indValue].cityName);
  cityObject.setDateAndTime(totalDetails[indValue].dateAndTime);
  cityObject.setTemperature(totalDetails[indValue].temperature);
  cityObject.setHumidity(totalDetails[indValue].humidity);
  await timeLog(totalDetails[indValue].cityName);
  cityObject.setNextFiveHrs(timeFiveHrs);
  cityObject.setTimeZone(totalDetails[indValue].timeZone);
  cityObject.setPrecipitation(totalDetails[indValue].precipitation);
  var tempCelsius = document.getElementById("temperature-celsius");
  var tempFarenheit = document.getElementById("temperature-farenheit");
  var tempCurrent = document.getElementById("current-time");
  var currentImagei = document.getElementById("current-image");
  var tempHumidity = document.getElementById("humidity-value");
  var tempPrecipitation = document.getElementById("precipitation-value");
  tempCelsius.innerText = cityObject.getTemperature();
  var actualCeliusval = tempCelsius.innerText.substring(
    0,
    tempCelsius.innerText.indexOf("°")
  );
  var currenTime = document.getElementById("current-time");
  var currentSeconds = document.getElementById("subscript-seconds");
  var currentDate = document.getElementById("date-log");
  var currentHours;
  var currentTimezone;
  /**
   *Allows the system to take the current time of the selected city using timezone
   */
  function mytimer() {
    currentTimezone = new Date().toLocaleString("en-US", {
      timeZone: cityObject.getTimeZone(),
    });
    currentHours = new Date(currentTimezone).getHours() % 12;
    if (new Date(currentTimezone).getHours() >= 12) {
      document.getElementById("time-state").src =
        "./Assets/HTML_&_CSS/General_Images_&_Icons/pmState.svg";
    } else {
      document.getElementById("time-state").src =
        "./Assets/HTML_&_CSS/General_Images_&_Icons/amState.svg";
    }
    const date = new Date(currentTimezone).getDate();
    currentDate.innerText =
      (date < 10 ? "0" + date : date) +
      "-" +
      new Date().toLocaleString(
        "en-US",
        { month: "short" },
        { timeZone: currentTimezone }
      ) +
      "-" +
      new Date(currentTimezone).getFullYear();
    if (currentHours === 0) {
      currentHours = 12;
    }
    currenTime.innerText =
      (currentHours < 10 ? "0" + currentHours : currentHours) +
      ":" +
      (new Date(currentTimezone).getMinutes() < 10
        ? "0" + new Date(currentTimezone).getMinutes()
        : new Date(currentTimezone).getMinutes());
    currentSeconds.innerText =
      new Date(currentTimezone).getSeconds() < 10
        ? "0" + new Date(currentTimezone).getSeconds()
        : new Date(currentTimezone).getSeconds();
  }
  mytimer();
  clearInterval(timer);
  timer = setInterval(mytimer, 500);
  tempFarenheit.innerText = parseFloat(
    (actualCeliusval * 9) / 5 + 32 + " F"
  ).toFixed(1);
  tempCelsius.innerText = tempCelsius.innerText.substring(
    0,
    tempCelsius.innerText.indexOf("°")
  );
  tempImage(tempCelsius.innerText, currentImagei);
  document.getElementById("timecurrent").innerText =
    tempCelsius.innerText.split();
  tempHumidity.innerText = cityObject.getHumidity();
  tempPrecipitation.innerText = cityObject.getPrecipitation();
  document
    .getElementById("city-seperate-image")
    .setAttribute(
      "style",
      "background-image: url('./Assets/HTML_&_CSS/Icons_for_cities/" +
        cities +
        ".svg')"
    );
  var currentHour = new Date(currentTimezone).getHours();
  tempFunction(currentHour, cities);
};

/**
 *To set the timestamp for the next five hours
 * @param {Number} currentHour
 * @param {string} cities
 */
function tempFunction(currentHour, cities) {
  for (let count = 0; count < 5; count++) {
    var timelog = document.getElementById("timelog" + count);
    if (Number(currentHour) + count + 1 > 24) {
      currentHour = currentHour - 24;
    }
    if (Number(currentHour) + count + 1 < 12) {
      timelog.innerText = Number(currentHour) + (count + 1) + "AM";
    } else if (Number(currentHour) + count + 1 === 12) {
      timelog.innerText = Number(currentHour) + (count + 1) + "PM";
    } else if (Number(currentHour) + count + 1 === 24) {
      timelog.innerText = 12 + "AM";
    } else {
      timelog.innerText = Number(currentHour) + (count + 1) - 12 + "PM";
    }
    var temphour = document.getElementById("time" + count);
    temphour.innerText = cityObject
      .getNextFiveHrs()
      .temperature[count].slice(
        0,
        cityObject.getNextFiveHrs().temperature[count].length - 2
      );
    var currentImage = document.getElementById("current-image" + count);
    tempImage(temphour.innerText, currentImage);
  }
}

/**
 *To set the current weather icon for the next five hours
 * @param {*} temperature
 * @param {*} currentImage
 */
function tempImage(temperature, currentImage) {
  if (temperature >= 23 && temperature <= 29) {
    currentImage.src = "./Assets/HTML_&_CSS/Weather_Icons/cloudyIcon.svg";
  }
  if (temperature >= 18 && temperature <= 22) {
    currentImage.src = "./Assets/HTML_&_CSS/Weather_Icons/windyIcon.svg";
  }
  if (temperature < 18) {
    currentImage.src = "./Assets/HTML_&_CSS/Weather_Icons/rainyIcon.svg";
  }
  if (temperature > 29) {
    currentImage.src = "./Assets/HTML_&_CSS/Weather_Icons/sunnyIcon.svg";
  }
}
