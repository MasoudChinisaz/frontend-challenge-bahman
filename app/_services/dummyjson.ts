import { fetcher } from './fetcher'

export const getUsers = () =>
  fetcher('https://dummyjson.com/users')

export const getProducts = () =>
  fetcher('https://dummyjson.com/products')

export const getProduct = (id: string) =>
  fetcher(`https://dummyjson.com/products/${id}`)
