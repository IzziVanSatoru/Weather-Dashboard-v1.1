import { useState } from 'preact/hooks'

export default function WeatherCard({ city, country }) {
  // Data dummy cuaca statis
  const dummyWeather = {
    temperature: 28,
    condition: 'Sunny',
    humidity: 60,
  }

  return (
    <>
      <style>{`
        .card {
          width: 220px;
          background: linear-gradient(145deg, #e0e0e0, #ffffff);
          border-radius: 16px;
          box-shadow:
            8px 8px 15px #bebebe,
            -8px -8px 15px #ffffff;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          user-select: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .card:hover {
          transform: translateY(-6px);
          box-shadow:
            12px 12px 20px #b1b1b1,
            -12px -12px 20px #ffffff;
        }

        .city {
          font-weight: 700;
          font-size: 1.25rem;
          margin-bottom: 12px;
          text-align: center;
          text-shadow: 0 1px 1px rgba(0,0,0,0.1);
        }

        .weather-info {
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .weather-info p {
          margin: 6px 0;
          display: flex;
          justify-content: space-between;
        }

        .label {
          font-weight: 600;
          color: #555;
        }

        .value {
          font-weight: 700;
          color: #1a73e8;
          text-shadow: 0 0 3px rgba(26, 115, 232, 0.6);
        }
      `}</style>

      <div className="card" role="region" aria-label={`Weather information for ${city}, ${country}`}>
        <div className="city">{city}, {country}</div>
        <div className="weather-info">
          <p><span className="label">Temp:</span> <span className="value">{dummyWeather.temperature}°C</span></p>
          <p><span className="label">Condition:</span> <span className="value">{dummyWeather.condition}</span></p>
          <p><span className="label">Humidity:</span> <span className="value">{dummyWeather.humidity}%</span></p>
        </div>
      </div>
    </>
  )
}
