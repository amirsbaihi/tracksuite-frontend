
"use client"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import { gql } from "@apollo/client";
import ProductCard from "@/components/product-card";
import AddProductCard from "@/components/add-product-card";
import { Grid } from "@mui/material";

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
        return <Grid container
      >{products && 
            
  

            products.map((product: 
            { id:string; title: string; category: string; priceRange: number[]; totQuantity: number; allMedia: string[]; variantNumber:number; }) => 
            <Grid xs={2} key={product.id} ><ProductCard  id={product.id} title={product.title} category={product.category} price={product.priceRange[0] == product.priceRange[1] ? product.priceRange[0].toString() : product.priceRange.join("-")} quantity={product.totQuantity} variantNumber={product.variantNumber} image={product.allMedia[0]}></ProductCard></Grid>)}
            <Grid xs={2} ><AddProductCard/></Grid></Grid>
    } else {
        //router.push("/")
    }
}