import { createContext, useContext, useEffect, useState } from 'react'

interface WeatherContextType {
  unit: 'celsius' | 'fahrenheit'
  setUnit: React.Dispatch<React.SetStateAction<'celsius' | 'fahrenheit'>>
  toggleUnit: () => void
  weatherData: WeatherData
  isLoading: boolean
  error: string | null
}

type WeatherData = {
  current: {
    temperature: number
    apparent_temperature: number
    humidity: number
    wind_speed: number
    precipitation: number
  }
  currentUnits: {
    temperature: string
    apparent_temperature: string
    humidity: string
    wind_speed: string
    precipitation: string
  }
} | null

const WeatherContext = createContext<WeatherContextType | null>(null)

const useWeatherContext = () => {
  const context = useContext(WeatherContext)

  if (!context) {
    throw new Error('useWeatherContext must be used within a WeatherProvider')
  }

  return context
}

const WeatherContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [unit, setUnit] = useState<WeatherContextType['unit']>('celsius')
  const [weatherData, setWeatherData] = useState<WeatherData>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'celsius' ? 'fahrenheit' : 'celsius'))
  }

  useEffect(() => {
    async function fetchWeatherData() {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,apparent_temperature&timezone=auto',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
          }
        )

        const data = await response.json()

        const parsedWeatherData = {
          current: {
            temperature: data.current.temperature_2m,
            apparent_temperature: data.current.apparent_temperature,
            humidity: data.current.relative_humidity_2m,
            wind_speed: data.current.wind_speed_10m,
            precipitation: data.current.precipitation,
          },
          currentUnits: {
            temperature: data.current_units.temperature_2m,
            apparent_temperature: data.current_units.apparent_temperature,
            humidity: data.current_units.relative_humidity_2m,
            wind_speed: data.current_units.wind_speed_10m,
            precipitation: data.current_units.precipitation,
          },
        }
        console.log('data in context', data)
        setWeatherData(parsedWeatherData)
      } catch (error) {
        setError(`Failed to fetch weather data - ${error}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWeatherData()
  }, [unit, setIsLoading, setError, setWeatherData])

  return (
    <WeatherContext.Provider value={{ unit, setUnit, toggleUnit, weatherData, isLoading, error }}>
      {children}
    </WeatherContext.Provider>
  )
}

// TODO: Update eslint rule
// eslint-disable-next-line react-refresh/only-export-components
export { useWeatherContext, WeatherContextProvider }
