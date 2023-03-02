let currentContinentArrow = "arrowDown";
let currentTemperatureArrow = "arrowUp";
let valuei = 0;
var bottomElementCard = document.querySelector("#continent-box0");
let timer2;
let bottomSectionObj;
let topCountries;
class bottomSectionValues extends cityFunction {}
bottomSectionObj = new bottomSectionValues();
document
  .getElementById("continent-arrow")
  .addEventListener("click", () => continentSort());
document
  .getElementById("temperature-arrow")
  .addEventListener("click", () => temperatureSort());

function bottomSectionAsync() {
  topCountries = totalDetails;
  document.getElementById("thirdcontainer-city").replaceChildren();
  topCountries = topCountries.sort((a, b) =>
    b.timeZone.split("/")[0].localeCompare(a.timeZone.split("/")[0])
  );
  topCountries = tempSort(topCountries, currentTemperatureArrow);
  updateWithSort(topCountries);
}

const asyncAwaitBottom = async () => {
  const firstProcess = new Promise((resolve, reject) => {
    setTimeout(() => resolve(), 2000);
  });
  await firstProcess;
  bottomSectionAsync();
};

(function () {
  asyncAwaitBottom();
})();

/**
 *To change the arrow when the continent arrows are clicked
 */
function continentSort() {
  if (currentContinentArrow === "arrowDown") {
    currentContinentArrow = "arrowUp";
    document.getElementById("continent-arrow").src =
      "./Assets/HTML_&_CSS/General_Images_&_Icons/arrowUp.svg";
    Sort(currentContinentArrow, currentTemperatureArrow);
  } else if (currentContinentArrow === "arrowUp") {
    currentContinentArrow = "arrowDown";
    document.getElementById("continent-arrow").src =
      "./Assets/HTML_&_CSS/General_Images_&_Icons/arrowDown.svg";
    Sort(currentContinentArrow, currentTemperatureArrow);
  }
}

/**
 *To change the arrow when the temperature arrows are clicked
 */
function temperatureSort() {
  if (currentTemperatureArrow === "arrowUp") {
    currentTemperatureArrow = "arrowDown";
    document.getElementById("temperature-arrow").src =
      "./Assets/HTML_&_CSS/General_Images_&_Icons/arrowDown.svg";
    Sort(currentContinentArrow, currentTemperatureArrow);
  } else if (currentTemperatureArrow === "arrowDown") {
    currentTemperatureArrow = "arrowUp";
    document.getElementById("temperature-arrow").src =
      "./Assets/HTML_&_CSS/General_Images_&_Icons/arrowUp.svg";
    Sort(currentContinentArrow, currentTemperatureArrow);
  }
}

/**
 *To sort the continents according to the requirement
 *Redirecting to the temperature sort function
 * @param {string} currentContinentArrow
 * @param {string} currentTemperatureArrow
 */
function Sort(currentContinentArrow, currentTemperatureArrow) {
  if (
    (currentContinentArrow === "arrowDown" &&
      currentTemperatureArrow === "arrowDown") ||
    (currentContinentArrow === "arrowDown" &&
      currentTemperatureArrow === "arrowUp")
  ) {
    topCountries = topCountries.sort((a, b) =>
      b.timeZone.split("/")[0].localeCompare(a.timeZone.split("/")[0])
    );
    topCountries = tempSort(topCountries, currentTemperatureArrow);
    updateWithSort(topCountries);
  } else if (
    (currentContinentArrow === "arrowUp" &&
      currentTemperatureArrow === "arrowUp") ||
    (currentContinentArrow === "arrowUp" &&
      currentTemperatureArrow === "arrowDown")
  ) {
    topCountries = topCountries.sort((a, b) =>
      a.timeZone.split("/")[0].localeCompare(b.timeZone.split("/")[0])
    );
    topCountries = tempSort(topCountries, currentTemperatureArrow);
    updateWithSort(topCountries);
  }
}

/**
 *To sort the cards based on the temperature
 *Temperature sort done and the sorted list returned to the update function
 * @param {List} topCountries
 * @param {string} tempArrow
 * @return {List}
 */
