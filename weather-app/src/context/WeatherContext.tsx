import { createContext, useContext, useState } from 'react'
import { getFormattedDate } from '../helpers/getFormattedDate'
import useQuery from '../hooks/useQuery'

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
    currentDate: string
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

const getWeatherData = async () => {
  const response = await fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m&timezone=auto',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    }
  )

  const data = await response.json()

  const parsedData: WeatherData = {
    current: {
      currentDate: getFormattedDate(data.current.time),
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
  return parsedData
}

const WeatherContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [unit, setUnit] = useState<WeatherContextType['unit']>('celsius')
  const status = useQuery(getWeatherData, [unit])

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'celsius' ? 'fahrenheit' : 'celsius'))
  }

  return (
    <WeatherContext.Provider
      value={{
        unit,
        setUnit,
        toggleUnit,
        weatherData: status.status === 'success' ? status.data : null,
        isLoading: status.status === 'loading',
        error: status.status === 'error' ? status.error.message : null,
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}

// TODO: Update eslint rule
// eslint-disable-next-line react-refresh/only-export-components
export { useWeatherContext, WeatherContextProvider }
