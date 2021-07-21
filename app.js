const getCity = async (lat, long) => {
  const apiKey = "2ad894c7bf2f44b4b52165812201208"
  const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${lat}, ${long}`
  let response = await fetch(url);
  response = await response.json();
  // console.log(response);
}

const setWeather = (weather) => {
  const weather_large = document.querySelector("#weather-large");
  const feels_like_value = document.querySelector(".feels-like-value");
  const date = document.querySelector(".date");
  const weather_text = document.querySelector(".weather-text");
  const min_temp = document.querySelector(".min-temp");
  const max_temp = document.querySelector(".max-temp");
  console.log(weather.current)
  weather_large.textContent = weather.current.temp_c;
  feels_like_value.textContent = weather.current.feelslike_c;
  weather_text.textContent = weather.current.condition.text;
  // min_temp.textContent = weather.current.feelslike_c;
  // max_temp.textContent = weather.current.feelslike_c;var currentDate = new Date();
  const currentDate = new Date();
  const month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  const getMonth = month[currentDate.getMonth()];
  date.textContent = `${getMonth} ${currentDate.getDate()}, ${currentDate.getFullYear()}`
}

const getWeatherbyLocation = async (lat, long) => {
  const apiKey = "2ad894c7bf2f44b4b52165812201208";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat}, ${long}`;
  let response = await fetch(url);
  response = await response.json();
  search.value = `${response.location.name}, ${response.location.region}, ${response.location.country}`
  console.log(response);
  setWeather(response);
}

const getWeatherbyName = async (name) => {
  const apiKey = "2ad894c7bf2f44b4b52165812201208";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${name}`;
  let response = await fetch(url);
  response = await response.json();
  setWeather(response);
}

const setLocation = async (pos) => {
  const lat = pos.coords.latitude;
  const long = pos.coords.longitude;
  console.log(lat, long)
  const city = await getWeatherbyLocation(lat, long);
}


const initWeather = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setLocation);
  } else {
    console.log("Location is restricted...")
  }
}

const showSeachResults = (results) => {
  // const searchList = document.querySelector(".search-list");
  let htmlObj = "";
  results.forEach(result => {
    // console.log(result.name)
    htmlObj += `
    <li class="search-result-items">
      <a href="#">${result.name}</a>
    </li>
    `
  });
  searchList.innerHTML = htmlObj;
}

const getSearchResults = async (searchTerm) => {
  const apiKey = "2ad894c7bf2f44b4b52165812201208";
  const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${searchTerm}`;
  let response = await fetch(url);
  response = await response.json();
  // console.log(response);
  showSeachResults(response);
}

document.addEventListener("DOMContentLoaded", initWeather);

const search = document.querySelector("#city-input");
const searchList = document.querySelector(".search-list");
let searchBox = ""
search.addEventListener('focusin', () => {
  searchBox = search.value;
  search.value = "";  
})
search.addEventListener('focusout', () => {
  if (search.value === "") {
    search.value = searchBox;
  }
})

search.addEventListener('keyup', (e) => {
  if(search.value !== "" && e.key === "Enter") {
    getSearchResults(search.value)
  }
})

searchList.addEventListener('click', (e) => {
  const city = e.path[0].textContent;
  search.value = city;
  searchList.innerHTML ="";
  getWeatherbyName(city);
})
