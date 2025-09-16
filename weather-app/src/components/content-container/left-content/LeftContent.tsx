import DailyForecastContainer from './DailyForecastContainer'
import WeatherInfoContainer from './WeatherInfoContainer'

const LeftContent = () => {
  return (
    <div
      className='gap-8 lg:gap-12 flex flex-col xl:max-w-[800px] w-full'
      data-testid='left-content'
    >
      <WeatherInfoContainer />
      <DailyForecastContainer />
    </div>
  )
}

export default LeftContent
