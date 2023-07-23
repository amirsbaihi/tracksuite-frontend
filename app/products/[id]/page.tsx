
"use client"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import { gql } from "@apollo/client";
import ProductCard from "@/components/product-card";
import ProductPage from "@/components/product-page";

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
    const { data } = useQuery(query, { context: { headers: { 'Authorization': 'Bearer ' + session?.user.access_token } }, variables:{id:params.id} });
    console.log(params.id)
    let product

    if (data){
        ({ product } = data)
        
    }

    if (status == "loading") {
        return <p>loading</p>
    }
    else if (status == "authenticated" && data) {
        return (<ProductPage product={product}/>)
    } else {
        //router.push("/")
    }
}