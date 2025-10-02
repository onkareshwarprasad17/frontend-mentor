import { createContext, useCallback, useContext, useState } from 'react'
import { type Location, useLocation } from '../hooks/useLocation'
import useQuery from '../hooks/useQuery'
import { baseLocation, type WeatherData } from '../lib/constants'
import { getWeatherData } from '../lib/helpers'

interface WeatherContextType {
  unit: 'celsius' | 'fahrenheit'
  setUnit: React.Dispatch<React.SetStateAction<'celsius' | 'fahrenheit'>>
  toggleUnit: () => void
  weatherData: WeatherData | null
  isLoading: boolean
  error: string | null
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
  const { geoLocation } = useLocation()

  const [selectedLocation, setSelectedLocation] = useState<Location>(baseLocation.location)
  const locationToSearch = selectedLocation.latitude !== 0 ? selectedLocation : geoLocation.location
  const status = useQuery(getWeatherData, [unit, locationToSearch])

  const handleSearchedLocation = useCallback(
    (location: Location) => {
      console.log('handleSearchLocation called', location, unit, selectedLocation)
      setSelectedLocation(location)
    },
    [unit, selectedLocation]
  )

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
        handleSearch: handleSearchedLocation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}

// TODO: Update eslint rule
// eslint-disable-next-line react-refresh/only-export-components
export { useWeatherContext, WeatherContextProvider }
