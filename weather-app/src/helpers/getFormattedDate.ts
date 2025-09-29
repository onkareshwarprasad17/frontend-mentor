export const getFormattedDate = (date: string) => {
  const options = {
    day: 'numeric' as 'numeric' | '2-digit' | undefined,
    weekday: 'long' as 'long' | 'short' | 'narrow' | undefined,
    year: 'numeric' as 'numeric' | '2-digit' | undefined,
    month: 'short' as 'numeric' | 'long' | 'short' | 'narrow' | '2-digit' | undefined,
  }

  const currentDate = new Date(date)
    .toLocaleDateString('en-IN', options)
    .replace(',', '')
    .split(' ')
    .map((item, index) => (index === 0 ? item.trim().concat(',') : item.trim()))
    .join(' ')

  return currentDate
}
