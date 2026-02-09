'use client'
import { Box, Heading, Spinner, Table } from '@chakra-ui/react'
import { useUsers } from '@/app/_hooks/useUsers' 

export default function UsersPage() {
  const { data, isLoading } = useUsers()
  if (isLoading) return <Spinner />

  return (
    <Box>
      <Heading size="md" mb={4}>Users</Heading>
      <Table.Root variant="outline">
        <Table.Caption>Users List</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.users.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.firstName} {user.lastName}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}
