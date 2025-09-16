import HourlyForecast from './forecast-content/HourlyForecast'
import LeftContent from './left-content/LeftContent'

const ContentContainer = () => {
  return (
    <div className='flex flex-col gap-8 xl:flex-row w-full' data-testid='content-container'>
      <LeftContent />

      <HourlyForecast />
    </div>
  )
}

export default ContentContainer
