const DailyForecastContainer = () => {
  const forecastByDaysData = [
    {
      day: 'Monday',
      icon: '/assets/images/icon-sunny.webp',
      high: '30°',
      low: '20°',
    },
    {
      day: 'Tuesday',
      icon: '/assets/images/icon-partly-cloudy.webp',
      high: '28°',
      low: '18°',
    },
    {
      day: 'Wednesday',
      icon: '/assets/images/icon-rain.webp',
      high: '25°',
      low: '15°',
    },
    {
      day: 'Thursday',
      icon: '/assets/images/icon-overcast.webp',
      high: '22°',
      low: '12°',
    },
    {
      day: 'Friday',
      icon: '/assets/images/icon-storm.webp',
      high: '20°',
      low: '10°',
    },
    {
      day: 'Saturday',
      icon: '/assets/images/icon-snow.webp',
      high: '18°',
      low: '8°',
    },
    {
      day: 'Sunday',
      icon: '/assets/images/icon-fog.webp',
      high: '15°',
      low: '5°',
    },
  ]

  return (
    <div className='gap-5 flex flex-col xl:max-w-[800px] w-full' data-testid='daily-forecast'>
      <p className='w-full items-start font-dm-sans font-semibold text-xl leading-[120%]'>
        Daily Forecast
      </p>
      <div className='flex gap-4 w-full flex-wrap'>
        {forecastByDaysData &&
          forecastByDaysData.map(({ day, icon, high, low }) => (
            <div
              className='flex flex-col flex-1 basis-0 gap-4 px-2.5 py-4 bg-neutral-800 border-neutral-600 border rounded-xl items-center max-md:min-w-[103.66px] max-md:max-w-[103.66px]'
              key={day}
            >
              <p className='font-dm-sans font-medium text-lg leading-[120%]'>{day.slice(0, 3)}</p>
              <img src={icon} alt='day-weather-icon' className='h-[3.75rem] w-[3.75rem]' />
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
