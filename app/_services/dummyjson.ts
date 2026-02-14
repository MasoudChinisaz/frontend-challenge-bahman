// api.ts
import { Product, User } from '../_types'
import { fetcher } from './fetcher'


export const getUsers = (): Promise<{ users: User[] }> =>
  fetcher('https://dummyjson.com/users')

export const getProducts = (): Promise<{ products: Product[] }> =>
  fetcher('https://dummyjson.com/products')

export const getProduct = (id: string): Promise<Product> =>
  fetcher(`https://dummyjson.com/products/${id}`)
