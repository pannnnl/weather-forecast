export async function GET() {
  try {
    const res = await fetch(
      "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en",
      { cache: "no-store" } // 確保唔用緩存，搵最新數據
    );
    if (!res.ok) {
      throw new Error("搵數據失敗");
    }
    const data = await res.json();
    return Response.json(data.weatherForecast);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
