import { useCallback, useEffect, useState } from 'react'
import { useWeatherContext } from '../../context/WeatherContext'
import { useDebounce } from '../../hooks/useDebounce'
import type { SearchLocationResponse, SearchLocationResult } from '../../lib/constants'
import { getSearchLocationData } from '../../lib/helpers'
import Button from '../../ui/Button'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '../../ui/Dropdown'

const SearchContainer = ({ onSelectLocation }: { onSelectLocation: (name: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const { handleSearch: onSearchItemClicked } = useWeatherContext()

  const [loading, setLoading] = useState<boolean>(false)
  // Need to add a Error Boundary at the parent level to handle this error
  const [error, setError] = useState<string>('')
  const [searchResults, setSearchResults] = useState<SearchLocationResponse['results']>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

  const handleSearch = useCallback(async (term: string) => {
    try {
      setLoading(true)
      setError('')

      const searchLocationData = await getSearchLocationData(term)
      setSearchResults(searchLocationData)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error occured while fetching location')
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    setIsDropdownOpen(loading || Boolean(searchResults?.length) || Boolean(error.length))
  }, [loading, searchResults, error])

  useEffect(() => {
    if (debouncedSearchTerm) {
      if (/\d/.test(debouncedSearchTerm)) {
        setError('Location name cannot contain numbers. Please enter a valid location name.')
        setSearchResults([])
        return // Don't perform search if input contains numbers
      }
      handleSearch(debouncedSearchTerm)
    } else {
      // Clear results when search term is empty
      setSearchResults([])
      setError('')
    }
  }, [debouncedSearchTerm, handleSearch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim()
    setSearchTerm(inputValue)
  }

  return (
    <div className='sm:flex sm:flex-row sm:gap-4 gap-3 flex flex-col max-w-[656px] items-center justify-between w-full'>
      <Dropdown classes='w-full' isOpen={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownTrigger isControlled={true}>
          <div className='flex items-center justify-start bg-neutral-800 px-6 py-4 rounded-xl w-full'>
            <img src='/assets/images/icon-search.svg' alt='search-icon' className='inline mr-4' />
            <label htmlFor='search-field' />
            <input
              type='text'
              id='search-field'
              value={searchTerm}
              onChange={handleInputChange}
              placeholder='Search for a place...'
              className='font-dm-sans font-medium text-xl leading-[120%] text-left text-neutral-200 focus:text-neutral-200 w-full h-full outline-none'
              onFocus={() => (searchResults?.length ? setIsDropdownOpen(true) : null)}
            />
          </div>
        </DropdownTrigger>
        <DropdownMenu className='w-full'>
          {loading && (
            <DropdownItem>
              <div className='px-2 py-2.5 rounded-lg hover:border-neutral-600 flex items-center'>
                <img
                  src='/assets/images/icon-loading.svg'
                  alt='location-loading-spinner'
                  className='animate-spin mr-2.5'
                />
                <p className='font-dm-sans font-medium text-base leading-[120%]'>
                  Search in progress
                </p>
              </div>
            </DropdownItem>
          )}

          {!loading && error && !searchResults?.length && (
            <DropdownItem>
              <div className='px-2 py-2.5 rounded-lg flex items-center'>
                <p className='font-dm-sans font-medium text-base leading-[120%]'>{error} </p>
              </div>
            </DropdownItem>
          )}

          {!loading &&
            searchResults?.map((result: SearchLocationResult) => (
              <DropdownItem
                key={result.id}
                onItemClick={() => {
                  onSearchItemClicked({ latitude: result.latitude, longitude: result.longitude })
                  onSelectLocation(`${result.name}, ${result.country}`)
                  setSearchTerm('')
                }}
              >
                <div className='px-2 py-2.5 rounded-lg hover:border-[1px] hover:border-solid hover:border-neutral-600 flex items-center'>
                  <p className='font-dm-sans font-medium text-base leading-[120%]'>{`${result.name}${result?.country ? ', ' + result.country : ''}`}</p>
                </div>
              </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>

      <Button
        label='Search'
        className='font-medium text-xl px-6 py-4 rounded-xl w-full sm:w-[116px]'
        variant='primary'
        disabled={loading || !debouncedSearchTerm.length}
        onClick={() => handleSearch(debouncedSearchTerm)}
      />
    </div>
  )
}

export default SearchContainer
