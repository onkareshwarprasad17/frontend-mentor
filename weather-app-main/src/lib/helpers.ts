import type { Location } from '../hooks/useLocation'
import {
  type HourlyWeatherData,
  type SearchLocationResponse,
  type SearchLocationResult,
  type WeatherData,
  type WeatherRanges,
} from './constants'

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

export const getWeatherIconFromCode = (weatherCode: number) => {
  const weatherCodeMap: WeatherRanges = [
    { type: 'sunny', codes: [0, 1] },
    { type: 'partly-cloudy', codes: [2] },
    { type: 'overcast', codes: [3] },
    { type: 'fog', codes: [45, 48] },
    { type: 'drizzle', codes: [51, 53, 55, 56, 57] },
    { type: 'rain', codes: [61, 63, 65, 66, 67, 80, 81, 82] },
    { type: 'snow', codes: [71, 73, 75, 77, 85, 86] },
    { type: 'storm', codes: [95, 96, 99] },
  ]

  for (const { type, codes } of weatherCodeMap) {
    if (codes.includes(weatherCode)) {
      return type
    }
  }
  return 'sunny' // default to sunny weather
}

export const formatHourlyWeatherData = (
  hourlyData?: HourlyWeatherData
): Map<string, Array<{ hour: string; temp: number; weatherCode: number }>> => {
  if (!hourlyData) return new Map()
  const { temperatures, time, weather_code } = hourlyData

  const result = new Map()
  const todayDate = new Date()
  const todayDayName = getDayName()

  time.forEach((item: string, index: number) => {
    const date = new Date(item)
    const currentDate = getDayName(item)
    const hours = date.getHours()

    if (todayDayName === currentDate && hours < todayDate.getHours()) {
      return
    }

    // Handling 12 hours
    const displayHour = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
    const period = hours >= 12 ? 'PM' : 'AM'

    const formattedHourTemp = {
      hour: `${displayHour} ${period}`,
      temp: temperatures[index],
      weatherCode: weather_code[index],
    }

    const existing = result.get(currentDate) || []
    result.set(currentDate, [...existing, formattedHourTemp])
  })

  return result
}

export const getDayName = (date?: string) => {
  if (!date) {
    return new Date().toLocaleDateString('en-IN', { weekday: 'long' })
  }

  return new Date(date).toLocaleDateString('en-IN', { weekday: 'long' })
}

export const getWeatherData = async (
  unit: 'celsius' | 'fahrenheit',
  location: { latitude: number; longitude: number }
) => {
  let baseUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=weather_code&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=weather_code,temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m&timezone=auto`

  if (unit === 'fahrenheit') {
    baseUrl += '&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch'
  }

  const response = await fetch(baseUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  })

  const data = await response.json()

  const forecastedDays = data.daily.time.reduce((acc: string[], cur: string) => {
    const currentDay = new Date(cur).toLocaleDateString('en-IN', { weekday: 'short' })
    acc = [...acc, currentDay]
    return acc
  }, [])

  const dailyForecastedData: WeatherData['forecastByDaysData'] = forecastedDays.map(
    (item: string, index: string | number) => ({
      day: item,
      high: data.daily.temperature_2m_max[index],
      low: data.daily.temperature_2m_min[index],
      icon: data.daily.weather_code[index],
    })
  )

  const parsedData: WeatherData = {
    current: {
      currentDate: getFormattedDate(data.current.time),
      temperature: data.current.temperature_2m,
      apparent_temperature: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      wind_speed: data.current.wind_speed_10m,
      precipitation: data.current.precipitation,
      weatherCode: data.current.weather_code,
    },
    currentUnits: {
      temperature: data.current_units.temperature_2m,
      apparent_temperature: data.current_units.apparent_temperature,
      humidity: data.current_units.relative_humidity_2m,
      wind_speed: data.current_units.wind_speed_10m,
      precipitation: data.current_units.precipitation,
    },
    hourly: {
      time: data.hourly.time,
      temperatures: data.hourly.temperature_2m,
      weather_code: data.hourly.weather_code,
    },
    forecastByDaysData: dailyForecastedData,
  }
  return parsedData
}

export const getSearchLocationData = async (term: string) => {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(term)}&count=5&language=en&format=json`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch location data')
  }

  const data = await response.json()

  if (data.error) throw new Error(data.reason || 'Failed to fetch location data')
  if (!data.results) throw new Error('No records found!')

  const formattedData: SearchLocationResponse['results'] = data.results.map(
    (item: SearchLocationResult) => {
      return {
        id: item.id,
        name: item.name,
        country: item.country,
        latitude: item.latitude,
        longitude: item.longitude,
        country_code: item.country_code,
        admin1: item.admin1,
        admin2: item.admin2,
        admin3: item.admin3,
      }
    }
  )

  return formattedData
}

export const getGeolocationName = async (location: Location) => {
  const stringifiedLocation = `${location.latitude}-${location.longitude}`
  if (
    localStorage.getItem('location') === stringifiedLocation &&
    localStorage.getItem('locationName') !== undefined
  ) {
    return localStorage.getItem('locationName') ?? ''
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${location.latitude}&lon=${location.longitude}&format=json&accept-language=en`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )

    if (!response.ok) {
      throw new Error('Error while fetching location name!')
    }

    const data = await response.json()
    const { display_name } = data
    const { village, town, country, county } = data.address
    const locationName = `${display_name ? display_name.split(',')[0] : (village ?? town ?? county)}, ${country}`

    localStorage.setItem('location', stringifiedLocation)
    localStorage.setItem('locationName', locationName)
    return locationName
  } catch (error) {
    localStorage.removeItem('location')
    localStorage.removeItem('locationName')
    return 'Error:' + error
  }
}

export const formatSearchedLocationResult = (location: {
  name: string
  country: string
  admin1?: string
  admin2?: string
  admin3?: string
}) => {
  const adminParts = [location.admin1, location.admin2, location.admin3].filter(Boolean).join(', ')
  const fullLocationName = `${location.name}${adminParts.length ? `, ${adminParts}` : ''}, ${location.country}`

  if (fullLocationName.length > 65) {
    return `${fullLocationName.slice(0, 60)}...`
  }
  return fullLocationName
}
