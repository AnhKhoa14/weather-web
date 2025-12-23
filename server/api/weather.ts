export default defineEventHandler(async (event) => {
  const { lat, lon } = getQuery(event)
  const config = useRuntimeConfig()

  return await $fetch(
    `https://api.openweathermap.org/data/2.5/weather`,
    {
      params: {
        lat: lat || 10.79161131940247,
        lon: lon || 106.69725269595563,
        units: 'metric',
        appid: config.weatherApiKey
      }
    }
  )
})
