'use client'

import { use } from 'react'
import { useGames } from '@/app/_hooks/useGames' 
import { Box, Heading, Image, Text, Spinner } from '@chakra-ui/react'

type Props = {
  params: Promise<{ slug: string }>
}

export default function GameDetailPage({ params }: Props) {
  // unwrap the async params
  const { slug } = use(params)

  const { data, isLoading } = useGames(`slug=${slug}`)

  if (isLoading) return <Spinner />

  if (!data) return <Text>Game not found</Text>

  const game = data.results[0]  // assuming results array

  return (
    <Box p={4}>
      <Heading mb={4}>{game.name}</Heading>
      <Image src={game.background_image} alt={game.name} mb={4} />
      <Text>{game.description_raw || game.description || 'No description available'}</Text>
    </Box>
  )
}
