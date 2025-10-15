import Logo from '../../ui/Logo'
import UnitSettings from './UnitSettings'

const Header = () => {
  return (
    <header className='flex items-end justify-between pt-4 md:pt-6'>
      {/* Units Switch to Imperial/Metric Temperature Celsius (°C) Fahrenheit (°F)
      Wind Speed km/h mph Precipitation Millimeters (mm) Inches (in) */}

      <Logo />
      <UnitSettings />
    </header>
  )
}

export default Header
