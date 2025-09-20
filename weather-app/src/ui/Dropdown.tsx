import { createContext, useContext, useState } from 'react'

interface DropdownContextType {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DropdownMenuContext = createContext<DropdownContextType | null>(null)

const useDropdown = () => {
  const context = useContext(DropdownMenuContext)
  if (!context) {
    throw new Error('DropdownMenu must be used within a DropdownProvider')
  }

  return context
}

const Dropdown = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div className='relative'>{children}</div>
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
  console.log('isOpen', isOpen)
  return isOpen ? (
    <div
      className={`absolute top-full right-0 mt-2 px-2 py-1.5 bg-neutral-800 border-neutral-600 border-[1px] drop-shadow-dropdown rounded-xl ${className}`}
    >
      <ul className='flex flex-col items-center gap-1 justify-center w-full h-full'>{children}</ul>
    </div>
  ) : null
}

const DropdownItem = ({
  children,
  onItemClick,
}: {
  children: React.ReactNode
  onItemClick?: React.MouseEventHandler
}) => {
  return (
    <li className='w-full hover:bg-neutral-700 cursor-pointer' onClick={onItemClick}>
      {children}
    </li>
  )
}

const DropdownTrigger = ({ children }: { children: React.ReactNode }) => {
  const { setIsOpen, isOpen } = useDropdown()

  return (
    <div className='w-fit' onClick={() => setIsOpen(!isOpen)}>
      {children}
    </div>
  )
}

export { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger }
