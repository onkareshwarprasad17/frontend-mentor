import { useWeatherContext } from '../../../context/WeatherContext'

const WeatherDetails = () => {
  const { weatherData, isLoading } = useWeatherContext()
  console.log('isLoading in WeatherDetails', isLoading)
  const displayValues = [
    {
      label: 'Feels Like',
      value: `${isLoading ? '--' : weatherData?.current.apparent_temperature}°`,
    }, // Need to check how to render the degree symbol
    { label: 'Humidity', value: `${weatherData?.current.humidity}%` },
    {
      label: 'Wind',
      value: `${weatherData?.current.wind_speed} ${weatherData?.currentUnits.wind_speed}`,
    },
    {
      label: 'Precipitation',
      value: `${weatherData?.current.precipitation} ${weatherData?.currentUnits.precipitation}`,
    },
  ]

  // if (isLoading) {
  //   return <div>Loading weather details...</div>
  // }

  return (
    <div
      className='flex flex-wrap justify-center gap-4 md:gap-4 lg:gap-6 w-full'
      data-testid='weather-details'
    >
      <p>{JSON.stringify(weatherData)}</p>
      {displayValues.map(({ label, value }, index) => (
        <div
          key={index}
          className='flex flex-col items-start p-5 bg-neutral-800 border-neutral-600 border-[1px] rounded-xl min-w-[150px] flex-1 basis-0 gap-6'
        >
          <p
            aria-label={label}
            className='font-dm-sans font-medium text-lg leading-[120%] text-neutral-200'
          >
            {label}
          </p>
          <p className='text-neutral-0 font-dm-sans font-light text-[2rem] leading-[100%]'>
            {value}
          </p>
        </div>
      ))}
    </div>
  )
}

export default WeatherDetails
