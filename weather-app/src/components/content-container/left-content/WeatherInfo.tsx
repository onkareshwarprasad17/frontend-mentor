import { useWeatherContext } from '../../../context/WeatherContext'
import { getWeatherIconFromCode } from '../../../lib/helpers'
import { WeatherInfoSkeleton } from '../../../ui/Skeleton'

const WeatherInfo = ({ location }: { location: { name: string } }) => {
  const { isLoading, weatherData } = useWeatherContext()

  return (
    <div
      className={`relative overflow-hidden h-[286px] w-full rounded-[20px] ${isLoading ? '' : 'bg-[url(/assets/images/bg-today-small.svg)] md:bg-[url(/assets/images/bg-today-large.svg)] px-6 py-20'} bg-cover bg-center`}
      data-testid='weather-info'
    >
      {isLoading ? (
        <WeatherInfoSkeleton />
      ) : (
        <div className='flex flex-col gap-4 md:flex-row items-center justify-center md:justify-between'>
          {/* Location Info */}
          <div className='flex flex-col gap-3 text-center max-md:-top-[2.6rem] relative max-w-[373px] md:text-left'>
            <h2
              className='font-dm-sans font-bold text-[28px] leading-[120%]'
              aria-label='Berling, Germany'
            >
              {location.name}
            </h2>
            <p className='font-dm-sans font-medium text-lg leading-[120%]'>
              {weatherData?.current.currentDate}
            </p>
          </div>

          {/* Temperature Info */}
          <div className='flex items-center max-md:justify-center gap-5 max-md:-top-[2.6rem] relative'>
            <img
              src={`/assets/images/icon-${getWeatherIconFromCode(weatherData?.current.weatherCode ?? 0)}.webp`}
              alt='temperature-icon'
              className='w-[7.5rem] h-[7.5rem]'
            />
            <p className='font-dm-sans font-semibold italic leading-none -tracking-[2px] xl:text-8xl lg:text-6xl text-5xl'>
              {weatherData?.current.temperature} {weatherData?.currentUnits.temperature}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default WeatherInfo
