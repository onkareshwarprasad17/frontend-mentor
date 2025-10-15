import Button from './Button'

const Error = ({ message }: { message: string }) => {
  return (
    <div className='flex flex-col items-center justify-center pt-10 gap-6'>
      <img src='/assets/images/icon-error.svg' alt='error-icon' className='h-11 w-11' />
      <h1 className='font-bricolage-grotesque font-bold leading-[120%] text-neutral-0 text-[3.2rem] text-center'>
        Something went wrong
      </h1>

      <p className='font-medium font-dm-sans text-xl leading-[120%] text-neutral-200 text-center max-w-[554px]'>
        {message}
      </p>
      <Button
        onClick={() => window.location.reload()}
        label='Retry'
        className='text-base leading-[120%] font-dm-sans font-medium text-neutral-0 py-2 px-4'
        icon='/assets/images/icon-retry.svg'
      />
    </div>
  )
}

export default Error
