import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../_services/dummyjson' 

export const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })
