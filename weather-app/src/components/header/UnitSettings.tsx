import Button from '../../ui/Button'

const UnitSettings = () => {
  return (
    <Button
      label='Units'
      icon='/assets/images/icon-units.svg'
      className='py-2 px-2.5 md:py-3 md:px-4 text-sm md:text-base'
      isDropdown={true}
    />
  )
}

export default UnitSettings
