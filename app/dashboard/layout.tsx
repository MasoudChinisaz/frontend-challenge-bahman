'use client'

import { useAuth } from '../_context/AuthContext' 
import { useRouter } from 'next/navigation'
import { useEffect, ReactNode } from 'react'
import { Box, Flex, VStack, Button, Heading } from '@chakra-ui/react'
import Link from 'next/link'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) router.replace('/login')
  }, [user, router])

  if (!user) return null

  return (
    <Flex minH="100vh">
      <Box w="260px" bg="gray.900" color="white" p={4}>
        <Heading size="md" mb={6}>Dashboard</Heading>
        <VStack align="stretch" spacing={3}>
          <Button as={Link} href="/dashboard" variant="ghost">Home</Button>
          <Button as={Link} href="/dashboard/users" variant="ghost">Users</Button>
          <Button as={Link} href="/dashboard/products" variant="ghost">Products</Button>
          <Button mt={8} colorScheme="red" onClick={logout}>Logout</Button>
        </VStack>
      </Box>
      <Box flex="1" p={6} bg="gray.50">{children}</Box>
    </Flex>
  )
}
