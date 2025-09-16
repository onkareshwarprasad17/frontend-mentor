const WeatherInfo = () => {
  return (
    <div
      className='px-6 py-20 relative overflow-hidden h-[286px] w-full rounded-[20px] bg-[url(/assets/images/bg-today-small.svg)] bg-cover bg-center md:bg-[url(/assets/images/bg-today-large.svg)]'
      data-testid='weather-info'
    >
      <div className='flex flex-col gap-4 md:flex-row items-center justify-center md:justify-between'>
        {/* Location Info */}
        <div className='flex flex-col gap-3 text-center max-md:-top-[2.6rem] relative max-w-[373px] md:text-left'>
          <h2
            className='font-dm-sans font-bold text-[28px] leading-[120%]'
            aria-label='Berling, Germany'
          >
            Berling, Germany
          </h2>
          <p className='font-dm-sans font-medium text-lg leading-[120%]'>Monday, 23 Feb 2023</p>
        </div>

        {/* Temperature Info */}
        <div className='flex items-center max-md:justify-center gap-5 max-md:-top-[2.6rem] relative'>
          <img
            src='/assets/images/icon-sunny.webp'
            alt='temperature icon'
            className='w-[7.5rem] h-[7.5rem]'
          />
          <p className='font-dm-sans font-semibold italic leading-none -tracking-[2px] text-8xl'>
            20&deg;
          </p>
        </div>
      </div>
    </div>
  )
}

export default WeatherInfo
