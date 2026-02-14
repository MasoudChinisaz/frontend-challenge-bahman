"use client";
import {
  Box,
  Heading,
  SimpleGrid,
  Badge,
  Card,
  Text,
  Spinner,
  Stack,
  Input,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { useProducts } from "@/app/_hooks/useProducts";
import AdvancedSelect from "@/app/_components/ui/AdvancedSelect/AdvancedSelect";
import { SelectItem } from "@/app/_components/ui/AdvancedSelect/types";
import Link from "next/link";
import { Product } from "@/app/_types";

export default function ProductsPage() {
  const { data, isLoading } = useProducts();
  const [selectedCategories, setSelectedCategories] = useState<SelectItem[]>(
    [],
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

 const products = useMemo(() => data?.products ?? [], [data?.products]);


const categoryOptions: SelectItem[] = useMemo(() => {
  const categories = new Set<string>();
  products.forEach((p) => {
    if (p.category) categories.add(p.category);
  });

  return Array.from(categories).map((cat) => ({
    id: cat,
    label: cat.charAt(0).toUpperCase() + cat.slice(1),
    group: "Categories",
  }));
}, [products]);

const filtered = useMemo(() => {
  return products.filter((product: Product) => {
    if (selectedCategories.length > 0) {
      if (!selectedCategories.some((cat) => cat.id === product.category)) return false;
    }

    if (searchQuery) {
      if (!product.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    }

    if (minPrice && product.price < parseFloat(minPrice)) return false;
    if (maxPrice && product.price > parseFloat(maxPrice)) return false;

    return true;
  });
}, [products, selectedCategories, searchQuery, minPrice, maxPrice]);


  if (isLoading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minH="400px"
      >
        <Spinner size="xl" color="blue.500" />
      </Box>
    );
  }

  const hasActiveFilters =
    selectedCategories.length > 0 || searchQuery || minPrice || maxPrice;

  return (
    <Box>
      <Stack spacing={8}>
        <Box>
          <Heading size="2xl" mb={3} color="gray.800">
            Products
          </Heading>
          <Text color="gray.600" fontSize="lg">
            Browse and filter our product catalog
          </Text>
        </Box>

        <Card.Root
          bg="white"
          shadow="md"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <Card.Body p={6}>
            <Stack spacing={5}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontWeight="bold" fontSize="lg" color="gray.700">
                  Filter Products
                </Text>
                {hasActiveFilters && (
                  <Badge colorScheme="blue" fontSize="sm" px={3} py={1}>
                    {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                  </Badge>
                )}
              </Box>

              <Box>
                <Text fontWeight="medium" mb={2}>
                  Search
                </Text>
                <Input
                  placeholder="Search products by name..."
                  size="lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  bg="white"
                  borderColor="gray.200"
                  className="shadow-sm! rounded-lg! hover:border-gray-500! transition!"
                  _focus={{ borderColor: "blue.500", shadow: "md" }}
                />
              </Box>

              <Box>
                <Text fontWeight="medium" mb={2}>
                  Categories
                </Text>
                <AdvancedSelect
                  items={categoryOptions}
                  value={selectedCategories}
                  onChange={setSelectedCategories}
                  placeholder="Filter by category..."
                  searchPlaceholder="Search categories..."
                />
              </Box>

              <Box>
                <Text fontWeight="medium" mb={2}>
                  Price Range
                </Text>
                <Box display="flex" gap={3}>
                  <Input
                    placeholder="Min price"
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    borderColor="gray.200"
                    className="shadow-sm! rounded-lg! hover:border-gray-500! transition!"
                    _focus={{ borderColor: "blue.500" }}
                  />
                  <Input
                    placeholder="Max price"
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    borderColor="gray.200"
                    className="shadow-sm! rounded-lg! hover:border-gray-500! transition!"
                    _focus={{ borderColor: "blue.500" }}
                  />
                </Box>
              </Box>

              {hasActiveFilters && (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  pt={3}
                  borderTopWidth="1px"
                  borderColor="gray.200"
                >
                  <Box display="flex" gap={2} flexWrap="wrap" flex="1">
                    {selectedCategories.map((cat) => (
                      <Badge key={cat.id} colorScheme="purple" fontSize="sm">
                        {cat.label}
                      </Badge>
                    ))}
                    {searchQuery && (
                      <Badge colorScheme="blue" fontSize="sm">
                        Search: "{searchQuery}"
                      </Badge>
                    )}
                    {(minPrice || maxPrice) && (
                      <Badge colorScheme="green" fontSize="sm">
                        ${minPrice || "0"} - ${maxPrice || "∞"}
                      </Badge>
                    )}
                  </Box>
                  <Text
                    fontSize="sm"
                    color="blue.600"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                    onClick={() => {
                      setSelectedCategories([]);
                      setSearchQuery("");
                      setMinPrice("");
                      setMaxPrice("");
                    }}
                    whiteSpace="nowrap"
                    ml={3}
                  >
                    Clear all
                  </Text>
                </Box>
              )}

              <Text fontSize="sm" color="gray.600">
                Showing <strong>{filtered.length}</strong> of{" "}
                <strong>{data?.products.length}</strong> products
              </Text>
            </Stack>
          </Card.Body>
        </Card.Root>

        {/* Products Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={6}>
          {filtered.map((p: Product) => (
            <Link key={p.id} href={`/dashboard/products/${p.id}`}>
              <Card.Root
                overflow="hidden"
                _hover={{ shadow: "xl", transform: "translateY(-4px)" }}
                transition="all 0.3s"
                cursor="pointer"
                bg="white"
                height="100%"
                borderWidth="1px"
                borderColor="gray.200"
              >
                <Box
                  position="relative"
                  paddingBottom="75%"
                  overflow="hidden"
                  bg="gray.50"
                >
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {p.discountPercentage > 0 && (
                    <Badge
                      position="absolute"
                      top={3}
                      right={3}
                      colorScheme="red"
                      fontSize="md"
                      px={2}
                      py={1}
                      shadow="md"
                    >
                      -{p.discountPercentage.toFixed(0)}%
                    </Badge>
                  )}
                  <Badge
                    position="absolute"
                    bottom={3}
                    left={3}
                    colorScheme="blue"
                    fontSize="xs"
                    px={2}
                    py={1}
                  >
                    {p.category}
                  </Badge>
                </Box>

                <Card.Body p={4}>
                  <Stack spacing={3}>
                    <Heading
                      size="sm"
                      noOfLines={2}
                      minH="44px"
                      lineHeight="1.4"
                    >
                      {p.title}
                    </Heading>

                    <Box>
                      <Box display="flex" alignItems="baseline" gap={2} mb={1}>
                        <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                          ${p.price}
                        </Text>
                        {p.discountPercentage > 0 && (
                          <Text
                            fontSize="sm"
                            color="gray.500"
                            textDecoration="line-through"
                          >
                            $
                            {(
                              p.price /
                              (1 - p.discountPercentage / 100)
                            ).toFixed(2)}
                          </Text>
                        )}
                      </Box>
                      {p.discountPercentage > 0 && (
                        <Text
                          fontSize="xs"
                          color="green.600"
                          fontWeight="semibold"
                        >
                          Save $
                          {(
                            p.price / (1 - p.discountPercentage / 100) -
                            p.price
                          ).toFixed(2)}
                        </Text>
                      )}
                    </Box>

                    <Box display="flex" alignItems="center" gap={2}>
                      <Box display="flex" gap={0.5}>
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={
                              i < Math.floor(p.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            style={{ width: "16px", height: "16px" }}
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </Box>
                      <Text fontSize="sm" fontWeight="medium" color="gray.600">
                        {p.rating.toFixed(1)}
                      </Text>
                    </Box>

                    <Box display="flex" alignItems="center" gap={2}>
                      <Box
                        width="8px"
                        height="8px"
                        borderRadius="full"
                        bg={
                          p.stock > 50
                            ? "green.500"
                            : p.stock > 0
                              ? "yellow.500"
                              : "red.500"
                        }
                      />
                      <Text fontSize="xs" color="gray.600">
                        {p.stock > 50
                          ? "In Stock"
                          : p.stock > 0
                            ? "Low Stock"
                            : "Out of Stock"}
                      </Text>
                    </Box>
                  </Stack>
                </Card.Body>
              </Card.Root>
            </Link>
          ))}
        </SimpleGrid>

        {filtered.length === 0 && (
          <Card.Root bg="white" p={12}>
            <Box textAlign="center">
              <Box mb={4}>
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  style={{ margin: "0 auto", color: "#CBD5E0" }}
                >
                  <circle cx="11" cy="11" r="8" strokeWidth="2" />
                  <path d="M21 21l-4.35-4.35" strokeWidth="2" />
                </svg>
              </Box>
              <Text fontSize="xl" fontWeight="bold" color="gray.700" mb={2}>
                No products found
              </Text>
              <Text color="gray.500" mb={4}>
                Try adjusting your filters or search criteria
              </Text>
              {hasActiveFilters && (
                <Text
                  color="blue.600"
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                  onClick={() => {
                    setSelectedCategories([]);
                    setSearchQuery("");
                    setMinPrice("");
                    setMaxPrice("");
                  }}
                  fontWeight="semibold"
                >
                  Clear all filters
                </Text>
              )}
            </Box>
          </Card.Root>
        )}
      </Stack>
    </Box>
  );
}
