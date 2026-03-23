export default function WeatherButton({ forecast, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-5 text-left rounded-2xl transition-all duration-300 border mb-2 flex items-center justify-between group ${
        active
          ? "bg-white shadow-[0_10px_30px_rgba(59,130,246,0.15)] border-blue-500 ring-2 ring-blue-500/10 scale-[1.02]"
          : "bg-white/50 border-transparent hover:border-slate-300 hover:bg-white"
      }`}
    >
      <div className="flex items-center gap-4">
        <img
          src={`https://www.hko.gov.hk/images/wxicon/pic${forecast.ForecastIcon}.png`}
          alt="icon"
          className="w-10 h-10 object-contain"
        />
        <div>
          <p className="text-[10px] font-bold text-slate-400">
            {forecast.forecastDate}
          </p>
          <p
            className={`text-lg font-black ${active ? "text-blue-600" : "text-slate-700"}`}
          >
            {forecast.week}
          </p>
        </div>
      </div>
      <div className="text-right">
        <span className="text-lg font-black text-slate-800">
          {forecast.forecastMaxtemp.value}°
        </span>
        <span className="text-sm text-slate-400 ml-1">
          / {forecast.forecastMintemp.value}°
        </span>
      </div>
    </button>
  );
}
