"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import { gql } from "@apollo/client";
import ProductCard from "@/components/product-card";
import AddProductCard from "@/components/add-product-card";
import { Grid } from "@mui/material";
import { Product } from "@/types/product";

const query = gql`
  query Products {
    products {
      id
      category
      title
      allMedia
      priceRange
      totQuantity
      variantNumber
    }
  }
`;

export default function Products() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data }: { data: { products: Product[] } } = useSuspenseQuery(query, {
    context: {
      headers: { Authorization: "Bearer " + session?.user.access_token },
    },
  });

  return (
    <Grid container>
      {data.products &&
        data.products.map((product) => (
          <Grid xs={2} key={product.id}>
            <ProductCard
              id={product.id}
              title={product.title}
              category={product.category}
              price={
                product.priceRange && (product.priceRange[0] == product.priceRange[1])
                  ? product.priceRange[0].toString()
                  : (product.priceRange?.join("-")||"")
              }
              quantity={product.totQuantity||0}
              variantNumber={product.variantNumber||0}
              image={product.allMedia?product.allMedia[0]:""}
            ></ProductCard>
          </Grid>
        ))}
      <Grid xs={2}>
        <AddProductCard />
      </Grid>
    </Grid>
  );
}
