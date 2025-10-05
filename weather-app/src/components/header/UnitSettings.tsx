import { useWeatherContext } from '../../context/WeatherContext'
import Button from '../../ui/Button'
import {
  Dropdown,
  DropdownGroupItem,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '../../ui/Dropdown'

const UnitSettings = () => {
  const { toggleUnit, unit, error, isLoading } = useWeatherContext()

  return (
    !error?.length &&
    !isLoading && (
      <Dropdown>
        <DropdownTrigger>
          <Button
            label='Units'
            icon='/assets/images/icon-units.svg'
            className='text-sm md:text-base py-2 px-2.5 md:py-3 md:px-4'
            isDropdown
          />
        </DropdownTrigger>
        <DropdownMenu className='w-[13.2rem]'>
          <DropdownItem onItemClick={toggleUnit}>
            <div className='py-2.5 px-2'>
              <p className='text-neutral-0 text-base font-dm-sans font-medium leading-[120%]'>
                Switch to {unit === 'celsius' ? 'Imperial' : 'Metric'}
              </p>
            </div>
          </DropdownItem>

          <DropdownGroupItem
            header={
              <p className='px-2 pt-1.5 text-neutral-300 text-base font-dm-sans font-medium leading-[120%]'>
                Temperature
              </p>
            }
          >
            <DropdownItem>
              <div className='flex justify-between px-2 py-2.5'>
                <button className='text-neutral-0 font-dm-sans font-medium text-base leading-[120%]'>
                  Celsius (&deg;C)
                </button>
                {unit === 'celsius' && (
                  <img src={'/assets/images/icon-checkmark.svg'} alt='dropdown-item-icon' />
                )}
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className='flex justify-between px-2 py-2.5'>
                <button className='text-neutral-0 font-dm-sans font-medium text-base leading-[120%]'>
                  Fahrenheit (&deg;F)
                </button>
                {unit === 'fahrenheit' && (
                  <img src={'/assets/images/icon-checkmark.svg'} alt='dropdown-item-icon' />
                )}
              </div>
            </DropdownItem>
          </DropdownGroupItem>

          <DropdownGroupItem
            header={
              <p className='px-2 pt-1.5 text-neutral-300 text-base font-dm-sans font-medium leading-[120%]'>
                Windspeed
              </p>
            }
          >
            <DropdownItem>
              <div className='flex justify-between px-2 py-2.5'>
                <button className='text-neutral-0 font-dm-sans font-medium text-base leading-[120%]'>
                  km/h
                </button>
                {unit === 'celsius' && (
                  <img src={'/assets/images/icon-checkmark.svg'} alt='dropdown-item-icon' />
                )}
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className='flex justify-between px-2 py-2.5'>
                <button className='text-neutral-0 font-dm-sans font-medium text-base leading-[120%]'>
                  mph
                </button>
                {unit === 'fahrenheit' && (
                  <img src={'/assets/images/icon-checkmark.svg'} alt='dropdown-item-icon' />
                )}
              </div>
            </DropdownItem>
          </DropdownGroupItem>

          <DropdownGroupItem
            header={
              <p className='px-2 pt-1.5 text-neutral-300 text-base font-dm-sans font-medium leading-[120%]'>
                Preciptation
              </p>
            }
          >
            <DropdownItem>
              <div className='flex justify-between px-2 py-2.5'>
                <button className='text-neutral-0 font-dm-sans font-medium text-base leading-[120%]'>
                  Millimeters (mm)
                </button>
                {unit === 'celsius' && (
                  <img src={'/assets/images/icon-checkmark.svg'} alt='dropdown-item-icon' />
                )}
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className='flex justify-between px-2 py-2.5'>
                <button className='text-neutral-0 font-dm-sans font-medium text-base leading-[120%]'>
                  Inches (in)
                </button>
                {unit === 'fahrenheit' && (
                  <img src={'/assets/images/icon-checkmark.svg'} alt='dropdown-item-icon' />
                )}
              </div>
            </DropdownItem>
          </DropdownGroupItem>
        </DropdownMenu>
      </Dropdown>
    )
  )
}

export default UnitSettings
