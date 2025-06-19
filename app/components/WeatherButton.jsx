export default function WeatherButton({ forecast, onClick }) {
  const { forecastDate, forecastMaxtemp, forecastMintemp, ForecastIcon } =
    forecast;

  return (
    <button
      onClick={() =>
        onClick(forecastMaxtemp.value, forecastMintemp.value, ForecastIcon)
      }
      className="w-full p-4 mb-2 text-left bg-gray-100 rounded-lg hover:bg-gray-200 transition"
    >
      {forecastDate}
    </button>
  );
}
