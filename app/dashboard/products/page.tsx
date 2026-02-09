'use client'
import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import { useState } from 'react'
import { useProducts } from '@/app/_hooks/useProducts' 
import AdvancedSelect from '@/app/_components/ui/AdvancedSelect/AdvancedSelect' 
import { SelectItem } from '@/app/_components/ui/AdvancedSelect/types' 
import Link from 'next/link'

export default function ProductsPage() {
  const { data } = useProducts()
  const [selected, setSelected] = useState<SelectItem[]>([])

  const items: SelectItem[] = data?.products.map(p => ({
    id: p.id.toString(),
    label: p.title,
  })) || []

  const filtered = selected.length
    ? data?.products.filter(p => selected.some(s => s.id === p.id.toString()))
    : data?.products

  return (
    <Box>
      <Heading size="md" mb={4}>Products</Heading>

      <AdvancedSelect items={items} value={selected} onChange={setSelected} />

      <SimpleGrid columns={3} spacing={4} mt={4}>
        {filtered?.map(p => (
          <Box key={p.id} borderWidth="1px" rounded="md" p={3} as={Link} href={`/dashboard/products/${p.id}`}>
            <img src={p.thumbnail} className="mb-2 rounded" />
            <p className="font-bold">{p.title}</p>
            <p>${p.price}</p>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}
