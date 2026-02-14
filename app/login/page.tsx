"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  Card,
  Stack,
} from "@chakra-ui/react";
import { useAuth } from "../_context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(username, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      minH='100vh'
      bgGradient='to-br'
      gradientFrom='blue.500'
      gradientTo='purple.600'
      p={4}
    >
      <Button
        as={Link}
        href='/'
        position='absolute'
        top={4}
        left={4}
        variant='ghost'
        color='white'
        _hover={{ bg: "whiteAlpha.200" }}
      >
        ← Back to Home
      </Button>

      <Card.Root
        maxW='md'
        w='full'
        bg='white'
        shadow='2xl'
        borderRadius='xl'
        overflow='hidden'
      >
        <Box
          bgGradient='to-r'
          gradientFrom='blue.600'
          gradientTo='purple.600'
          p={8}
          textAlign='center'
        >
          <Heading size='2xl' color='white' mb={2}>
            Welcome Back
          </Heading>
          <Text color='whiteAlpha.900'>
            Sign in to continue to your dashboard
          </Text>
        </Box>

        <Card.Body p={8}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={5}>
              <Box>
                <Text mb={2} fontWeight='medium' fontSize='sm' color='gray.700'>
                  Username
                </Text>
                <Input
                  placeholder='Enter your username'
                  size='lg'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  borderColor='gray.300'
                  _focus={{ borderColor: "blue.500", shadow: "md" }}
                />
              </Box>

              <Box>
                <Text mb={2} fontWeight='medium' fontSize='sm' color='gray.700'>
                  Password
                </Text>
                <Input
                  placeholder='Enter your password'
                  type='password'
                  size='lg'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  borderColor='gray.300'
                  _focus={{ borderColor: "blue.500", shadow: "md" }}
                />
              </Box>

              {error && (
                <Box
                  bg='red.50'
                  borderWidth='1px'
                  borderColor='red.200'
                  borderRadius='md'
                  p={3}
                >
                  <Text color='red.700' fontSize='sm'>
                    {error}
                  </Text>
                </Box>
              )}

              <Button
                type='submit'
                colorScheme='blue'
                size='lg'
                w='full'
                loading={loading}
                loadingText='Signing in...'
              >
                Sign In
              </Button>

              <Box pt={4} borderTopWidth='1px' borderColor='gray.200'>
                <Text fontSize='sm' color='gray.600' textAlign='center'>
                  Demo credentials: <strong className='!mr-1'>emilys</strong>/
                  <strong className='!ml-1'>emilyspass</strong>
                </Text>
              </Box>
            </Stack>
          </form>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
