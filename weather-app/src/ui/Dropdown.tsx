import { createContext, useContext, useState } from 'react'
import useClickOutside from '../hooks/useClickOutside'

interface DropdownProps {
  children: React.ReactNode
  classes?: string
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  closeOnClickOutside?: boolean
}

interface DropdownContextType {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  handleClickOutside: () => void
}

const DropdownMenuContext = createContext<DropdownContextType | null>(null)

const useDropdown = () => {
  const context = useContext(DropdownMenuContext)
  if (!context) {
    throw new Error('useDropdown must be used within a DropdownProvider')
  }
  return context
}

const Dropdown = ({
  children,
  classes,
  isOpen: controlledIsOpen,
  onOpenChange,
  closeOnClickOutside = true,
}: DropdownProps) => {
  // Internal state for uncontrolled mode
  const [internalIsOpen, setInternalIsOpen] = useState(false)

  // Determine if we're in controlled or uncontrolled mode
  const isControlled = controlledIsOpen !== undefined
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen

  const setIsOpen = (value: boolean) => {
    if (!isControlled) {
      setInternalIsOpen(value)
    }
    onOpenChange?.(value)
  }

  function handleClickOutside() {
    if (closeOnClickOutside) {
      setIsOpen(false)
    }
  }

  const { ref } = useClickOutside(handleClickOutside)

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen, handleClickOutside }}>
      <div className={`relative ${classes}`} ref={ref}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  )
}

const DropdownMenu = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const { isOpen } = useDropdown()

  return isOpen ? (
    <div
      className={`absolute top-full right-0 mt-2 px-2 py-1.5 bg-neutral-800 border-neutral-600 border-[1px] drop-shadow-dropdown rounded-xl ${className} z-10`}
    >
      <ul className='flex flex-col items-center gap-1 justify-center w-full h-full'>{children}</ul>
    </div>
  ) : null
}

const DropdownGroupItem = ({
  children,
  header,
}: {
  children: React.ReactNode
  header?: React.ReactNode
}) => {
  if (header) {
    return (
      <div className='flex flex-col gap-2 w-full'>
        {header}

        <div className='flex flex-col gap-1'>{children}</div>
      </div>
    )
  }
  return <div className='flex flex-col gap-1'>{children}</div>
}

const DropdownItem = ({
  children,
  onItemClick,
}: {
  children: React.ReactNode
  onItemClick?: React.MouseEventHandler
}) => {
  const { handleClickOutside } = useDropdown()
  const handleItemClick = (e: React.MouseEvent) => {
    if (onItemClick) {
      onItemClick(e)
    }
    handleClickOutside()
  }

  const isButton = Boolean(onItemClick)

  return (
    <li
      className={`w-full hover:bg-neutral-700 rounded-lg ${isButton ? 'cursor-pointer' : ''}`}
      role={isButton ? 'button' : 'listitem'}
      onClick={handleItemClick}
    >
      {children}
    </li>
  )
}

const DropdownTrigger = ({
  children,
  isControlled = false,
}: {
  children: React.ReactNode
  isControlled?: boolean
}) => {
  const { setIsOpen, isOpen } = useDropdown()

  const handleTriggerClick = () => setIsOpen(!isOpen)
  const onClickHandler = isControlled ? undefined : handleTriggerClick

  return (
    <div className='w-full' onClick={onClickHandler}>
      {children}
    </div>
  )
}

export { Dropdown, DropdownGroupItem, DropdownItem, DropdownMenu, DropdownTrigger }
