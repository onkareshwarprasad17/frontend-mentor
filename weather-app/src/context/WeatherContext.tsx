import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { type Location, useLocation } from '../hooks/useLocation'
import useQuery from '../hooks/useQuery'
import { type WeatherData } from '../lib/constants'
import { getLocationName, getWeatherData } from '../lib/helpers'

interface WeatherContextType {
  unit: 'celsius' | 'fahrenheit'
  setUnit: React.Dispatch<React.SetStateAction<'celsius' | 'fahrenheit'>>
  toggleUnit: () => void
  weatherData: WeatherData | null
  isLoading: boolean
  error: string | undefined
  locationName: string
  handleSearch: (location: Location) => void
}

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
  const { location } = useLocation()

  const [selectedLocation, setSelectedLocation] = useState<Location>(location)
  const [locationName, setLocatioName] = useState<string>('')

  const status = useQuery(getWeatherData, [unit, selectedLocation])
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [weatherError, setWeatherError] = useState<Error>()

  const handleSearchedLocation = useCallback((location: Location) => {
    setSelectedLocation(location)
  }, [])

  useEffect(() => {
    if (status.status === 'success') {
      setWeatherData(status.data)
    } else if (status.status === 'error') {
      setWeatherError(status.error)
    }
  }, [status])

  useEffect(() => {
    async function fetchLocatioName(location: Location) {
      const locationName = await getLocationName(location)
      if (locationName.indexOf('Error')) {
        setWeatherError({ message: 'Error fetching the current location!', name: 'error' })
      }
      setLocatioName(locationName)
    }
    if (location.longitude !== 0) {
      fetchLocatioName(location)
      setSelectedLocation(location)
    }
  }, [location, setSelectedLocation])

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'celsius' ? 'fahrenheit' : 'celsius'))
  }

  const value = useMemo(
    () => ({
      unit,
      setUnit,
      toggleUnit,
      weatherData: weatherData,
      isLoading: status.status === 'loading',
      error: weatherError?.message,
      handleSearch: handleSearchedLocation,
      locationName,
    }),
    [unit, weatherData, status.status, weatherError?.message, handleSearchedLocation, locationName]
  )

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
}

// TODO: Update eslint rule
// eslint-disable-next-line react-refresh/only-export-components
export { useWeatherContext, WeatherContextProvider }
