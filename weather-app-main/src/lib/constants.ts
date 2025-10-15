export interface WeatherData {
  current: {
    currentDate: string
    temperature: number
    apparent_temperature: number
    humidity: number
    wind_speed: number
    precipitation: number
    weatherCode: number
  }
  currentUnits: {
    temperature: string
    apparent_temperature: string
    humidity: string
    wind_speed: string
    precipitation: string
  }
  hourly: {
    time: string[]
    temperatures: number[]
    weather_code: number[]
  }
  forecastByDaysData: [{ high: number; low: number; day: string; icon: number }]
}

export const baseLocation = { location: { latitude: 0, longitude: 0 } }

export interface HourlyWeatherData {
  temperatures: number[]
  time: string[]
  weather_code: number[]
}

type WeatherType =
  | 'sunny'
  | 'partly-cloudy'
  | 'overcast'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'storm'

interface WeatherRange {
  codes: number[]
  type: WeatherType
}

export type WeatherRanges = WeatherRange[]

export type SearchLocationResult = {
  id: number
  name: string
  latitude: number
  longitude: number
  country_code: string
  country: string
  elevation: number
  feature_code: string
  admin1_id: number
  admin2_id: number
  admin3_id: number
  timezone: string
  country_id: number

  admin1: string
  admin2: string
  admin3: string
}

export interface SearchLocationResponse {
  results?: SearchLocationResult[]
  error?: boolean
  reason?: string
}
