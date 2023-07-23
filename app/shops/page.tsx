
"use client"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

import { useQuery, useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import { gql } from "@apollo/client";
import { Suspense } from "react";
import ShopCard from "@/components/counter-card";

const query = gql`query Shops {
    shops{
        id
        name
        productCount
        media
    }
}`;


export default function Shops() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const { data } = useQuery(query, { context: { headers: { 'Authorization': 'Bearer ' + session?.user.access_token } } });
    let shops

    if (data)
        ({ shops } = data)


    if (status == "loading") {
        return <p>loading</p>
    }
    else if (status == "authenticated") {
        return <div>{shops && shops.map((shop: {
            media: Array<string>;
            productCount: number; id: string; name: string; 
}) => (<ShopCard key={shop.id} title={shop.name} number={shop.productCount} coverImg={shop.media[0]} href={"/shops/"+shop.id} />))}</div> 
    } else {
        //router.push("/")
    }
}