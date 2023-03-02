var summerCountries = [];
var winterCountries = [];
var rainyCountries = [];
var displayList = [];
var numberOption = document.getElementById("number-option");
var currentInputValue = 3;
var currentSummerValue = 0;
var currentWinterValue = 0;
var currentRainyValue = 0;
var elementCard = document.getElementById("city-card0");
let timer1;
let middleSectionObj;

class middleSectionValues extends cityFunction {}
middleSectionObj = new middleSectionValues();

numberOption.addEventListener("change", getNumberValue);
window.addEventListener("resize", resizeChange);

function middleSectionAsync() {
  var icon = "sunnyIcon";
  try {
    summerCountries = Object.values(totalDetails).filter(
      (city) =>
        Number(
          city.precipitation.substring(0, city.precipitation.length - 1)
        ) >= 50 &&
        Number(city.humidity.substring(0, city.humidity.length - 1)) < 50 &&
        Number(city.temperature.substring(0, city.temperature.length - 2)) > 29
    );
  } catch (err) {
    alert("Please wait for sometime", err);
    window.location.reload();
  }
  summerCountries.sort((a, b) => {
    return b.temperature - a.temperature;
  });
  document.getElementById("total-cards").replaceChildren();
  clearBorder();
  document
    .getElementById("icon1")
    .setAttribute("style", "border-bottom-style: solid");
  document.getElementById("total-cards").replaceChildren();
  document
    .getElementById("icon1")
    .setAttribute("style", "border-bottom-style: solid");
  if (summerCountries.length < currentInputValue) {
    initializeFunc(summerCountries.length, icon);
  } else {
    initializeFunc(currentInputValue, icon);
  }
  currentSummerValue = currentInputValue;
  displayList = summerCountries;
  resizeChange();
}

function initializeFunc(loopValue, icon) {
  for (let valuej = 0; valuej < loopValue; valuej++) {
    var clone = elementCard.cloneNode(true);
    clone.id = "city-card" + valuej;
    document.getElementById("total-cards").appendChild(clone);
    midcardUpdateValues(clone, summerCountries, valuej, icon);
  }
}
/**
 *Async Await function to perform step by step operation
 */
const asyncAwaitMiddle = async () => {
  const firstProcess = new Promise((resolve) => {
    setTimeout(() => resolve(), 2000);
  });
  await firstProcess;
  middleSectionAsync();
};

(function () {
  asyncAwaitMiddle();
})();

/**
 *To store the current Input number
 *To direct the working to respective function according to user's selection
 */
function getNumberValue() {
  currentInputValue = Number(numberOption.value);
  if (
    document
      .getElementById("icon1")
      .getAttribute("style", "border-bottom-style") ===
    "border-bottom-style: solid"
  ) {
    summerFunction();
  } else if (
    document
      .getElementById("icon2")
      .getAttribute("style", "border-bottom-style") ===
    "border-bottom-style: solid"
  ) {
    winterFunction();
  }
  if (
    document
      .getElementById("icon3")
      .getAttribute("style", "border-bottom-style") ===
    "border-bottom-style: solid"
  ) {
    rainyFunction();
  }
  resizeChange();
}

document
  .getElementById("icon1")
  .addEventListener("click", () => summerFunction());
document
  .getElementById("icon2")
  .addEventListener("click", () => winterFunction());
document
  .getElementById("icon3")
  .addEventListener("click", () => rainyFunction());
document
  .getElementById("scroll1")
  .addEventListener("click", () => midScroll(-29));
document
  .getElementById("scroll2")
  .addEventListener("click", () => midScroll(29));

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 *Performing scroll operations
 * @param {Number} val
 */
async function midScroll(val) {
  for (let valuei = 0; valuei < 10; valuei++) {
    await sleep(60);
    document.getElementById("card-container").scrollLeft += val;
  }
}

/**
 *Sort out cities according to the summer weather
 */
