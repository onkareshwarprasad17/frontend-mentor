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

/*
  Code	Description
  0	Clear sky
  1, 2, 3	Mainly clear, partly cloudy, and overcast
  45, 48	Fog and depositing rime fog
  51, 53, 55	Drizzle: Light, moderate, and dense intensity
  56, 57	Freezing Drizzle: Light and dense intensity
  61, 63, 65	Rain: Slight, moderate and heavy intensity
  66, 67	Freezing Rain: Light and heavy intensity
  71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
  77	Snow grains
  80, 81, 82	Rain showers: Slight, moderate, and violent
  85, 86	Snow showers slight and heavy
  95 *	Thunderstorm: Slight or moderate
  96, 99 *	Thunderstorm with slight and heavy hail
  */

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

type WeatherRanges = WeatherRange[]

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
