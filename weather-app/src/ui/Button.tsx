type ButtonProps = {
  label: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
  icon?: string
  isDropdown?: boolean
  variant?: 'primary' | 'secondary'
}

const Button = ({ icon, className, label, isDropdown, variant = 'secondary' }: ButtonProps) => {
  // should close the dropdown when clicked outside
  const renderIcon = () => {
    return <img src={icon} className='h-3.5 w-3.5 md:w-4 md:h-4' />
  }
  return (
    <button
      className={`flex gap-1.5 md:gap-2.5 items-center justify-center rounded-md font-dm-sans font-medium text-neutral-0 leading-[120%] ${variant === 'secondary' ? 'bg-neutral-800' : 'bg-blue-500'} ${className ? className : ''} `}
    >
      {icon && renderIcon()}
      {label}

      {/* TODO: render dropdown */}
      {isDropdown && (
        <img
          src='/public/assets/images/icon-dropdown.svg'
          className='h-[9px] w-3.5 md:w-3 md:h-4.5'
        />
      )}
    </button>
  )
}

export default Button
