import { useState, useEffect } from "react";

const WeatherWidget = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState<{ temp: number; code: number } | null>(
    null,
  );
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [geoError, setGeoError] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError(true);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => setGeoError(true),
      { enableHighAccuracy: false, timeout: 5000 },
    );
  }, []);

  useEffect(() => {
    if (!location) return;
    const { lat, lon } = location;
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.current_weather) {
          setWeather({
            temp: data.current_weather.temperature,
            code: data.current_weather.weathercode,
          });
        }
      })
      .catch(() => {});
  }, [location]);

  const weatherIcon = (code: number) => {
    if (code <= 3) return "☀️";
    if (code <= 48) return "⛅";
    if (code <= 57) return "🌧️";
    if (code <= 67) return "🌨️";
    return "☁️";
  };

  return (
    <div
      className="desktop-widget absolute top-12 right-4 z-10 select-none
      bg-black/40 backdrop-blur-md border border-white/[0.08] rounded-2xl
      px-5 py-2.5 flex items-center gap-4 text-white/80"
    >
      <div className="text-right">
        <div className="text-sm font-medium font-mono leading-tight">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
        <div className="text-[10px] text-white/40 font-mono">
          {time.toLocaleDateString([], {
            weekday: "short",
            day: "numeric",
            month: "short",
          })}
        </div>
      </div>
      {weather && (
        <div className="flex items-center gap-1.5 border-l border-white/[0.08] pl-3">
          <span className="text-lg">{weatherIcon(weather.code)}</span>
          <span className="text-sm font-mono">{weather.temp}°C</span>
        </div>
      )}
      {geoError && !weather && (
        <div className="text-[10px] text-white/40 pl-3 border-l border-white/[0.08]">
          Ubicación no disponible
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
