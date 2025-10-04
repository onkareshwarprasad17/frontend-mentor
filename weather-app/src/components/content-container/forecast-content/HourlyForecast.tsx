import { useMemo, useState } from 'react'
import { useWeatherContext } from '../../../context/WeatherContext'
import { formatHourlyWeatherData, getDayName, getWeatherIconFromCode } from '../../../lib/helpers'
import Button from '../../../ui/Button'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '../../../ui/Dropdown'
import { HourlyForecastItemSkeleton } from '../../../ui/Skeleton'

const HourlyForecast = () => {
  const { isLoading, weatherData } = useWeatherContext()
  const [currentDay, setCurrentDay] = useState(() => getDayName())

  /* TODO: Current Date values from current time
  const currentDateTimeString = new Date()
  const currentDateArray = weatherData?.hourly.time.filter((item) =>
    item.includes(currentDateTimeString.toISOString().split('T')[0])
  )

  const final = currentDateArray
    ?.filter((item) => new Date(item).getHours() > currentDateTimeString.getHours())
    .map((item) => new Date(item).toLocaleTimeString('en-IN'))
*/

  const hourlyForcastedData = useMemo(
    () => formatHourlyWeatherData(weatherData?.hourly),
    [weatherData?.hourly]
  )
  const days = Array.from(hourlyForcastedData.keys())
  const hourlyData = hourlyForcastedData.get(currentDay) || []

  return (
    <div
      data-testid='right-hourly-forecast'
      className='flex flex-col xl:max-w-96 w-full p-5 md:p-6 bg-neutral-800 rounded-[1.25rem] gap-4 max-h-[693px]'
    >
      {/* Header */}
      <div className='flex justify-between items-center'>
        <p className='font-dm-sans font-semibold text-xl leading-[120%]'>Hourly forecast</p>

        <Dropdown>
          <DropdownTrigger>
            <Button
              label={currentDay}
              icon='/assets/images/icon-units.svg'
              className='text-sm md:text-base'
              isDropdown
              variant='custom'
              variantColor='bg-neutral-600'
            />
          </DropdownTrigger>
          <DropdownMenu className='w-[13.2rem]'>
            {days.map((day) => (
              <DropdownItem onItemClick={() => setCurrentDay(day)} key={day}>
                <div className='py-2.5 px-2'>
                  <p className='text-neutral-0 text-base font-dm-sans font-medium leading-[120%]'>
                    {day}
                  </p>
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className='overflow-hidden overflow-y-scroll gap-4 flex flex-col scrollbar-hidden'>
        {isLoading && <HourlyForecastItemSkeleton />}

        {/* Forecast data */}
        {!!hourlyData &&
          hourlyData.map(({ hour, temp, weatherCode }) => (
            <div
              className='flex w-full py-2.5 pl-3 pr-4 gap-1 items-center bg-neutral-700 rounded-lg border-neutral-600 border'
              key={`${currentDay}-${hour}`}
            >
              <img
                src={`/assets/images/icon-${getWeatherIconFromCode(weatherCode)}.webp`}
                alt='hour-weather-icon'
                className='h-10 w-10'
              />
              <p className='font-dm-sans font-medium text-xl leading-[120%] flex-1 basis-0 text-left'>
                {hour}
              </p>
              <p className='font-dm-sans font-medium text-base leading-[120%]'>{temp}</p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default HourlyForecast
