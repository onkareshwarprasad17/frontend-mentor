import { useCallback, useEffect, useMemo, useState } from 'react'
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

  const options = useMemo(
    () => ({
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0, // To not use cached position
    }),
    []
  )

  function successGeoLocation(position: GeolocationPosition) {
    const location = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
    }

    setGeoLocation({
      location,
      error: undefined,
    })
  }

  function errorGeoLocation(error: GeolocationPositionError) {
    let errorMessage = 'An unknown error occurred while getting location.'

    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage =
          'Location permission was denied. Please enable location access from site settings!'
        break
      case error.POSITION_UNAVAILABLE:
        errorMessage = 'Location information is unavailable. Please try later!'
        break
      case error.TIMEOUT:
        errorMessage = 'Request to get location timed out. Please check your network strength!'
        break
    }

    console.error(`Geolocation error: ${errorMessage}`)

    setGeoLocation({
      location: baseLocation.location,
      error: {
        code: error.code,
        message: errorMessage,
      },
    })
  }

  const getGeoLocation = useCallback(async () => {
    if (!('geolocation' in navigator)) {
      const errorMessage = 'Geolocation is not supported. Using default location.'
      console.warn(errorMessage)
      setGeoLocation((prev) => ({
        ...prev,
        error: { message: errorMessage },
      }))
      return
    }

    try {
      const navigationPermissionStatus = await navigator.permissions.query({ name: 'geolocation' })
      console.log('Geolocation permission state:', navigationPermissionStatus.state)
      if (navigationPermissionStatus.state === 'denied') {
        const previousLocation = localStorage.getItem('location')
        if (previousLocation) {
          setGeoLocation({
            location: {
              latitude: previousLocation.split('-')[0] as unknown as number,
              longitude: previousLocation.split('-')[1] as unknown as number,
            },
          })
        } else {
          throw new Error(
            'Location permission was denied. Please enable location access from site settings!'
          )
        }
      } else {
        navigator.geolocation.getCurrentPosition(successGeoLocation, errorGeoLocation, options)
      }
    } catch (error) {
      console.error('Error checking geolocation permission:', error)
      setGeoLocation((prev) => ({
        ...prev,
        error: { message: (error as Error).message },
      }))
    }
  }, [options])

  useEffect(() => {
    getGeoLocation()
  }, [])

  return { location: geoLocation.location, error: geoLocation.error }
}
