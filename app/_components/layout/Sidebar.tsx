'use client'
import Link from 'next/link'
import { useAuth } from '@/app/_context/AuthContext' 

export default function Sidebar() {
  const { logout } = useAuth()

  return (
    <aside className="w-64 bg-white border-r p-4 space-y-4">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/dashboard/users">Users</Link>
      <Link href="/dashboard/products">Products</Link>
      <button onClick={logout} className="text-red-500">
        Logout
      </button>
    </aside>
  )
}
