import Icon from './Icon'

const Logo = () => {
  return (
    <div className='w-full h-7 md:h-10'>
      <Icon image={'/assets/images/logo.svg'} className='max-w-[200px] min-w-[138px]' />
    </div>
  )
}

export default Logo
