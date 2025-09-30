import { useWeatherContext } from '../../../context/WeatherContext'
import { getWeatherIconFromCode } from '../../../lib/helpers'
import { DailyForecastContainerSkeleton } from '../../../ui/Skeleton'

const DailyForecastContainer = () => {
  const { isLoading, weatherData } = useWeatherContext()

  return (
    <div className='gap-5 flex flex-col xl:max-w-[800px] w-full' data-testid='daily-forecast'>
      <p className='w-full items-start font-dm-sans font-semibold text-xl leading-[120%]'>
        Daily Forecast
      </p>
      <div className='flex gap-4 w-full flex-wrap'>
        {isLoading && <DailyForecastContainerSkeleton />}

        {weatherData?.forecastByDaysData.map(({ day, high, low, icon }) => (
          <div
            className='flex flex-col flex-1 basis-0 gap-4 px-2.5 py-4 bg-neutral-800 border-neutral-600 border rounded-xl items-center max-md:min-w-[103.66px] max-md:max-w-[103.66px]'
            key={day}
          >
            <p className='font-dm-sans font-medium text-lg leading-[120%]'>{day}</p>
            <img
              src={`/assets/images/icon-${getWeatherIconFromCode(icon)}.webp`}
              alt='day-weather-icon'
              className='h-[3.75rem] w-[3.75rem]'
            />
            <div className='flex justify-between items-center w-full'>
              <p className='font-dm-sans font-medium text-base leading-[120%]'>{low}</p>
              <p className='font-dm-sans font-medium text-base leading-[120%]'>{high}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DailyForecastContainer
