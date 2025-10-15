interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  className: string
  icon?: string
  isDropdown?: boolean
  variant?: 'primary' | 'secondary' | 'custom'
  variantColor?: string
}

const Button = ({
  icon,
  className,
  label,
  isDropdown,
  variant = 'secondary',
  variantColor,
  disabled,
  onClick,
}: ButtonProps) => {
  const renderIcon = () => {
    return <img src={icon} className='h-3.5 w-3.5 md:w-4 md:h-4' alt='button-icon' />
  }

  let variantColorClass = ''

  switch (variant) {
    case 'primary':
      variantColorClass = 'bg-blue-500'
      break

    case 'secondary':
      variantColorClass = 'bg-neutral-800'
      break

    case 'custom':
      variantColorClass = variantColor || ''
      break
  }

  return (
    <button
      className={`flex gap-1.5 md:gap-2.5 items-center justify-center rounded-md font-dm-sans font-medium text-neutral-0 leading-[120%] cursor-pointer disabled:pointer-events-none disabled:opacity-50 focus-within:border-ring focus-within:ring-ring/50 focus-within:ring group ${variantColorClass} ${className ? className : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && renderIcon()}
      {label}

      {isDropdown && (
        <img
          src='/assets/images/icon-dropdown.svg'
          className='h-[9px] w-3.5 md:w-3 md:h-4.5'
          alt='dropdown-icon'
        />
      )}
    </button>
  )
}

export default Button
