'use client'
import Link from 'next/link'
import { useAuth } from '@/app/_context/AuthContext'
import { usePathname } from 'next/navigation'
import { Box, Button } from '@chakra-ui/react'

export default function Sidebar() {
  const { logout } = useAuth()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 p-4 space-y-2 flex flex-col h-full">
      <Button
        as={Link}
        href="/dashboard"
        variant="ghost"
        width="100%"
        justifyContent="flex-start"
        color="white"
        bg={isActive('/dashboard') ? 'whiteAlpha.200' : 'transparent'}
        _hover={{ bg: 'whiteAlpha.300' }}
      >
        Dashboard
      </Button>
      <Button
        as={Link}
        href="/dashboard/users"
        variant="ghost"
        width="100%"
        justifyContent="flex-start"
        color="white"
        bg={isActive('/dashboard/users') ? 'whiteAlpha.200' : 'transparent'}
        _hover={{ bg: 'whiteAlpha.300' }}
      >
        Users
      </Button>
      <Button
        as={Link}
        href="/dashboard/products"
        variant="ghost"
        width="100%"
        justifyContent="flex-start"
        color="white"
        bg={isActive('/dashboard/products') ? 'whiteAlpha.200' : 'transparent'}
        _hover={{ bg: 'whiteAlpha.300' }}
      >
        Products
      </Button>
      <Box flex="1" />
      <Button
        onClick={logout}
        variant="ghost"
        width="100%"
        justifyContent="flex-start"
        colorScheme="red"
        color="red.300"
        _hover={{ bg: 'red.900', color: 'red.200' }}
      >
        Logout
      </Button>
    </aside>
  )
}