function tempSort(topCountries, tempArrow) {
  if (tempArrow === "arrowDown") {
    topCountries.sort(function (a, b) {
      if (a.timeZone.split("/")[0] === b.timeZone.split("/")[0]) {
        if (
          Number(a.temperature.split("°C")[0]) <
          Number(b.temperature.split("°C")[0])
        ) {
          return 1;
        }
        if (
          Number(a.temperature.split("°C")[0]) >
          Number(b.temperature.split("°C")[0])
        ) {
          return -1;
        }
        return 0;
      }
    });
    return topCountries;
  } else if (tempArrow === "arrowUp") {
    topCountries.sort(function (a, b) {
      if (a.timeZone.split("/")[0] === b.timeZone.split("/")[0]) {
        if (
          Number(a.temperature.split("°C")[0]) >
          Number(b.temperature.split("°C")[0])
        ) {
          return 1;
        }
        if (
          Number(a.temperature.split("°C")[0]) <
          Number(b.temperature.split("°C")[0])
        ) {
          return -1;
        }
        return 0;
      }
    });
    return topCountries;
  }
}

/**
 *sorting the cards accordingly to the div
 * @param {list} currentList
 */
function updateWithSort(currentList) {
  document.getElementById("thirdcontainer-city").replaceChildren();
  valuei = 0;
  for (let element in currentList) {
    if (valuei < 12) {
      var clone1 = bottomElementCard.cloneNode(true);
      clone1.id = "continent-box" + valuei;
      document.getElementById("thirdcontainer-city").appendChild(clone1);
      // element = currentList[element].cityName.toLowerCase();
      bottomCardUpdateValues(clone1, currentList, element);
      valuei++;
    } else {
      break;
    }
  }
}

/**
 *Updating the values of the current city boxes during runtime
 * @param {Number} val
 * @param {list} currentCountry
 * @param {Number} index
 * @param {string} icon
 */
function bottomCardUpdateValues(val, currentList, currentCountry) {
  let currentCityName;
  let presentTimeZone;
  bottomSectionObj.setCityName(currentList[currentCountry].cityName);
  bottomSectionObj.setTemperature(currentList[currentCountry].temperature);
  bottomSectionObj.setHumidity(currentList[currentCountry].humidity);
  bottomSectionObj.setPrecipitation(currentList[currentCountry].precipitation);
  var currentCity = bottomSectionObj.getCityName().toLowerCase();
  val.querySelector("#thirdcontainer-continent").innerText = currentList[
    currentCountry
  ].timeZone.substring(0, currentList[currentCountry].timeZone.indexOf("/"));
  currentCityName = bottomSectionObj.getCityName();
  presentTimeZone = bottomSectionObj.getTimeZone();
  val.querySelector("#thirdcontainer-temperature").innerText =
    bottomSectionObj.getTemperature();
  val.querySelector("#thirdcontainer-humidity").innerText =
    bottomSectionObj.getHumidity();
  var currentHours;
  var currentTimezone;
  var timestamp;
  mytimer2();
  clearInterval(timer2);
  timer2 = setInterval(mytimer2, 500);
  function mytimer2() {
    currentTimezone = new Date().toLocaleString("en-US", {
      timeZone: presentTimeZone,
    });
    currentHours = new Date(currentTimezone).getHours() % 12;
    timestamp = bottomSectionObj.getTimeStamp(
      new Date(currentTimezone).getHours()
    );
    if (currentHours === 0) {
      currentHours = 12;
    }
    val.querySelector("#thirdcontainer-country").innerText =
      currentCityName +
      "," +
      " " +
      (currentHours < 10 ? "0" + currentHours : currentHours) +
      ":" +
      (new Date(currentTimezone).getMinutes() < 10
        ? "0" + new Date(currentTimezone).getMinutes()
        : new Date(currentTimezone).getMinutes()) +
      " " +
      timestamp;
    timer2 = setInterval(mytimer2, 500);
    clearInterval(timer2);
  }
}
