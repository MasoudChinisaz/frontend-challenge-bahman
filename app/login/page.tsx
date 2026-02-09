'use client'

import { useState } from 'react'
import { Box, Button, Heading, Input, VStack, Text } from '@chakra-ui/react'
import { useAuth } from '../_context/AuthContext' 
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    try {
      setError('')
      await login(username, password)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh" bg="gray.50">
      <Box p={8} bg="white" rounded="md" shadow="md" w="96">
        <Heading mb={6}>Login</Heading>
        <VStack spacing={4}>
          <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          {error && <Text color="red.500">{error}</Text>}
          <Button colorScheme="brand" onClick={handleSubmit} w="full">Login</Button>
        </VStack>
      </Box>
    </Box>
  )
}
