'use client'
import { useState } from 'react'
import { Box, Input, SimpleGrid, Image, Text, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import { useGames } from '../_hooks/useGames' 

export default function GamesPage() {
  const [query, setQuery] = useState('')
  const { data, isLoading } = useGames(`search=${query}`)

  return (
    <Box p={4}>
      <Heading mb={4}>Games</Heading>

      <Input placeholder="Search games..." mb={4} value={query} onChange={e => setQuery(e.target.value)} bg="white" />

      {isLoading && <Text>Loading...</Text>}

      <SimpleGrid columns={[1, 2, 4]} spacing={4}>
        {data?.results.map((g: any) => (
          <Link key={g.id} href={`/games/${g.id}`}>
            <Box borderWidth="1px" borderRadius="md" overflow="hidden" bg="white">
              <Image src={g.background_image} height="150px" width="100%" objectFit="cover" />
              <Box p={2}>
                <Text fontWeight="bold">{g.name}</Text>
              </Box>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  )
}
