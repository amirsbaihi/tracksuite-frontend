
"use client"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import { gql } from "@apollo/client";
import ShopPage from "@/components/shop/shop-page";
import { Shop } from "@/types/shop";

const query = gql`query Shop($id: String!) {
    shop(id:$id){
        id
        name
        description
        media
        address{
            street
            number
            city
            province
        }
    }
}`;


export default function Shop({ params }: { params: { id: string } }) {
    const router = useRouter()
    const { data: session, status } = useSession()
    const { data }:{data:{shop:Shop}} = useSuspenseQuery(query, { context: { headers: { 'Authorization': 'Bearer ' + session?.user.access_token } }, variables:{id:params.id} });

    return (<ShopPage shop={data.shop}/>)
}