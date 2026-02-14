"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Heading,
  Image,
  Text,
  Spinner,
  Badge,
  Card,
  Stack,
  Grid,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function GameDetailPage({ params }: Props) {
  const { slug } = use(params);

  const { data: game, isLoading } = useQuery({
    queryKey: ["game", slug],
    queryFn: async () => {
      const res = await fetch(
        `https://api.rawg.io/api/games/${slug}?key=${process.env.NEXT_PUBLIC_RAWG_KEY}`,
      );
      if (!res.ok) throw new Error("Failed to fetch game");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        minH='400px'
      >
        <Spinner size='xl' color='blue.500' />
      </Box>
    );
  }

  if (!game) return <Text>Game not found</Text>;

  return (
    <Box p={8} bg='gray.50' minH='100vh'>
      <Box maxW='7xl' mx='auto'>
        <Button as={Link} href='/games' variant='ghost' mb={6} size='sm'>
          ← Back to Games
        </Button>

        <Stack spacing={8}>
          <Box
            position='relative'
            borderRadius='xl'
            overflow='hidden'
            shadow='2xl'
          >
            <Box position='relative' paddingBottom='50%' bg='gray.900'>
              {game.background_image && (
                <Image
                  src={game.background_image}
                  alt={game.name}
                  position='absolute'
                  top={0}
                  left={0}
                  width='100%'
                  height='100%'
                  objectFit='cover'
                  opacity={0.7}
                />
              )}
              <Box
                position='absolute'
                bottom={0}
                left={0}
                right={0}
                p={8}
                bgGradient='to-t'
                gradientFrom='blackAlpha.900'
                gradientTo='transparent'
              >
                <Heading size='3xl' color='white' mb={2}>
                  {game.name}
                </Heading>
                {game.metacritic && (
                  <Badge
                    colorScheme={
                      game.metacritic >= 75
                        ? "green"
                        : game.metacritic >= 50
                          ? "yellow"
                          : "red"
                    }
                    fontSize='lg'
                    px={3}
                    py={1}
                  >
                    Metacritic: {game.metacritic}
                  </Badge>
                )}
              </Box>
            </Box>
          </Box>

          <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
            <Stack spacing={6}>
              <Card.Root bg='white'>
                <Card.Body>
                  <Heading size='lg' mb={4}>
                    About
                  </Heading>
                  <Text
                    color='gray.700'
                    lineHeight='tall'
                    dangerouslySetInnerHTML={{
                      __html:
                        game.description ||
                        game.description_raw ||
                        "No description available",
                    }}
                  />
                </Card.Body>
              </Card.Root>

              {game.platforms && game.platforms.length > 0 && (
                <Card.Root bg='white'>
                  <Card.Body>
                    <Heading size='md' mb={3}>
                      Available Platforms
                    </Heading>
                    <Box display='flex' gap={2} flexWrap='wrap'>
                      {game.platforms.map((p: any, idx: number) => (
                        <Badge
                          key={idx}
                          colorScheme='blue'
                          fontSize='sm'
                          px={3}
                          py={1}
                        >
                          {p.platform.name}
                        </Badge>
                      ))}
                    </Box>
                  </Card.Body>
                </Card.Root>
              )}

              {(game.genres?.length > 0 || game.tags?.length > 0) && (
                <Card.Root bg='white'>
                  <Card.Body>
                    {game.genres?.length > 0 && (
                      <Box mb={game.tags?.length > 0 ? 4 : 0}>
                        <Heading size='md' mb={3}>
                          Genres
                        </Heading>
                        <Box display='flex' gap={2} flexWrap='wrap'>
                          {game.genres.map((g: any, idx: number) => (
                            <Badge
                              key={idx}
                              colorScheme='purple'
                              fontSize='sm'
                              px={3}
                              py={1}
                            >
                              {g.name}
                            </Badge>
                          ))}
                        </Box>
                      </Box>
                    )}
                    {game.tags?.length > 0 && (
                      <Box>
                        <Heading size='md' mb={3}>
                          Tags
                        </Heading>
                        <Box display='flex' gap={2} flexWrap='wrap'>
                          {game.tags.slice(0, 15).map((t: any, idx: number) => (
                            <Badge
                              key={idx}
                              colorScheme='gray'
                              fontSize='xs'
                              px={2}
                              py={1}
                            >
                              {t.name}
                            </Badge>
                          ))}
                        </Box>
                      </Box>
                    )}
                  </Card.Body>
                </Card.Root>
              )}

              {game.short_screenshots && game.short_screenshots.length > 1 && (
                <Card.Root bg='white'>
                  <Card.Body>
                    <Heading size='md' mb={4}>
                      Screenshots
                    </Heading>
                    <Grid
                      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                      gap={4}
                    >
                      {game.short_screenshots
                        .slice(1, 5)
                        .map((screenshot: any, idx: number) => (
                          <Box
                            key={idx}
                            borderRadius='md'
                            overflow='hidden'
                            position='relative'
                            paddingBottom='56.25%'
                            bg='gray.200'
                          >
                            <Image
                              src={screenshot.image}
                              alt={`Screenshot ${idx + 1}`}
                              position='absolute'
                              top={0}
                              left={0}
                              width='100%'
                              height='100%'
                              objectFit='cover'
                            />
                          </Box>
                        ))}
                    </Grid>
                  </Card.Body>
                </Card.Root>
              )}
            </Stack>

            <Stack spacing={6}>
              <Card.Root bg='white'>
                <Card.Body>
                  <Heading size='md' mb={4}>
                    Game Info
                  </Heading>
                  <Stack spacing={3}>
                    {game.released && (
                      <Box>
                        <Text
                          fontSize='sm'
                          color='gray.600'
                          fontWeight='semibold'
                        >
                          Release Date
                        </Text>
                        <Text>
                          {new Date(game.released).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </Text>
                      </Box>
                    )}
                    {game.developers && game.developers.length > 0 && (
                      <Box>
                        <Text
                          fontSize='sm'
                          color='gray.600'
                          fontWeight='semibold'
                        >
                          Developers
                        </Text>
                        <Text>
                          {game.developers.map((d: any) => d.name).join(", ")}
                        </Text>
                      </Box>
                    )}
                    {game.publishers && game.publishers.length > 0 && (
                      <Box>
                        <Text
                          fontSize='sm'
                          color='gray.600'
                          fontWeight='semibold'
                        >
                          Publishers
                        </Text>
                        <Text>
                          {game.publishers.map((p: any) => p.name).join(", ")}
                        </Text>
                      </Box>
                    )}
                    {game.esrb_rating && (
                      <Box>
                        <Text
                          fontSize='sm'
                          color='gray.600'
                          fontWeight='semibold'
                        >
                          ESRB Rating
                        </Text>
                        <Badge colorScheme='orange'>
                          {game.esrb_rating.name}
                        </Badge>
                      </Box>
                    )}
                  </Stack>
                </Card.Body>
              </Card.Root>

              <Card.Root bg='white'>
                <Card.Body>
                  <Heading size='md' mb={4}>
                    Ratings
                  </Heading>
                  <Stack spacing={3}>
                    {game.rating > 0 && (
                      <Box>
                        <Box
                          display='flex'
                          alignItems='center'
                          justifyContent='space-between'
                          mb={2}
                        >
                          <Text fontSize='sm' color='gray.600'>
                            Average Rating
                          </Text>
                          <Text fontWeight='bold' fontSize='lg'>
                            {game.rating.toFixed(1)} / 5
                          </Text>
                        </Box>
                        <Box display='flex' gap={1}>
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={
                                i < Math.floor(game.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              style={{ width: "20px", height: "20px" }}
                            >
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                          ))}
                        </Box>
                      </Box>
                    )}
                    {game.ratings_count && (
                      <Box>
                        <Text fontSize='sm' color='gray.600'>
                          Total Ratings
                        </Text>
                        <Text fontWeight='semibold'>
                          {game.ratings_count.toLocaleString()}
                        </Text>
                      </Box>
                    )}
                  </Stack>
                </Card.Body>
              </Card.Root>

              {(game.website || game.reddit_url) && (
                <Card.Root bg='white'>
                  <Card.Body>
                    <Heading size='md' mb={4}>
                      Links
                    </Heading>
                    <Stack spacing={2}>
                      {game.website && (
                        <Button
                          as='a'
                          href={game.website}
                          target='_blank'
                          rel='noopener noreferrer'
                          colorScheme='blue'
                          width='100%'
                        >
                          Official Website
                        </Button>
                      )}
                      {game.reddit_url && (
                        <Button
                          as='a'
                          href={game.reddit_url}
                          target='_blank'
                          rel='noopener noreferrer'
                          variant='outline'
                          colorScheme='orange'
                          width='100%'
                        >
                          Reddit Community
                        </Button>
                      )}
                    </Stack>
                  </Card.Body>
                </Card.Root>
              )}
            </Stack>
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
}
