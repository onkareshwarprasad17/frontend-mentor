import { useEffect, useRef } from 'react'

const useClickOutside = (onClickOutside: () => void) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: React.MouseEvent) => {
      if (ref && ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside?.()
      }
    }

    document.addEventListener('click', (e) => handleClickOutside(e as unknown as React.MouseEvent))

    return () =>
      document.removeEventListener('click', (e) =>
        handleClickOutside(e as unknown as React.MouseEvent)
      )
  }, [onClickOutside])

  return { ref }
}

export default useClickOutside
