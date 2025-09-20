import Button from '../../../ui/Button'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '../../../ui/Dropdown'

const HourlyForecast = () => {
  const forecastByHourData = [
    {
      time: '3 PM',
      icon: '/assets/images/icon-overcast.webp',
      temp: '20°',
    },
    {
      time: '4 PM',
      icon: '/assets/images/icon-sunny.webp',
      temp: '28°',
    },
    {
      time: '5 PM',
      icon: '/assets/images/icon-rain.webp',
      temp: '30°',
    },
    {
      time: '6 PM',
      icon: '/assets/images/icon-partly-cloudy.webp',
      temp: '25°',
    },
    {
      time: '7 PM',
      icon: '/assets/images/icon-snow.webp',
      temp: '36°',
    },
    {
      time: '8 PM',
      icon: '/assets/images/icon-storm.webp',
      temp: '22°',
    },
    {
      time: '9 PM',
      icon: '/assets/images/icon-fog.webp',
      temp: '34°',
    },
    {
      time: '10 PM',
      icon: '/assets/images/icon-drizzle.webp',
      temp: '18°',
    },
  ]

  return (
    <div
      data-testid='right-hourly-forecast'
      className='flex flex-col xl:max-w-96 w-full p-5 md:p-6 bg-neutral-800 rounded-[1.25rem] gap-4'
    >
      {/* Header */}
      <div className='flex justify-between items-center'>
        <p className='font-dm-sans font-semibold text-xl leading-[120%]'>Hourly forecast</p>

        <Dropdown>
          <DropdownTrigger>
            <Button
              label='Tuesday'
              icon='/assets/images/icon-units.svg'
              className='text-sm md:text-base'
              isDropdown
              variant='custom'
              variantColor='bg-neutral-600'
            />
          </DropdownTrigger>
          <DropdownMenu className='w-[13.2rem]'>
            <DropdownItem>
              <div className='py-2.5 px-2'>
                <p className='text-neutral-0 text-base font-dm-sans font-medium leading-[120%]'>
                  Monday
                </p>
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className='py-2.5 px-2'>
                <p className='text-neutral-0 text-base font-dm-sans font-medium leading-[120%]'>
                  Tuesday
                </p>
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className='py-2.5 px-2'>
                <p className='text-neutral-0 text-base font-dm-sans font-medium leading-[120%]'>
                  Wednesday
                </p>
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className='py-2.5 px-2'>
                <p className='text-neutral-0 text-base font-dm-sans font-medium leading-[120%]'>
                  Thursday
                </p>
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className='py-2.5 px-2'>
                <p className='text-neutral-0 text-base font-dm-sans font-medium leading-[120%]'>
                  Friday
                </p>
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className='py-2.5 px-2'>
                <p className='text-neutral-0 text-base font-dm-sans font-medium leading-[120%]'>
                  Saturday
                </p>
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className='py-2.5 px-2'>
                <p className='text-neutral-0 text-base font-dm-sans font-medium leading-[120%]'>
                  Sunday
                </p>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Forecast data */}
      {forecastByHourData &&
        forecastByHourData.map(({ time, icon, temp }) => (
          <div
            className='flex w-full py-2.5 pl-3 pr-4 gap-1 items-center bg-neutral-700 rounded-lg border-neutral-600 border'
            key={time}
          >
            <img src={icon} alt='hour-weather-icon' className='h-10 w-10' />
            <p className='font-dm-sans font-medium text-xl leading-[120%] flex-1 basis-0 text-left'>
              {time}
            </p>
            <p className='font-dm-sans font-medium text-base leading-[120%]'>{temp}</p>
          </div>
        ))}
    </div>
  )
}

export default HourlyForecast
