
"use client"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import { gql } from "@apollo/client";
import AddProductForm from "@/components/product/add-product-form";

const query = gql`query Products {
    products{
        id
        category
        title
        allMedia
        priceRange
        totQuantity
        variantNumber
    }
}`;


export default function Products() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const { data } = useQuery(query, { context: { headers: { 'Authorization': 'Bearer ' + session?.user.access_token } } });
    let products

    if (data)
        ({ products } = data)


    if (status == "loading") {
        return <p>loading</p>
    }
    else if (status == "authenticated") {
        return <AddProductForm/>
    } else {
        //router.push("/")
    }
}