'use client'

import { Box, Heading, Text, Card, SimpleGrid, Stack } from '@chakra-ui/react'
import { useAuth } from '../_context/AuthContext'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <Stack spacing={8}>
      <Box>
        <Heading size="2xl" mb={2}>
          Welcome back, {user?.firstName || 'User'}!
        </Heading>
        <Text color="gray.600" fontSize="lg">
          Here's what's happening with your dashboard today
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
        <Card.Root 
          bg="white" 
          as={Link} 
          href="/dashboard/users"
          _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
          transition="all 0.2s"
          cursor="pointer"
        >
          <Card.Body>
            <Box display="flex" alignItems="center" gap={4}>
              <Box 
                p={3} 
                bg="blue.50" 
                borderRadius="lg"
                color="blue.600"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.600" mb={1}>Total Users</Text>
                <Text fontSize="3xl" fontWeight="bold" color="blue.600">208</Text>
              </Box>
            </Box>
          </Card.Body>
        </Card.Root>

        <Card.Root 
          bg="white"
          as={Link}
          href="/dashboard/products"
          _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
          transition="all 0.2s"
          cursor="pointer"
        >
          <Card.Body>
            <Box display="flex" alignItems="center" gap={4}>
              <Box 
                p={3} 
                bg="purple.50" 
                borderRadius="lg"
                color="purple.600"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.600" mb={1}>Products</Text>
                <Text fontSize="3xl" fontWeight="bold" color="purple.600">194</Text>
              </Box>
            </Box>
          </Card.Body>
        </Card.Root>

        <Card.Root bg="white">
          <Card.Body>
            <Box display="flex" alignItems="center" gap={4}>
              <Box 
                p={3} 
                bg="green.50" 
                borderRadius="lg"
                color="green.600"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.600" mb={1}>Active</Text>
                <Text fontSize="3xl" fontWeight="bold" color="green.600">98%</Text>
              </Box>
            </Box>
          </Card.Body>
        </Card.Root>

        <Card.Root 
          bg="white"
          as={Link}
          href="/games"
          _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
          transition="all 0.2s"
          cursor="pointer"
        >
          <Card.Body>
            <Box display="flex" alignItems="center" gap={4}>
              <Box 
                p={3} 
                bg="orange.50" 
                borderRadius="lg"
                color="orange.600"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.600" mb={1}>Games</Text>
                <Text fontSize="3xl" fontWeight="bold" color="orange.600">500K+</Text>
              </Box>
            </Box>
          </Card.Body>
        </Card.Root>
      </SimpleGrid>

      <Box>
        <Heading size="lg" mb={4}>Quick Actions</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          <Card.Root 
            bg="white"
            as={Link}
            href="/dashboard/products"
            _hover={{ shadow: 'lg' }}
            transition="all 0.2s"
            cursor="pointer"
          >
            <Card.Body>
              <Box display="flex" justifyContent="space-between" alignItems="start">
                <Box>
                  <Heading size="md" mb={2}>Browse Products</Heading>
                  <Text color="gray.600">View and filter the complete product catalog</Text>
                </Box>
                <Box color="blue.500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </Box>
              </Box>
            </Card.Body>
          </Card.Root>

          <Card.Root 
            bg="white"
            as={Link}
            href="/dashboard/users"
            _hover={{ shadow: 'lg' }}
            transition="all 0.2s"
            cursor="pointer"
          >
            <Card.Body>
              <Box display="flex" justifyContent="space-between" alignItems="start">
                <Box>
                  <Heading size="md" mb={2}>Manage Users</Heading>
                  <Text color="gray.600">View and manage all registered users</Text>
                </Box>
                <Box color="blue.500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </Box>
              </Box>
            </Card.Body>
          </Card.Root>

          <Card.Root 
            bg="white"
            as={Link}
            href="/games"
            _hover={{ shadow: 'lg' }}
            transition="all 0.2s"
            cursor="pointer"
          >
            <Card.Body>
              <Box display="flex" justifyContent="space-between" alignItems="start">
                <Box>
                  <Heading size="md" mb={2}>Explore Games</Heading>
                  <Text color="gray.600">Discover thousands of games in our library</Text>
                </Box>
                <Box color="blue.500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </Box>
              </Box>
            </Card.Body>
          </Card.Root>

          <Card.Root bg="white">
            <Card.Body>
              <Box display="flex" justifyContent="space-between" alignItems="start">
                <Box>
                  <Heading size="md" mb={2}>Analytics</Heading>
                  <Text color="gray.600">Coming soon - view detailed analytics</Text>
                </Box>
                <Box color="gray.400">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </Box>
              </Box>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>
      </Box>
    </Stack>
  )
}

