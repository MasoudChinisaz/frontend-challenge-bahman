"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/app/_services/dummyjson";

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

  if (isLoading) return <p>Loading product...</p>;
  if (!data) return null;

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
      <img src={data.thumbnail} className="mb-4 rounded" />
      <p className="mb-2">{data.description}</p>
      <p className="font-semibold">${data.price}</p>
    </div>
  );
}
