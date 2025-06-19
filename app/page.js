"use client"; // 標記為 Client Component，因為要用 useState 同 useEffect

import { useState, useEffect } from "react";
import Image from "next/image";
import WeatherButton from "./components/WeatherButton";

export default function Home() {
  const [weatherData, setWeatherData] = useState([]);
  const [maxTemp, setMaxTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [icon, setIcon] = useState("");

  // 喺組件載入時搵數據
  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch("/api/weather");
        if (res.ok) {
          const data = await res.json();
          setWeatherData(data);
        } else {
          console.error("搵天氣數據失敗");
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchWeather();
  }, []);

  // 處理按鈕點擊
  const handleButtonClick = (maxTemp, minTemp, icon) => {
    setMaxTemp(maxTemp);
    setMinTemp(minTemp);
    setIcon(icon);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* 左邊：日期按鈕列表 */}
      <div>
        {weatherData.length > 0 ? (
          weatherData.map((forecast, index) => (
            <WeatherButton
              key={index}
              forecast={forecast}
              onClick={handleButtonClick}
            />
          ))
        ) : (
          <p>載入中...</p>
        )}
      </div>

      {/* 右邊：天氣詳情 */}
      <div className="text-center">
        {maxTemp && <p className="text-xl">最高溫：{maxTemp}°C</p>}
        {minTemp && <p className="text-xl">最低溫：{minTemp}°C</p>}
        {icon && (
          <Image
            src={`/png/pic${icon}.png`}
            alt={`天氣圖標 ${icon}`}
            width={100}
            height={100}
            className="mx-auto mt-4"
          />
        )}
      </div>
    </div>
  );
}