function summerFunction() {
  resizeChange();
  var icon = "sunnyIcon";
  summerCountries = Object.values(totalDetails).filter(
    (city) =>
      Number(city.precipitation.substring(0, city.precipitation.length - 1)) >=
        50 &&
      Number(city.humidity.substring(0, city.humidity.length - 1)) < 50 &&
      Number(city.temperature.substring(0, city.temperature.length - 2)) > 29
  );
  summerCountries.sort((a, b) => {
    return b.temperature - a.temperature;
  });
  document.getElementById("total-cards").replaceChildren();
  clearBorder();
  document
    .getElementById("icon1")
    .setAttribute("style", "border-bottom-style: solid");
  if (summerCountries.length >= 3) {
    if (currentSummerValue < currentInputValue) {
      if (summerCountries.length <= currentInputValue) {
        document.getElementById("total-cards").replaceChildren();
        document
          .getElementById("icon1")
          .setAttribute("style", "border-bottom-style: solid");
        for (let valuej = 0; valuej < summerCountries.length; valuej++) {
          var clone = elementCard.cloneNode(true);
          clone.id = "city-card" + valuej;
          document.getElementById("total-cards").appendChild(clone);
          midcardUpdateValues(clone, summerCountries, valuej, icon);
        }
      } else {
        document.getElementById("total-cards").replaceChildren();
        document
          .getElementById("icon1")
          .setAttribute("style", "border-bottom-style: solid");
        for (let valuej = 0; valuej < currentInputValue; valuej++) {
          var clone = elementCard.cloneNode(true);
          clone.id = "city-card" + valuej;
          document.getElementById("total-cards").appendChild(clone);
          midcardUpdateValues(clone, summerCountries, valuej, icon);
        }
        currentSummerValue = currentInputValue;
      }
    } else if (currentSummerValue > currentInputValue) {
      document.getElementById("total-cards").replaceChildren();
      for (let valuej = 0; valuej < currentInputValue; valuej++) {
        var clone = elementCard.cloneNode(true);
        clone.id = "city-card" + valuej;
        document.getElementById("total-cards").appendChild(clone);
        midcardUpdateValues(clone, summerCountries, valuej, icon);
      }
      currentSummerValue = currentInputValue;
    } else if (currentSummerValue === currentInputValue) {
      for (let valuei = 0; valuei < currentSummerValue; valuei++) {
        var clone = elementCard.cloneNode(true);
        clone.id = "city-card" + valuei;
        document.getElementById("total-cards").appendChild(clone);
        midcardUpdateValues(clone, summerCountries, valuei, icon);
      }
    }
  } else if (summerCountries.length < 3) {
    for (let valuej = 0; valuej < currentInputValue; valuej++) {
      var clone = elementCard.cloneNode(true);
      clone.id = "city-card" + valuej;
      document.getElementById("total-cards").appendChild(clone);
      midcardUpdateValues(clone, summerCountries, valuej, icon);
    }
    currentSummerValue = summerCountries.length;
  }
  displayList = summerCountries;
}

/**
 *Sort out cities according to the winter weather
 */
