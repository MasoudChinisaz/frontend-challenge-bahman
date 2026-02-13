'use client'
import { Box, Heading, Spinner, Table, Text, Stack, Card, Badge, Button } from '@chakra-ui/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

export default function UsersPage() {
  const observerTarget = useRef<HTMLDivElement>(null)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['users-infinite'],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetch(`https://dummyjson.com/users?limit=30&skip=${pageParam}`)
      if (!response.ok) throw new Error('Failed to fetch users')
      return response.json()
    },
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.reduce((acc, page) => acc + page.users.length, 0)
      return totalFetched < lastPage.total ? totalFetched : undefined
    },
    initialPageParam: 0,
  })

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 }
    )

    const target = observerTarget.current
    if (target) {
      observer.observe(target)
    }

    return () => {
      if (target) {
        observer.unobserve(target)
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const allUsers = data?.pages.flatMap((page) => page.users) || []
  const totalUsers = data?.pages[0]?.total || 0
  
  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" minH="400px">
        <Spinner size="xl" color="blue.500" />
      </Box>
    )
  }

  return (
    <Box>
      <Stack spacing={6}>
        {/* Header */}
        <Box>
          <Heading size="xl" mb={2}>Users</Heading>
          <Text color="gray.600">Manage and view all users in the system</Text>
        </Box>

        {/* Stats Cards */}
        <Box display="grid" gridTemplateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
          <Card.Root bg="white">
            <Card.Body>
              <Text fontSize="sm" color="gray.600" mb={1}>Total Users</Text>
              <Text fontSize="3xl" fontWeight="bold" color="blue.600">{totalUsers}</Text>
            </Card.Body>
          </Card.Root>
          <Card.Root bg="white">
            <Card.Body>
              <Text fontSize="sm" color="gray.600" mb={1}>Loaded Users</Text>
              <Text fontSize="3xl" fontWeight="bold" color="green.600">{allUsers.length}</Text>
            </Card.Body>
          </Card.Root>
          <Card.Root bg="white">
            <Card.Body>
              <Text fontSize="sm" color="gray.600" mb={1}>Active</Text>
              <Text fontSize="3xl" fontWeight="bold" color="purple.600">100%</Text>
            </Card.Body>
          </Card.Root>
        </Box>

        {/* Users Table */}
        <Card.Root bg="white" overflow="hidden">
          <Table.Root variant="outline" size="lg">
            <Table.Header bg="gray.50">
              <Table.Row>
                <Table.ColumnHeader>User</Table.ColumnHeader>
                <Table.ColumnHeader>Contact</Table.ColumnHeader>
                <Table.ColumnHeader>Company</Table.ColumnHeader>
                <Table.ColumnHeader>Role</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {allUsers.map(user => (
                <Table.Row key={user.id} _hover={{ bg: 'gray.50' }}>
                  <Table.Cell>
                    <Box display="flex" alignItems="center" gap={3}>
                      <Box
                        width="40px"
                        height="40px"
                        borderRadius="full"
                        overflow="hidden"
                        flexShrink={0}
                        bg="gray.200"
                      >
                        {user.image ? (
                          <img 
                            src={user.image} 
                            alt={`${user.firstName} ${user.lastName}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <Box 
                            width="100%" 
                            height="100%" 
                            display="flex" 
                            alignItems="center" 
                            justifyContent="center"
                            bg="blue.500"
                            color="white"
                            fontWeight="bold"
                            fontSize="lg"
                          >
                            {user.firstName[0]}{user.lastName[0]}
                          </Box>
                        )}
                      </Box>
                      <Box>
                        <Text fontWeight="semibold">{user.firstName} {user.lastName}</Text>
                        <Text fontSize="sm" color="gray.600">@{user.username}</Text>
                      </Box>
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Box>
                      <Text fontSize="sm">{user.email}</Text>
                      <Text fontSize="sm" color="gray.600">{user.phone}</Text>
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Box>
                      <Text fontSize="sm" fontWeight="medium">{user.company?.name || 'N/A'}</Text>
                      <Text fontSize="sm" color="gray.600">{user.company?.department || ''}</Text>
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge colorScheme="purple">{user.role || 'User'}</Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge colorScheme="green">Active</Badge>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Card.Root>

        {/* Infinite Scroll Trigger */}
        <div ref={observerTarget} style={{ height: '20px' }} />

        {/* Loading More Indicator */}
        {isFetchingNextPage && (
          <Box display="flex" alignItems="center" justifyContent="center" py={8}>
            <Spinner size="lg" color="blue.500" />
            <Text ml={3} color="gray.600">Loading more users...</Text>
          </Box>
        )}

        {/* No More Results */}
        {!hasNextPage && allUsers.length > 0 && (
          <Box textAlign="center" py={8}>
            <Text color="gray.500">All users loaded ({allUsers.length} of {totalUsers})</Text>
          </Box>
        )}

        {allUsers.length === 0 && (
          <Box textAlign="center" py={12}>
            <Text fontSize="lg" color="gray.500">No users found</Text>
          </Box>
        )}
      </Stack>
    </Box>
  )
}
