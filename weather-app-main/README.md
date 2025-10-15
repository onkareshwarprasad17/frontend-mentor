# Frontend Mentor - Weather app solution

This is a solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Notable Features](#notable-features)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- ✅ Search for weather information by entering a location in the search bar
- ✅ View current weather conditions including temperature, weather icon, and location details
- ✅ See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
- ✅ Browse a 7-day weather forecast with daily high/low temperatures and weather icons
- ✅ View an hourly forecast showing temperature changes throughout the day
- ✅ Switch between different days of the week using the day selector in the hourly forecast section
- ✅ Toggle between Imperial and Metric measurement units via the units dropdown
- ✅ Switch between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (millimeters)
- ✅ View the optimal layout for the interface depending on their device's screen size
- ✅ See hover and focus states for all interactive elements on the page

### Links

- Solution URL: [GitHub](https://github.com/onkareshwarprasad17/frontend-mentor/tree/main/weather-app)
- Live Site URL: [Live](https://weather-app-main-ten-chi.vercel.app/)

## My process

### Built with

Frontend:

- [React](https://reactjs.org/) - JS library
- [TypeScript](https://www.typescriptlang.org/) - For type safety
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - For styles
- Mobile-first workflow
- Semantic HTML5 markup
- CSS Flexbox
- React Context for state management
- Custom Hooks for reusable logic

APIs and External Services:

- [Open Meteo API](https://open-meteo.com/) - Weather data API

### Notable Features

- Implemented **debounced** search functionality
- Implemented **custom useQuery** for handling _loading, error and success states_ for async function
- Worked with **Geolocation and Reverse Geolocation** APIs
- Managing complex state with React Context
- Handling user preferences (units) with localStorage
- Implemented responsive layouts with Tailwind CSS
- TypeScript type definitions for better code reliability

### Useful resources

- [Open Meteo Documentation](https://open-meteo.com/en/docs) - Comprehensive documentation for the weather API
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Great reference for utility classes
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) - Essential for understanding TypeScript features

## Author

- Frontend Mentor - [@onkareshwarprasad17](https://www.frontendmentor.io/profile/onkareshwarprasad17)
- GitHub - [onkareshwarprasad17](https://github.com/onkareshwarprasad17)
