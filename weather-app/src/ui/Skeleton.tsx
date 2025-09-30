export const DailyForecastContainerSkeleton = () => {
  return (
    <>
      {Array.from({ length: 7 }, (_, index) => (
        <div
          className='h-40 flex flex-col flex-1 basis-0 gap-4 px-2.5 py-4 bg-neutral-800 border-neutral-600 border rounded-xl items-center max-md:min-w-[103.66px] max-md:max-w-[103.66px]'
          key={index}
        >
          <p className='h-[120%]' />
          {/* <img src={icon} alt='day-weather-icon' className='h-[3.75rem] w-[3.75rem]' /> */}
          <div className='flex justify-between items-center w-full'>
            <p className='h-[120%]' />
            <p className='h-[120%]' />
          </div>
        </div>
      ))}
    </>
  )
}

export const HourlyForecastItemSkeleton = () => {
  return (
    <>
      {Array.from({ length: 8 }, (_, index) => (
        <div
          className='py-2.5 h-[60px] w-full pl-3 pr-4 items-center bg-neutral-700 rounded-lg border-neutral-600 border'
          key={index}
        ></div>
      ))}
    </>
  )
}
