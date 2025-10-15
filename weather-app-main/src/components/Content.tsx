import { useEffect, useState } from 'react'
import { useWeatherContext } from '../context/WeatherContext'
import Error from '../ui/Error'
import HourlyForecast from './content-container/forecast-content/HourlyForecast'
import DailyForecastContainer from './content-container/left-content/DailyForecastContainer'
import WeatherDetails from './content-container/left-content/WeatherDetails'
import WeatherInfo from './content-container/left-content/WeatherInfo'
import SearchContainer from './search-container/SearchContainer'

const Content = () => {
  const { locationName: locName, error } = useWeatherContext()
  const [locationName, setLocationName] = useState<string>('')

  useEffect(() => {
    if (locName) {
      setLocationName(locName)
    }
  }, [locName])

  if (error) {
    return <Error message={error} />
  }

  return (
    <>
      <SearchContainer onSelectLocation={(name: string) => setLocationName(name)} />
      <div className='flex flex-col gap-8 xl:flex-row w-full' data-testid='content-container'>
        <div
          className='gap-8 lg:gap-12 flex flex-col xl:max-w-[800px] w-full'
          data-testid='left-content'
        >
          <div
            className='flex flex-col gap-5 lg:gap-8 w-full items-center'
            data-testid='weather-info-container'
          >
            <WeatherInfo location={{ name: locationName }} />
            <WeatherDetails />
          </div>
          <DailyForecastContainer />
        </div>

        <HourlyForecast />
      </div>
    </>
  )
}

export default Content
