"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import { gql } from "@apollo/client";
import ShopCard from "@/components/counter-card";
import { Shop } from "@/types/shop";

const query = gql`
  query Shops {
    shops {
      id
      name
      productCount
      media
    }
  }
`;

export default function Shops() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data }: { data: { shops: Shop[] } } = useSuspenseQuery(query, {
    context: {
      headers: { Authorization: "Bearer " + session?.user.access_token },
    },
  });

  return (
    <div>
      {data.shops &&
        data.shops.map((shop) => (
          <ShopCard
            key={shop.id}
            title={shop.name}
            number={shop.productCount}
            coverImg={shop.media[0]}
            href={"/shops/" + shop.id}
          />
        ))}
    </div>
  );
}
