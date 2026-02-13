'use client'

import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { AuthProvider } from './_context/AuthContext' 
import { system } from './theme' 

export default function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient())

  const system = createSystem(defaultConfig, {
  globalCss: {
    body: {
      colorPalette: 'blue',
    },
  },
  theme: {
    tokens: {
      fonts: {
        body: { value: 'var(--font-outfit)' },
      },
    },
    semanticTokens: {
      radii: {
        l1: { value: '0.125rem' },
        l2: { value: '0.25rem' },
        l3: { value: '0.375rem' },
      },
    },
  },
})
  
  return (
    <QueryClientProvider client={client}>
      <ChakraProvider value={system}>
        <AuthProvider>{children}</AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

