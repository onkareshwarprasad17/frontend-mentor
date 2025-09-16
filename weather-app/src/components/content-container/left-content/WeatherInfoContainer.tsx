import WeatherDetails from './WeatherDetails'
import WeatherInfo from './WeatherInfo'

const WeatherInfoContainer = () => {
  return (
    <div
      className='flex flex-col gap-5 lg:gap-8 w-full items-center'
      data-testid='weather-info-container'
    >
      <WeatherInfo />
      <WeatherDetails />
    </div>
  )
}

export default WeatherInfoContainer
