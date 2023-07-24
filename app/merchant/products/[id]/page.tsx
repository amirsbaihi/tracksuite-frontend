
"use client"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import { gql } from "@apollo/client";
import ProductCard from "@/components/product-card";
import ProductPage from "@/components/product-page";
import { Product } from "@/types/product";

const query = gql`query Product($id: String!) {
    product(id:$id){
        id
        title
        category
        brand
        description
        optionNames
        variants{
            quantity
            media
            optionValues
            price
        }
    }
}`;


export default function Product({ params }: { params: { id: string } }) {
    const router = useRouter()
    const { data: session, status } = useSession()
    const { data }:{data:{ product:Product }} = useSuspenseQuery(query, { context: { headers: { 'Authorization': 'Bearer ' + session?.user.access_token } }, variables:{id:params.id} });
    

    return (<ProductPage product={data.product}/>)
}