function winterFunction() {
  var icon = "snowflakeIcon";
  winterCountries = Object.values(totalDetails).filter(
    (city) =>
      Number(city.precipitation.substring(0, city.precipitation.length - 1)) <
        50 &&
      Number(city.humidity.substring(0, city.humidity.length - 1)) > 50 &&
      Number(city.temperature.substring(0, city.temperature.length - 2)) >=
        20 &&
      Number(city.temperature.substring(0, city.temperature.length - 2)) <= 28
  );
  winterCountries.sort((a, b) => {
    return b.precipitation - a.precipitation;
  });
  document.getElementById("total-cards").replaceChildren();
  clearBorder();
  document
    .getElementById("icon2")
    .setAttribute("style", "border-bottom-style: solid");
  if (winterCountries.length >= 3) {
    if (currentWinterValue < currentInputValue) {
      if (winterCountries.length <= currentInputValue) {
        document.getElementById("total-cards").replaceChildren();
        document
          .getElementById("icon2")
          .setAttribute("style", "border-bottom-style: solid");
        for (let valuej = 0; valuej < winterCountries.length; valuej++) {
          var clone = elementCard.cloneNode(true);
          clone.id = "city-card" + valuej;
          document.getElementById("total-cards").appendChild(clone);
          midcardUpdateValues(clone, winterCountries, valuej, icon);
        }
      } else {
        document.getElementById("total-cards").replaceChildren();
        document
          .getElementById("icon2")
          .setAttribute("style", "border-bottom-style: solid");
        for (let valuej = 0; valuej < currentInputValue; valuej++) {
          var clone = elementCard.cloneNode(true);
          clone.id = "city-card" + valuej;
          document.getElementById("total-cards").appendChild(clone);
          midcardUpdateValues(clone, winterCountries, valuej, icon);
        }
        currentWinterValue = currentInputValue;
      }
    } else if (currentWinterValue > currentInputValue) {
      document.getElementById("total-cards").replaceChildren();
      for (let valuej = 0; valuej < currentInputValue; valuej++) {
        var clone = elementCard.cloneNode(true);
        clone.id = "city-card" + valuej;
        document.getElementById("total-cards").appendChild(clone);
        midcardUpdateValues(clone, winterCountries, valuej, icon);
      }
      currentWinterValue = currentInputValue;
    } else if (currentWinterValue === currentInputValue) {
      for (let valuei = 0; valuei < currentWinterValue; valuei++) {
        var clone = elementCard.cloneNode(true);
        clone.id = "city-card" + valuei;
        document.getElementById("total-cards").appendChild(clone);
        midcardUpdateValues(clone, winterCountries, valuei, icon);
      }
    }
  } else if (winterCountries.length < 3) {
    for (let valuej = 0; valuej < winterCountries.length; valuej++) {
      var clone = elementCard.cloneNode(true);
      clone.id = "city-card" + valuej;
      document.getElementById("total-cards").appendChild(clone);
      midcardUpdateValues(clone, winterCountries, valuej, icon);
    }
    currentWinterValue = winterCountries.length;
  }
  displayList = winterCountries;
  resizeChange();
}

/**
 *Sort out cities according to the rainy weather
 */
function rainyFunction() {
  var icon = "rainyIcon";
  rainyCountries = Object.values(totalDetails).filter(
    (city) =>
      Number(city.humidity.substring(0, city.humidity.length - 1)) >= 50 &&
      Number(city.temperature.substring(0, city.temperature.length - 2)) < 20
  );
  rainyCountries.sort((a, b) => {
    return b.humidity - a.humidity;
  });
  document.getElementById("total-cards").replaceChildren();
  clearBorder();
  document
    .getElementById("icon3")
    .setAttribute("style", "border-bottom-style: solid");
  if (rainyCountries.length >= 3) {
    if (currentRainyValue < currentInputValue) {
      if (rainyCountries.length <= currentInputValue) {
        document.getElementById("total-cards").replaceChildren();
        document
          .getElementById("icon3")
          .setAttribute("style", "border-bottom-style: solid");
        for (let valuej = 0; valuej < rainyCountries.length; valuej++) {
          var clone = elementCard.cloneNode(true);
          clone.id = "city-card" + valuej;
          document.getElementById("total-cards").appendChild(clone);
          midcardUpdateValues(clone, rainyCountries, valuej, icon);
        }
      } else {
        document.getElementById("total-cards").replaceChildren();
        document
          .getElementById("icon3")
          .setAttribute("style", "border-bottom-style: solid");
        for (let valuej = 0; valuej < currentInputValue; valuej++) {
          var clone = elementCard.cloneNode(true);
          clone.id = "city-card" + valuej;
          document.getElementById("total-cards").appendChild(clone);
          midcardUpdateValues(clone, rainyCountries, valuej, icon);
        }
        currentRainyValue = currentInputValue;
      }
    } else if (currentRainyValue > currentInputValue) {
      for (let valuej = 0; valuej < currentInputValue; valuej++) {
        var clone = elementCard.cloneNode(true);
        clone.id = "city-card" + valuej;
        document.getElementById("total-cards").appendChild(clone);
        midcardUpdateValues(clone, rainyCountries, valuej, icon);
      }
      currentRainyValue = currentInputValue;
    } else if (currentRainyValue === currentInputValue) {
      for (let valuei = 0; valuei < currentRainyValue; valuei++) {
        var clone = elementCard.cloneNode(true);
        clone.id = "city-card" + valuei;
        document.getElementById("total-cards").appendChild(clone);
        midcardUpdateValues(clone, rainyCountries, valuei, icon);
      }
    }
  } else if (rainyCountries.length < 3) {
    for (let valuej = 0; valuej < rainyCountries.length; valuej++) {
      var clone = elementCard.cloneNode(true);
      clone.id = "city-card" + valuej;
      document.getElementById("total-cards").appendChild(clone);
      midcardUpdateValues(clone, rainyCountries, valuej, icon);
    }
    currentRainyValue = rainyCountries.length;
  }
  displayList = rainyCountries;
  resizeChange();
}

