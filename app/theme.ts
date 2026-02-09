import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const showcaseConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#eef2ff' },
          100: { value: '#e0e7ff' },
          500: { value: '#6366f1' },
          600: { value: '#4f46e5' },
        },
        gray: {
          50: { value: '#f9fafb' },
          100: { value: '#f3f4f6' },
          900: { value: '#111827' },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, showcaseConfig)
