let weather = {
  openweatherapikey: "4b879520f2aa4c72f29412a4694e4005",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.openweatherapikey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp-number").innerText = Math.round(temp);
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " mph";
    document.querySelector(".weather").classList.remove("loading");
    background.fetchBackground(name);
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

let background = {
  unsplashApiKey: "dT1iy68_jAh2mRVEvz9MBxGqwn0CCf6BNIB8MUnITcU",
  fetchBackground: function (city) {
    fetch(
      "https://api.unsplash.com/search/photos/?query=" +
        city +
        "&client_id=" +
        this.unsplashApiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayBackground(data));
  },
  displayBackground: function (data) {
    let randomNumber = Math.trunc(Math.random() * 6);

    const { total } = data;
    let foundPics = total;

    if (foundPics === 0) {
      document.body.style.backgroundImage =
        "url(https://source.unsplash.com/1600x900/?landscape)";
    } else {
      const { regular } = data.results[randomNumber].urls;
      document.body.style.backgroundImage = "url(" + regular + ")";
    }
  },
};

document.querySelector(".search-btn").addEventListener("click", function () {
  weather.search();
  //   background.set();
});
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      weather.search();
      //   background.set();
    }
  });

weather.fetchWeather("Camano");
