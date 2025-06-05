import { useState } from 'preact/hooks'
import CityForm from './components/CityForm.jsx'
import CityList from './components/CityList.jsx'
import QuoteOfTheDay from './components/QuoteOfTheDay.jsx'
import TimeNow from './components/TimeNow.jsx'

export default function App() {
  const [refresh, setRefresh] = useState(false)

  const handleCityAdded = () => {
    setRefresh(prev => !prev)
  }

  return (
    <>
      <style>
        {`
          main {
            min-height: 100vh;
            padding: 2rem;
            background: linear-gradient(90deg, #6b21a8, #db2777, #ef4444);
            color: white;
            font-family: Arial, sans-serif;
          }
          h1 {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 2.5rem;
            text-align: center;
            text-shadow: 0 2px 6px rgba(0,0,0,0.5);
            letter-spacing: 0.05em;
          }
          section.form-wrapper {
            max-width: 450px;
            margin: 0 auto 3rem auto;
            background: rgba(255,255,255,0.2);
            backdrop-filter: blur(10px);
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            border: 1px solid rgba(255,255,255,0.3);
          }
          section.list-wrapper {
            max-width: 900px;
            margin: 0 auto;
          }
        `}
      </style>

      <main>
        <TimeNow />
        <h1>Weather Dashboard</h1>

        <section class="form-wrapper">
          <CityForm onCityAdded={handleCityAdded} />
        </section>

        <section class="list-wrapper">
          <CityList key={refresh} />
        </section>

        <QuoteOfTheDay />
      </main>
    </>
  )
}
