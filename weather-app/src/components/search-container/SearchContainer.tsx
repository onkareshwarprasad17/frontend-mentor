import Button from '../../ui/Button'

const SearchContainer = () => {
  return (
    <div className='sm:flex sm:flex-row sm:gap-4 gap-3 flex flex-col max-w-[656px] items-center justify-between w-full'>
      <div className='flex items-center justify-start bg-neutral-800 px-6 py-4 rounded-xl w-full'>
        <img
          src='/public/assets/images/icon-search.svg'
          alt='search icon'
          className='inline mr-4'
        />
        <label htmlFor='search-field' />
        <input
          type='text'
          id='search-field'
          placeholder='Search for a place...'
          className='font-dm-sans font-medium text-xl leading-[120%] text-left text-neutral-200 focus:text-neutral-200 w-full h-full outline-none'
        />
      </div>

      <Button
        label='Search'
        className='font-medium text-xl px-6 py-4 rounded-xl w-full sm:w-[116px]'
        variant='primary'
      />
    </div>
  )
}

export default SearchContainer
