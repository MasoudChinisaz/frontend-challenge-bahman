'use client'
import { useState, useEffect, useRef } from 'react'
import { Box, Input, SimpleGrid, Image, Text, Heading, Card, Badge, Stack, Spinner, Button } from '@chakra-ui/react'
import Link from 'next/link'
import { useInfiniteQuery } from '@tanstack/react-query'
import AdvancedSelect from '@/app/_components/ui/AdvancedSelect/AdvancedSelect'
import { SelectItem } from '@/app/_components/ui/AdvancedSelect/types'

export default function GamesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenres, setSelectedGenres] = useState<SelectItem[]>([])
  const [selectedPlatforms, setSelectedPlatforms] = useState<SelectItem[]>([])
  const observerTarget = useRef<HTMLDivElement>(null)

  const genreOptions: SelectItem[] = [
    { id: '4', label: 'Action', group: 'Main Genres' },
    { id: '51', label: 'Indie', group: 'Main Genres' },
    { id: '3', label: 'Adventure', group: 'Main Genres' },
    { id: '5', label: 'RPG', group: 'Main Genres' },
    { id: '10', label: 'Strategy', group: 'Main Genres' },
    { id: '2', label: 'Shooter', group: 'Main Genres' },
    { id: '40', label: 'Casual', group: 'Other' },
    { id: '14', label: 'Simulation', group: 'Other' },
    { id: '7', label: 'Puzzle', group: 'Other' },
    { id: '11', label: 'Arcade', group: 'Other' },
    { id: '83', label: 'Platformer', group: 'Other' },
    { id: '1', label: 'Racing', group: 'Other' },
    { id: '59', label: 'Massively Multiplayer', group: 'Other' },
    { id: '15', label: 'Sports', group: 'Other' },
    { id: '6', label: 'Fighting', group: 'Other' },
  ]

  const platformOptions: SelectItem[] = [
    { id: '4', label: 'PC', group: 'Desktop' },
    { id: '187', label: 'PlayStation 5', group: 'Console' },
    { id: '1', label: 'Xbox One', group: 'Console' },
    { id: '18', label: 'PlayStation 4', group: 'Console' },
    { id: '186', label: 'Xbox Series S/X', group: 'Console' },
    { id: '7', label: 'Nintendo Switch', group: 'Console' },
    { id: '2', label: 'Xbox 360', group: 'Previous Gen' },
    { id: '14', label: 'PlayStation 3', group: 'Previous Gen' },
    { id: '21', label: 'Android', group: 'Mobile' },
    { id: '3', label: 'iOS', group: 'Mobile' },
  ]

  const buildQueryParams = (pageParam: number) => {
    const params = new URLSearchParams()
    params.append('key', process.env.NEXT_PUBLIC_RAWG_KEY || '')
    params.append('page', pageParam.toString())
    params.append('page_size', '20')
    
    if (searchQuery) {
      params.append('search', searchQuery)
    }
    
    if (selectedGenres.length > 0) {
      params.append('genres', selectedGenres.map(g => g.id).join(','))
    }
    
    if (selectedPlatforms.length > 0) {
      params.append('platforms', selectedPlatforms.map(p => p.id).join(','))
    }
    
    return params.toString()
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['games', searchQuery, selectedGenres, selectedPlatforms],
    queryFn: async ({ pageParam = 1 }) => {
      const queryString = buildQueryParams(pageParam)
      const response = await fetch(`https://api.rawg.io/api/games?${queryString}`)
      if (!response.ok) throw new Error('Failed to fetch games')
      return response.json()
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.next ? pages.length + 1 : undefined
    },
    initialPageParam: 1,
  })

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

  useEffect(() => {
    refetch()
  }, [searchQuery, selectedGenres, selectedPlatforms, refetch])

  const allGames = data?.pages.flatMap((page) => page.results) || []
  const totalCount = data?.pages[0]?.count || 0

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <Stack spacing={6} maxW="7xl" mx="auto">
        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={4}>
          <Box>
            <Heading size="2xl" mb={2} color="gray.800">Games Library</Heading>
            <Text color="gray.600">Discover and explore thousands of games</Text>
          </Box>
          <Button as={Link} href="/" variant="outline" colorScheme="blue">
            ← Back to Home
          </Button>
        </Box>

        <Card.Root bg="white" shadow="md" borderWidth="1px">
          <Card.Body p={6}>
            <Stack spacing={4}>
              <Heading size="md">Filters</Heading>
              
              <Box>
                <Text fontWeight="medium" mb={2}>Search Games</Text>
                <Input 
                  placeholder="Search by game name..." 
                  size="lg"
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)} 
                  bg="white"
                  borderColor="gray.200"
                  className='shadow-sm! rounded-lg! hover:border-gray-500! transition!'
                  _focus={{ borderColor: 'blue.500', shadow: 'md' }}
                />
              </Box>

              <Box>
                <Text fontWeight="medium" mb={2}>Genre</Text>
                <AdvancedSelect
                  items={genreOptions}
                  value={selectedGenres}
                  onChange={setSelectedGenres}
                  placeholder="Filter by genre..."
                  searchPlaceholder="Search genres..."
                />
              </Box>

              <Box>
                <Text fontWeight="medium" mb={2}>Platform</Text>
                <AdvancedSelect
                  items={platformOptions}
                  value={selectedPlatforms}
                  onChange={setSelectedPlatforms}
                  placeholder="Filter by platform..."
                  searchPlaceholder="Search platforms..."
                />
              </Box>

              {(selectedGenres.length > 0 || selectedPlatforms.length > 0 || searchQuery) && (
                <Box 
                  display="flex" 
                  alignItems="center" 
                  justifyContent="space-between"
                  pt={2}
                  borderTopWidth="1px"
                >
                  <Box display="flex" gap={2} flexWrap="wrap">
                    {selectedGenres.map(genre => (
                      <Badge key={genre.id} colorScheme="purple">{genre.label}</Badge>
                    ))}
                    {selectedPlatforms.map(platform => (
                      <Badge key={platform.id} colorScheme="blue">{platform.label}</Badge>
                    ))}
                  </Box>
                  <Text
                    fontSize="sm"
                    color="blue.600"
                    cursor="pointer"
                    _hover={{ textDecoration: 'underline' }}
                    onClick={() => {
                      setSelectedGenres([])
                      setSelectedPlatforms([])
                      setSearchQuery('')
                    }}
                  >
                    Clear all
                  </Text>
                </Box>
              )}
            </Stack>
          </Card.Body>
        </Card.Root>

        {!isLoading && (
          <Text color="gray.600">
            Found <strong>{totalCount.toLocaleString()}</strong> games
            {allGames.length > 0 && ` (showing ${allGames.length})`}
          </Text>
        )}

        {isLoading && (
          <Box display="flex" alignItems="center" justifyContent="center" py={12}>
            <Spinner size="xl" color="blue.500" />
          </Box>
        )}

        {!isLoading && (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={6}>
            {allGames.map((game: any) => (
              <Link key={game.id} href={`/games/${game.slug}`}>
                <Card.Root 
                  overflow="hidden"
                  _hover={{ shadow: 'xl', transform: 'translateY(-4px)' }}
                  transition="all 0.3s"
                  cursor="pointer"
                  bg="white"
                  height="100%"
                >
                  <Box position="relative" paddingBottom="56.25%" bg="gray.200" overflow="hidden">
                    {game.background_image ? (
                      <Image 
                        src={game.background_image} 
                        alt={game.name}
                        position="absolute"
                        top={0}
                        left={0}
                        width="100%"
                        height="100%"
                        objectFit="cover"
                      />
                    ) : (
                      <Box 
                        position="absolute"
                        top={0}
                        left={0}
                        width="100%"
                        height="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg="gray.300"
                      >
                        <Text color="gray.500">No image</Text>
                      </Box>
                    )}
                    {game.metacritic && (
                      <Badge 
                        position="absolute"
                        top={2}
                        right={2}
                        colorScheme={game.metacritic >= 75 ? 'green' : game.metacritic >= 50 ? 'yellow' : 'red'}
                        fontSize="md"
                        px={2}
                        py={1}
                      >
                        {game.metacritic}
                      </Badge>
                    )}
                  </Box>
                  
                  <Card.Body>
                    <Stack spacing={3}>
                      <Heading size="sm" noOfLines={2} minH="40px">{game.name}</Heading>
                      
                      {game.rating > 0 && (
                        <Box display="flex" alignItems="center" gap={2}>
                          <Box display="flex" gap={0.5}>
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={i < Math.floor(game.rating) ? 'text-yellow-400' : 'text-gray-300'}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                style={{ width: '14px', height: '14px' }}
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </Box>
                          <Text fontSize="sm" color="gray.600">
                            {game.rating.toFixed(1)}
                          </Text>
                        </Box>
                      )}

                      {game.platforms && game.platforms.length > 0 && (
                        <Box display="flex" gap={1} flexWrap="wrap">
                          {game.platforms.slice(0, 3).map((p: any, idx: number) => (
                            <Badge key={idx} size="sm" colorScheme="gray" fontSize="xs">
                              {p.platform.name}
                            </Badge>
                          ))}
                          {game.platforms.length > 3 && (
                            <Badge size="sm" colorScheme="gray" fontSize="xs">
                              +{game.platforms.length - 3}
                            </Badge>
                          )}
                        </Box>
                      )}

                      {game.released && (
                        <Text fontSize="xs" color="gray.500">
                          Released: {new Date(game.released).toLocaleDateString()}
                        </Text>
                      )}
                    </Stack>
                  </Card.Body>
                </Card.Root>
              </Link>
            ))}
          </SimpleGrid>
        )}

        <div ref={observerTarget} style={{ height: '20px' }} />

        {isFetchingNextPage && (
          <Box display="flex" alignItems="center" justifyContent="center" py={8}>
            <Spinner size="lg" color="blue.500" />
            <Text ml={3} color="gray.600">Loading more games...</Text>
          </Box>
        )}

        {!hasNextPage && allGames.length > 0 && (
          <Box textAlign="center" py={8}>
            <Text color="gray.500">You've reached the end of the results</Text>
          </Box>
        )}

        {!isLoading && allGames.length === 0 && (
          <Box textAlign="center" py={12}>
            <Text fontSize="lg" color="gray.500">No games found. Try adjusting your filters.</Text>
          </Box>
        )}
      </Stack>
    </Box>
  )
}
