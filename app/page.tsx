'use client'

import Link from 'next/link'
import { Box, Heading, Text, Button, Stack, SimpleGrid, Card } from '@chakra-ui/react'

export default function HomePage() {
  return (
    <Box minH="100vh" bg="gray.50">
      {/* Hero Section */}
      <Box 
        position="relative"
        bgGradient="to-br"
        gradientFrom="blue.600"
        gradientVia="purple.600"
        gradientTo="pink.500"
        color="white"
        overflow="hidden"
      >
        {/* Animated Background Pattern */}
        <Box 
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.1}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <Box 
          maxW="7xl" 
          mx="auto" 
          px={8} 
          py={24}
          position="relative"
          textAlign="center"
        >
          {/* Main Hero Content */}
          <Stack spacing={8} alignItems="center">
            {/* Badge */}
            <Box 
              bg="whiteAlpha.200" 
              backdropFilter="blur(10px)"
              px={4} 
              py={2} 
              borderRadius="full"
              border="1px solid"
              borderColor="whiteAlpha.300"
            >
              <Text fontSize="sm" fontWeight="medium">
                ✨ Modern Frontend Application
              </Text>
            </Box>

            {/* Heading */}
            <Heading 
              size="4xl" 
              lineHeight="1.2"
              maxW="4xl"
              fontWeight="black"
            >
              Welcome to the
              <Box 
                as="span" 
                display="block"
                color="white"
                mt={2}
              >
                Frontend Challenge
              </Box>
            </Heading>

            {/* Subheading */}
            <Text 
              fontSize="xl" 
              maxW="2xl" 
              color="whiteAlpha.900"
              lineHeight="tall"
            >
              A powerful dashboard application built with Next.js, React, TypeScript, 
              Chakra UI, and Tailwind CSS. Explore products, manage users, and discover games.
            </Text>

            {/* CTA Buttons */}
            <Stack 
              direction={{ base: 'column', sm: 'row' }} 
              spacing={4}
              pt={4}
            >
              <Button 
                as={Link}
                href="/login"
                size="xl"
                bg="white"
                color="blue.600"
                _hover={{ bg: 'gray.100', transform: 'translateY(-2px)', shadow: 'xl' }}
                transition="all 0.2s"
                px={8}
                py={7}
                fontSize="lg"
                fontWeight="bold"
                shadow="lg"
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
                  </svg>
                  Go to Dashboard
                </Box>
              </Button>
              
              <Button 
                as={Link}
                href="/games"
                size="xl"
                variant="outline"
                borderColor="white"
                color="white"
                _hover={{ bg: 'whiteAlpha.200', transform: 'translateY(-2px)', shadow: 'xl' }}
                transition="all 0.2s"
                px={8}
                py={7}
                fontSize="lg"
                fontWeight="bold"
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.58 16.09l-1.09-7.66A3.996 3.996 0 0016.53 5H7.47C5.48 5 3.79 6.46 3.51 8.43l-1.09 7.66C2.2 17.63 3.39 19 4.94 19c.68 0 1.32-.27 1.8-.75L9 16h6l2.25 2.25c.48.48 1.13.75 1.8.75 1.56 0 2.75-1.37 2.53-2.91z"/>
                  </svg>
                  Explore Games
                </Box>
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>

      {/* Features Section */}
      <Box maxW="7xl" mx="auto" px={8} py={20}>
        <Box textAlign="center" mb={16}>
          <Heading size="2xl" mb={4} color="gray.800">What's Inside</Heading>
          <Text fontSize="lg" color="gray.600">
            Discover the powerful features of this application
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
          {/* Feature 1 */}
          <Card.Root 
            bg="white" 
            shadow="lg"
            borderWidth="1px"
            borderColor="gray.200"
            _hover={{ shadow: 'xl', transform: 'translateY(-4px)' }}
            transition="all 0.3s"
          >
            <Card.Body p={8}>
              <Box 
                width="60px" 
                height="60px" 
                bg="blue.50" 
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={6}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
              </Box>
              <Heading size="md" mb={3}>Product Management</Heading>
              <Text color="gray.600" lineHeight="tall">
                Browse, filter, and manage products with advanced filtering capabilities. 
                View detailed product information, ratings, and pricing.
              </Text>
            </Card.Body>
          </Card.Root>

          {/* Feature 2 */}
          <Card.Root 
            bg="white" 
            shadow="lg"
            borderWidth="1px"
            borderColor="gray.200"
            _hover={{ shadow: 'xl', transform: 'translateY(-4px)' }}
            transition="all 0.3s"
          >
            <Card.Body p={8}>
              <Box 
                width="60px" 
                height="60px" 
                bg="purple.50" 
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={6}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9333EA" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                  <path d="M16 3.13a4 4 0 010 7.75"/>
                </svg>
              </Box>
              <Heading size="md" mb={3}>User Management</Heading>
              <Text color="gray.600" lineHeight="tall">
                View and manage users with comprehensive profiles including contact 
                information, company details, and role assignments.
              </Text>
            </Card.Body>
          </Card.Root>

          {/* Feature 3 */}
          <Card.Root 
            bg="white" 
            shadow="lg"
            borderWidth="1px"
            borderColor="gray.200"
            _hover={{ shadow: 'xl', transform: 'translateY(-4px)' }}
            transition="all 0.3s"
          >
            <Card.Body p={8}>
              <Box 
                width="60px" 
                height="60px" 
                bg="pink.50" 
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={6}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </Box>
              <Heading size="md" mb={3}>Games Library</Heading>
              <Text color="gray.600" lineHeight="tall">
                Explore thousands of games with detailed information, ratings, screenshots, 
                and platform availability from the RAWG database.
              </Text>
            </Card.Body>
          </Card.Root>

          {/* Feature 4 */}
          <Card.Root 
            bg="white" 
            shadow="lg"
            borderWidth="1px"
            borderColor="gray.200"
            _hover={{ shadow: 'xl', transform: 'translateY(-4px)' }}
            transition="all 0.3s"
          >
            <Card.Body p={8}>
              <Box 
                width="60px" 
                height="60px" 
                bg="green.50" 
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={6}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </Box>
              <Heading size="md" mb={3}>Advanced Components</Heading>
              <Text color="gray.600" lineHeight="tall">
                Features advanced UI components including multi-select with virtualization, 
                search, grouping, and select all/none functionality.
              </Text>
            </Card.Body>
          </Card.Root>

          {/* Feature 5 */}
          <Card.Root 
            bg="white" 
            shadow="lg"
            borderWidth="1px"
            borderColor="gray.200"
            _hover={{ shadow: 'xl', transform: 'translateY(-4px)' }}
            transition="all 0.3s"
          >
            <Card.Body p={8}>
              <Box 
                width="60px" 
                height="60px" 
                bg="yellow.50" 
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={6}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </Box>
              <Heading size="md" mb={3}>Modern Tech Stack</Heading>
              <Text color="gray.600" lineHeight="tall">
                Built with Next.js 16, React 19, TypeScript, Chakra UI v3, Tailwind CSS 4, 
                and React Query for optimal performance.
              </Text>
            </Card.Body>
          </Card.Root>

          {/* Feature 6 */}
          <Card.Root 
            bg="white" 
            shadow="lg"
            borderWidth="1px"
            borderColor="gray.200"
            _hover={{ shadow: 'xl', transform: 'translateY(-4px)' }}
            transition="all 0.3s"
          >
            <Card.Body p={8}>
              <Box 
                width="60px" 
                height="60px" 
                bg="indigo.50" 
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={6}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </Box>
              <Heading size="md" mb={3}>Responsive Design</Heading>
              <Text color="gray.600" lineHeight="tall">
                Fully responsive interface that works beautifully on all devices, 
                from mobile phones to desktop computers.
              </Text>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>
      </Box>

      {/* CTA Section */}
      <Box bg="gray.100" py={20}>
        <Box maxW="4xl" mx="auto" textAlign="center" px={8}>
          <Heading size="2xl" mb={4} color="gray.800">Ready to Get Started?</Heading>
          <Text fontSize="lg" color="gray.600" mb={8}>
            Login to access the dashboard or explore the games library
          </Text>
          <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} justifyContent="center">
            <Button 
              as={Link}
              href="/login"
              colorScheme="blue"
              size="lg"
              px={8}
            >
              Login to Dashboard
            </Button>
            <Button 
              as={Link}
              href="/games"
              variant="outline"
              colorScheme="blue"
              size="lg"
              px={8}
            >
              Browse Games
            </Button>
          </Stack>
          <Text fontSize="sm" color="gray.500" mt={6}>
            Demo credentials: <strong className='!mr-1'>emilys</strong>/<strong className='!ml-1'>emilyspass</strong>
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

