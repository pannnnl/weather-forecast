//https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en)
async function getdata() {
  try {
    // API 嘅 URL
    let url =
      "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en";

    let res = await fetch(url);
    // console.log(res);
    if (res.status === 200) {
      const result = await res.json();
      let dataElement = document.getElementById("data");
      dataElement.innerHTML = ""; // make data = ""
      // loop show 9 day weather data
      for (let i = 0; i < result.weatherForecast.length; i++) {
        const forecast = result.weatherForecast[i]; // 拎當前嘅天氣預測
        const forecastDate = forecast.forecastDate; // 拎預測日期
        const getmaxTemp = forecast.forecastMaxtemp.value; // 拎maxTemp
        const getminTemp = forecast.forecastMintemp.value; //拎minTemp
        const getIcon = forecast.ForecastIcon; // 拎天氣圖 number
        // use for loop create button
        let button = document.createElement("button");
        button.textContent = forecastDate; //整每個日期出來個制
        button.style.display = "block"; // 令到每1個制DISPLAY垂直
        // 當我禁某個制 會發生既事
        button.onclick = function () {
          document.getElementById(
            "maxtemp"
          ).innerHTML = `Max Temperature: ${getmaxTemp}°C`;
          document.getElementById(
            "mintemp"
          ).innerHTML = `Min Temperature: ${getminTemp}°C`;
          //拎天氣圖ID
          const iconImg = document.getElementById("weatherIcon");
          iconImg.src = `png/pic${getIcon}.png`; // 根據轉換圖片
          iconImg.alt = `Weather Icon ${getIcon}`; // 圖片嘅替代文字
          iconImg.style.display = "block";
        };

        // 將個制加入DOM
        dataElement.appendChild(button);
      }
    }
  } catch (err) {
    console.log(err);
  }
}
// 用 getdata call action
document.addEventListener("DOMContentLoaded", function () {
  getdata();
});

favicon.ico;
