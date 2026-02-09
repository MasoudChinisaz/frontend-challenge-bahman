const API_KEY = process.env.NEXT_PUBLIC_RAWG_KEY

export const getGames = async (params = '') => {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&${params}`
  )
  return res.json()
}
