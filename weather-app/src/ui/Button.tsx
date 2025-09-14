type ButtonProps = {
  label: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
  icon?: string
}

const Button = ({ icon, className, label }: ButtonProps) => {
  // should close the dropdown when clicked outside
  const renderIcon = () => {
    return <img src={icon} className='h-3.5 w-3.5 md:w-4 md:h-4' />
  }
  return (
    <button
      className={`flex gap-1.5 md:gap-2.5 items-center justify-center rounded-md text-neutral-0 py-2 px-2.5 md:py-3 md:px-4 font-dm-sans font-medium text-sm md:text-base leading-[120%] bg-neutral-800 ${className ? className : ''} `}
    >
      {icon && renderIcon()}
      {label}

      {/* TODO: render dropdown */}
      <img
        src='/public/assets/images/icon-dropdown.svg'
        className='h-[9px] w-3.5 md:w-3 md:h-4.5'
      />
    </button>
  )
}

export default Button
