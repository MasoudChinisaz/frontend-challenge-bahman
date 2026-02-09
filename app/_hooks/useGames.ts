import { useQuery } from '@tanstack/react-query'
import { getGames } from '../_services/rawg' 

export const useGames = (params: string) =>
  useQuery({
    queryKey: ['games', [params]],
    queryFn: () => getGames(params),
  })
