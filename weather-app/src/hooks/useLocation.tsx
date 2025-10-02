import { useCallback, useEffect, useState } from 'react'
import { baseLocation } from '../lib/constants'

export type Location = {
  latitude: number
  longitude: number
}

export type GeoLocationType = {
  location: Location
  error?: { code?: number; message?: string }
}

export const useLocation = () => {
  const [geoLocation, setGeoLocation] = useState<GeoLocationType>({
    location: baseLocation.location,
  })

  function successGeoLocation(position: GeolocationPosition) {
    const location = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
    }
    setGeoLocation({ location })
  }

  function errorGeoLocation(error: GeolocationPositionError) {
    setGeoLocation({
      location: baseLocation.location,
      error: { code: error.code, message: error.message },
    })
  }

  const getGeoLocation = useCallback(() => {
    if (!('geolocation' in navigator)) {
      const errorMessage = 'Geolocation is not supported. Using default location.'
      console.warn(errorMessage)
      setGeoLocation((prev) => ({ ...prev, error: { message: errorMessage } }))
      return
    }

    navigator.geolocation.getCurrentPosition(successGeoLocation, errorGeoLocation, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0, // To not use cached position
    })
  }, [])

  useEffect(() => {
    getGeoLocation()
  }, [getGeoLocation])

  return { geoLocation, getGeoLocation }
}
