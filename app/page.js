"use client";
import { useState, useEffect } from "react";
import WeatherButton from "./components/WeatherButton";

export default function WeatherApp() {
  const [forecasts, setForecasts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    async function fetchData() {
      try {
        const url =
          "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=tc";
        const res = await fetch(url);
        const result = await res.json();
        setForecasts(result.weatherForecast);
        setSelected(result.weatherForecast[0]);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (!hasMounted) return null;

  if (loading)
    return (
      <div className="p-20 text-center text-slate-400">
        正在獲取天文台數據...
      </div>
    );

  return (
    // 強制設定為 w-full，避免被父組件限制寬度
    <div className="min-h-screen bg-[#f8fafc] w-full py-6 md:py-12">
      <div className="max-w-[1200px] mx-auto px-4">
        <h1 className="text-3xl font-black text-slate-800 mb-8 px-2">
          Show 9-day Weather
        </h1>

        {/* 核心佈局：確保在 lg 以上是 flex-row (左右) */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* 左側：捲動清單 (在電腦版固定寬度) */}
          <div className="w-full lg:w-[380px] shrink-0 space-y-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">
              未來九日預報
            </p>
            <div className="max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
              {forecasts.map((f, index) => (
                <WeatherButton
                  key={index}
                  forecast={f}
                  active={selected?.forecastDate === f.forecastDate}
                  onClick={() => setSelected(f)}
                />
              ))}
            </div>
          </div>

          {/* 右側：詳細資料 (在電腦版佔據剩餘空間) */}
          <div className="flex-1 w-full sticky top-8">
            {selected ? (
              <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-12 border border-slate-100">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                  <div>
                    <h2 className="text-5xl font-black text-slate-800 mb-2">
                      {selected.week}
                    </h2>
                    <p className="text-xl text-blue-500 font-semibold uppercase tracking-tighter">
                      {selected.forecastDate}
                    </p>
                  </div>
                  <img
                    src={`https://www.hko.gov.hk/images/wxicon/pic${selected.ForecastIcon}.png`}
                    alt="Weather Icon"
                    className="w-40 h-40 drop-shadow-2xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="bg-orange-50 border border-orange-100 p-8 rounded-[2rem] text-center">
                    <span className="text-orange-400 text-sm font-bold block mb-2">
                      最高氣溫
                    </span>
                    <span className="text-5xl font-black text-orange-600">
                      {selected.forecastMaxtemp.value}°C
                    </span>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 p-8 rounded-[2rem] text-center">
                    <span className="text-blue-400 text-sm font-bold block mb-2">
                      最低氣溫
                    </span>
                    <span className="text-5xl font-black text-blue-600">
                      {selected.forecastMintemp.value}°C
                    </span>
                  </div>
                </div>

                <div className="space-y-6 text-slate-700">
                  <div className="bg-slate-50 p-6 rounded-2xl">
                    <p className="text-sm font-bold text-slate-400 mb-2 uppercase">
                      詳細預報
                    </p>
                    <p className="text-xl leading-relaxed font-medium italic">
                      "{selected.forecastForecast}"
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 bg-white border border-slate-100 shadow-sm p-4 rounded-xl text-center">
                      <p className="text-xs text-slate-400 font-bold mb-1">
                        相對濕度
                      </p>
                      <p className="font-bold text-slate-800">
                        {selected.forecastMinrh.value}% -{" "}
                        {selected.forecastMaxrh.value}%
                      </p>
                    </div>
                    <div className="flex-1 bg-white border border-slate-100 shadow-sm p-4 rounded-xl text-center">
                      <p className="text-xs text-slate-400 font-bold mb-1">
                        風力預測
                      </p>
                      <p className="font-bold text-slate-800 text-sm">
                        {selected.forecastWind}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[400px] flex items-center justify-center border-2 border-dashed border-slate-200 rounded-[2.5rem] text-slate-400 font-bold">
                請選擇日期以查看詳細天氣資訊
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
