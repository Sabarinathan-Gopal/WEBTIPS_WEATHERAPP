let currentContinentArrow = "arrowDown";
let currentTemperatureArrow = "arrowUp";
let i = 0;
var elementCard = document.querySelector("#continent-box0");
let topCountries = Object.values(totalJsonfile);
let timer2;
document
  .getElementById("continent-arrow")
  .addEventListener("click", () => continentSort());
document
  .getElementById("temperature-arrow")
  .addEventListener("click", () => temperatureSort());

(function () {
  document.getElementById("thirdcontainer-city").replaceChildren();
  i = 0;
  for (let element in totalJsonfile) {
    if (i < 12) {
      var clone = elementCard.cloneNode(true);
      clone.id = "continent-box" + i;
      document.getElementById("thirdcontainer-city").appendChild(clone);
      midcardUpdateValues(clone, element);
      i++;
    } else {
      break;
    }
  }
  topCountries = topCountries.sort((a, b) =>
    b.timeZone.split("/")[0].localeCompare(a.timeZone.split("/")[0])
  );
  topCountries = tempSort(topCountries, currentTemperatureArrow);
  updateWithSort(topCountries);
})();

function continentSort() {
  if (currentContinentArrow == "arrowDown") {
    currentContinentArrow = "arrowUp";
    document.getElementById("continent-arrow").src =
      "./Assets/HTML & CSS/General Images & Icons/arrowUp.svg";
    Sort(currentContinentArrow, currentTemperatureArrow);
  } else if (currentContinentArrow == "arrowUp") {
    currentContinentArrow = "arrowDown";
    document.getElementById("continent-arrow").src =
      "./Assets/HTML & CSS/General Images & Icons/arrowDown.svg";
    Sort(currentContinentArrow, currentTemperatureArrow);
  }
}

function temperatureSort() {
  if (currentTemperatureArrow == "arrowUp") {
    currentTemperatureArrow = "arrowDown";
    document.getElementById("temperature-arrow").src =
      "./Assets/HTML & CSS/General Images & Icons/arrowDown.svg";
    Sort(currentContinentArrow, currentTemperatureArrow);
  } else if (currentTemperatureArrow == "arrowDown") {
    currentTemperatureArrow = "arrowUp";
    document.getElementById("temperature-arrow").src =
      "./Assets/HTML & CSS/General Images & Icons/arrowUp.svg";
    Sort(currentContinentArrow, currentTemperatureArrow);
  }
}

function Sort(currentContinentArrow, currentTemperatureArrow) {
  if (
    (currentContinentArrow == "arrowDown" &&
      currentTemperatureArrow == "arrowDown") ||
    (currentContinentArrow == "arrowDown" &&
      currentTemperatureArrow == "arrowUp")
  ) {
    topCountries = topCountries.sort((a, b) =>
      b.timeZone.split("/")[0].localeCompare(a.timeZone.split("/")[0])
    );
    topCountries = tempSort(topCountries, currentTemperatureArrow);
    updateWithSort(topCountries);
  } else if (
    (currentContinentArrow == "arrowUp" &&
      currentTemperatureArrow == "arrowUp") ||
    (currentContinentArrow == "arrowUp" &&
      currentTemperatureArrow == "arrowDown")
  ) {
    topCountries = topCountries.sort((a, b) =>
      a.timeZone.split("/")[0].localeCompare(b.timeZone.split("/")[0])
    );
    topCountries = tempSort(topCountries, currentTemperatureArrow);
    updateWithSort(topCountries);
  }
}

function tempSort(topCountries, tempArrow) {
  if (tempArrow == "arrowDown") {
    topCountries.sort(function (a, b) {
      if (a.timeZone.split("/")[0] == b.timeZone.split("/")[0]) {
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
  } else if (tempArrow == "arrowUp") {
    topCountries.sort(function (a, b) {
      if (a.timeZone.split("/")[0] == b.timeZone.split("/")[0]) {
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
function updateWithSort(currentList) {
  document.getElementById("thirdcontainer-city").replaceChildren();
  i = 0;
  for (let element in currentList) {
    if (i < 12) {
      var clone = elementCard.cloneNode(true);
      clone.id = "continent-box" + i;
      document.getElementById("thirdcontainer-city").appendChild(clone);
      element = currentList[element].cityName.toLowerCase();
      midcardUpdateValues(clone, element);
      i++;
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
function midcardUpdateValues(val, currentCountry) {
  var currentCity = totalJsonfile[currentCountry].cityName.toLowerCase();
  val.querySelector("#thirdcontainer-continent").innerText = totalJsonfile[
    currentCity
  ].timeZone.substring(0, totalJsonfile[currentCity].timeZone.indexOf("/"));
  val.querySelector("#thirdcontainer-temperature").innerText =
    totalJsonfile[currentCity].temperature;
  val.querySelector("#thirdcontainer-humidity").innerText =
    totalJsonfile[currentCity].humidity;
  var currentHours;
  var currentTimezone;
  var timestamp;
  mytimer2();
  clearInterval(timer2);
  timer2 = setInterval(mytimer2, 500);
  function mytimer2() {
    currentTimezone = new Date().toLocaleString("en-US", {
      timeZone: totalJsonfile[currentCity].timeZone,
    });
    currentHours = new Date(currentTimezone).getHours() % 12;
    if (new Date(currentTimezone).getHours() >= 12) {
      timestamp = "PM";
    } else {
      timestamp = "AM";
    }
    if (currentHours == 0) {
      currentHours = 12;
    }
    val.querySelector("#thirdcontainer-country").innerText =
      totalJsonfile[currentCountry].cityName +
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
