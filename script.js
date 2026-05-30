const searchButton = document.getElementById("search-btn");
const input = document.getElementById("search");
const weatherContainer = document.querySelector(".weather-container");

const elementCreation = (temp, location, date, time, imgIcon, weatherText) => {
  const img = document.createElement("img");
  const weatherInfo = document.createElement("span");
  const spanTemp = document.createElement("span");
  const spanLocation = document.createElement("span");
  const dateTime = document.createElement("span");
  img.src = imgIcon;
  weatherInfo.textContent = `
    ${weatherText}
  `;
  spanTemp.textContent = `
    ${temp}°C
  `;
  spanLocation.textContent = `
    ${location}
  `;
  dateTime.textContent = `
    ${time} ${date}
  `;
  weatherContainer.append(img, weatherInfo, spanTemp, spanLocation, dateTime);
};

const updateDom = (data) => {
  if (weatherContainer.hasChildNodes) {
    weatherContainer.replaceChildren();
  }
  const temp = data.current.temp_c;
  const location = data.location.name;
  const [date, time] = data.location.localtime.split(" ");
  console.log;
  const imgIcon = data.current.condition.icon;
  const weatherText = data.current.condition.text;
  elementCreation(temp, location, date, time, imgIcon, weatherText);
};

const weatherInput = async () => {
  // removes spaces from beginning and the end.
  const location = input.value.trim();
  if (location) {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=0bc40fe4d4ac48f18a192003262905&q=${location}&aqi=no`,
    );
    if (response.status === 200) {
      const data = await response.json();
      updateDom(data);
    }
  }
};

searchButton.addEventListener("click", weatherInput);
