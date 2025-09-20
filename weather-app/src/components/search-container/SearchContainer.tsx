import Button from '../../ui/Button'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '../../ui/Dropdown'

const SearchContainer = () => {
  return (
    <div className='sm:flex sm:flex-row sm:gap-4 gap-3 flex flex-col max-w-[656px] items-center justify-between w-full'>
      <Dropdown classes='w-full'>
        <DropdownTrigger>
          <div className='flex items-center justify-start bg-neutral-800 px-6 py-4 rounded-xl w-full'>
            <img src='/assets/images/icon-search.svg' alt='search-icon' className='inline mr-4' />
            <label htmlFor='search-field' />
            <input
              type='text'
              id='search-field'
              placeholder='Search for a place...'
              className='font-dm-sans font-medium text-xl leading-[120%] text-left text-neutral-200 focus:text-neutral-200 w-full h-full outline-none'
            />
          </div>
        </DropdownTrigger>
        <DropdownMenu className='w-full'>
          <DropdownItem>
            <div className='px-2 py-2.5 rounded-lg hover:border-[1px] hover:border-solid hover:border-neutral-600 '>
              <p className='font-dm-sans font-medium text-base leading-[120%]'>City Name</p>
            </div>
          </DropdownItem>
          <DropdownItem>
            <div className='px-2 py-2.5 rounded-lg hover:border-[1px] hover:border-solid hover:border-neutral-600 '>
              <p className='font-dm-sans font-medium text-base leading-[120%]'>City Name</p>
            </div>
          </DropdownItem>
          <DropdownItem>
            <div className='px-2 py-2.5 rounded-lg hover:border-[1px] hover:border-solid hover:border-neutral-600 '>
              <p className='font-dm-sans font-medium text-base leading-[120%]'>City Name</p>
            </div>
          </DropdownItem>
          <DropdownItem>
            <div className='px-2 py-2.5 rounded-lg hover:border-[1px] hover:border-solid hover:border-neutral-600 '>
              <p className='font-dm-sans font-medium text-base leading-[120%]'>City Name</p>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Button
        label='Search'
        className='font-medium text-xl px-6 py-4 rounded-xl w-full sm:w-[116px]'
        variant='primary'
      />
    </div>
  )
}

export default SearchContainer