/**
 *To clear the previous selected border of the icons
 */
function clearBorder() {
  for (let valuei = 0; valuei < 3; valuei++) {
    document
      .getElementById("icon" + (valuei + 1))
      .setAttribute("style", "border-bottom-style: none");
  }
}

/**
 *Updating the values of the current city boxes during runtime
 * @param {Number} val
 * @param {list} currentCountry
 * @param {Number} index
 * @param {string} icon
 */
function midcardUpdateValues(val, currentCountry, index, icon) {
  middleSectionObj.setCityName(currentCountry[index].cityName);
  middleSectionObj.setTemperature(currentCountry[index].temperature);
  middleSectionObj.setHumidity(currentCountry[index].humidity);
  middleSectionObj.setPrecipitation(currentCountry[index].precipitation);
  var currentCity = middleSectionObj.getCityName().toLowerCase();
  val
    .querySelector("#city-card-image")
    .setAttribute(
      "style",
      "background-image: url('./Assets/HTML_&_CSS/Icons_for_cities/" +
        currentCity +
        ".svg')"
    );
  val.querySelector("#middle-temp-icon").src =
    "./Assets/HTML_&_CSS/Weather_Icons/" + icon + ".svg";
  val.querySelector("#middle-city-name").innerText =
    middleSectionObj.getCityName();
  val.querySelector("#middle-temperature").innerText =
    middleSectionObj.getTemperature();
  var currentHours;
  var currentTimezone;
  var timestamp;
  mytimer1();
  clearInterval(timer1);
  timer1 = setInterval(mytimer1, 500);
  function mytimer1() {
    middleSectionObj.setTimeZone(currentCountry[index].timeZone);
    currentTimezone = new Date().toLocaleString("en-US", {
      timeZone: middleSectionObj.getTimeZone(),
    });
    currentHours = new Date(currentTimezone).getHours() % 12;
    timestamp = middleSectionObj.getTimeStamp(
      new Date(currentTimezone).getHours()
    );
    const date = new Date(currentTimezone).getDate();
    val.querySelector("#middle-city-date").innerText =
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
    val.querySelector("#middle-city-time").innerText =
      (currentHours < 10 ? "0" + currentHours : currentHours) +
      ":" +
      (new Date(currentTimezone).getMinutes() < 10
        ? "0" + new Date(currentTimezone).getMinutes()
        : new Date(currentTimezone).getMinutes()) +
      " " +
      timestamp;
    timer1 = setInterval(mytimer1, 500);
    clearInterval(timer1);
  }
  val.querySelector("#middle-humidity").innerText =
    middleSectionObj.getHumidity();
  val.querySelector("#middle-precipitation").innerText =
    middleSectionObj.getPrecipitation();
}

/**
 *To hide the scroll image if the city list is less than the expected number
 * @param {Number} numberOption
 * @param {Number} countryLength
 */
function resizeChange() {
  let cardWidth = document.getElementById("card-container").clientWidth;
  let cardCount = displayList.length;
  let count = cardCount < currentInputValue ? cardCount : currentInputValue;
  if (cardWidth < count * 282 + 20) {
    document
      .getElementById("total-cards")
      .setAttribute("style", "justify-content: none");
    document
      .getElementById("scroll1")
      .setAttribute("style", "visibility:visible");
    document
      .getElementById("scroll2")
      .setAttribute("style", "visibility:visible");
  } else {
    document
      .getElementById("total-cards")
      .setAttribute("style", "justify-content: center");
    document
      .getElementById("scroll1")
      .setAttribute("style", "visibility:hidden");
    document
      .getElementById("scroll2")
      .setAttribute("style", "visibility:hidden");
  }
}
