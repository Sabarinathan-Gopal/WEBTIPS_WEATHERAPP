let timeFiveHrs;
/**
 *This function gets the response from the link and stores the values in a JSON format
 *Stores a default value when the page loads
 */
const getTimeHrs = async (timeLine) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    city_Date_Time_Name: timeLine,
    hours: 6,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch("http://127.0.0.1:8000/hourly-forecast", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      timeFiveHrs = result;
      console.log(timeFiveHrs);
      return result;
    })
    .catch((error) => console.log("error", error));
};

/**
 *To get the timelog of the selected city respectively
 *To get the temperature for the next five hours through Post
 * @param {string} cityValue
 */
const timeLog = async (cityValue) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  await fetch("http://127.0.0.1:8000?city=" + cityValue, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      timeLine = result.city_Date_Time_Name;
      timeFiveHrs = getTimeHrs(timeLine);
      console.log(timeLine);
      return timeFiveHrs;
    })
    .catch((error) => console.log("error", error));
};

const getCityDetails = async () => {
  await fetch("http://127.0.0.1:8000/all-timezone-cities")
    .then((response) => {
      return response.json();
    })
    .then(async (responseData) => {
      totalDetails = responseData;
    });
};
