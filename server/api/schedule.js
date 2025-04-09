export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const url = 'https://api.airtable.com/v0/appAR943q3FpYsoDk/Schedule';

  const res = await $fetch(url, {
    headers: {
      Authorization: `Bearer ${config.AIRTABLE_ACCESS_TOKEN}`
    }
  })

  return res
})