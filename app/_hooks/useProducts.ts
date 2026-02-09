import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../_services/dummyjson' 

export const useProducts = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })
