import { createContext, useContext, useState } from 'react'
import useClickOutside from '../hooks/useClickOutside'

interface DropdownContextType {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleClickOutside: () => void
}

const DropdownMenuContext = createContext<DropdownContextType | null>(null)

const useDropdown = () => {
  const context = useContext(DropdownMenuContext)
  if (!context) {
    throw new Error('DropdownMenu must be used within a DropdownProvider')
  }

  return context
}

const Dropdown = ({ children, classes }: { children: React.ReactNode; classes?: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  function handleClickOutside() {
    setIsOpen(false)
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

const DropdownTrigger = ({ children }: { children: React.ReactNode }) => {
  const { setIsOpen, isOpen } = useDropdown()

  return (
    <div className='w-full' onClick={() => setIsOpen(!isOpen)}>
      {children}
    </div>
  )
}

export { Dropdown, DropdownGroupItem, DropdownItem, DropdownMenu, DropdownTrigger }
