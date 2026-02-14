"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/app/_services/dummyjson";
import { Box, Heading, Text, Badge, Button, Card, Stack, Grid, Spinner } from "@chakra-ui/react";
import Link from "next/link";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" minH="400px">
        <Spinner size="xl" color="blue.500" />
      </Box>
    );
  }

  if (!data) return <Text>Product not found</Text>;

  return (
    <Box maxW="6xl">
      <Button as={Link} href="/dashboard/products" variant="ghost" mb={6} size="sm">
        ← Back to Products
      </Button>

      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
        <Box>
          <Card.Root overflow="hidden" bg="white">
            <Box position="relative" paddingBottom="100%" bg="gray.100">
              <img 
                src={data.thumbnail} 
                alt={data.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  padding: '20px',
                }}
              />
              {data.discountPercentage > 0 && (
                <Badge 
                  position="absolute" 
                  top={4} 
                  right={4}
                  colorScheme="red"
                  fontSize="lg"
                  px={3}
                  py={1}
                >
                  -{data.discountPercentage}% OFF
                </Badge>
              )}
            </Box>
          </Card.Root>

          {data.images && data.images.length > 1 && (
            <Grid templateColumns="repeat(4, 1fr)" gap={2} mt={4}>
              {data.images.slice(0, 4).map((img: string, idx: number) => (
                <Box 
                  key={idx} 
                  borderWidth="1px" 
                  borderRadius="md" 
                  overflow="hidden"
                  bg="gray.100"
                  paddingBottom="100%"
                  position="relative"
                >
                  <img 
                    src={img} 
                    alt={`${data.title} ${idx + 1}`}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              ))}
            </Grid>
          )}
        </Box>

        <Stack spacing={6}>
          <Box>
            <Badge colorScheme="blue" mb={2}>{data.category}</Badge>
            <Heading size="2xl" mb={2}>{data.title}</Heading>
            <Text fontSize="lg" color="gray.600" mb={4}>{data.brand}</Text>
            
            <Box display="flex" alignItems="center" gap={2} mb={4}>
              <Box display="flex" gap={0.5}>
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={i < Math.floor(data.rating) ? 'text-yellow-400' : 'text-gray-300'}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    style={{ width: '20px', height: '20px' }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </Box>
              <Text fontWeight="semibold">{data.rating}</Text>
              <Text color="gray.500">• {data.stock} in stock</Text>
            </Box>
          </Box>

          <Box borderWidth="1px" borderRadius="lg" p={6} bg="gray.50">
            <Box display="flex" alignItems="baseline" gap={3} mb={2}>
              <Text fontSize="4xl" fontWeight="bold" color="blue.600">
                ${data.price}
              </Text>
              {data.discountPercentage > 0 && (
                <Text fontSize="xl" color="gray.500" textDecoration="line-through">
                  ${(data.price / (1 - data.discountPercentage / 100)).toFixed(2)}
                </Text>
              )}
            </Box>
            {data.discountPercentage > 0 && (
              <Text color="green.600" fontWeight="semibold">
                You save ${((data.price / (1 - data.discountPercentage / 100)) - data.price).toFixed(2)} ({data.discountPercentage}%)
              </Text>
            )}
          </Box>

          <Box>
            <Heading size="md" mb={3}>Description</Heading>
            <Text color="gray.700" lineHeight="tall">{data.description}</Text>
          </Box>

          <Card.Root>
            <Card.Body>
              <Grid templateColumns="1fr 1fr" gap={4}>
                <Box>
                  <Text fontWeight="semibold" color="gray.600" fontSize="sm">SKU</Text>
                  <Text>{data.sku}</Text>
                </Box>
                <Box>
                  <Text fontWeight="semibold" color="gray.600" fontSize="sm">Weight</Text>
                  <Text>{data.weight}g</Text>
                </Box>
                <Box>
                  <Text fontWeight="semibold" color="gray.600" fontSize="sm">Dimensions</Text>
                  <Text>{data.dimensions?.width} × {data.dimensions?.height} × {data.dimensions?.depth} cm</Text>
                </Box>
                <Box>
                  <Text fontWeight="semibold" color="gray.600" fontSize="sm">Warranty</Text>
                  <Text>{data.warrantyInformation || 'N/A'}</Text>
                </Box>
                <Box>
                  <Text fontWeight="semibold" color="gray.600" fontSize="sm">Shipping</Text>
                  <Text>{data.shippingInformation || 'Standard'}</Text>
                </Box>
                <Box>
                  <Text fontWeight="semibold" color="gray.600" fontSize="sm">Return Policy</Text>
                  <Text>{data.returnPolicy || '30 days'}</Text>
                </Box>
              </Grid>
            </Card.Body>
          </Card.Root>

          {data.tags && data.tags.length > 0 && (
            <Box>
              <Text fontWeight="semibold" mb={2}>Tags</Text>
              <Box display="flex" gap={2} flexWrap="wrap">
                {data.tags.map((tag: string, idx: number) => (
                  <Badge key={idx} colorScheme="gray">{tag}</Badge>
                ))}
              </Box>
            </Box>
          )}

          <Button colorScheme="blue" size="lg" width="100%">
            Add to Cart
          </Button>
        </Stack>
      </Grid>
    </Box>
  );
}
