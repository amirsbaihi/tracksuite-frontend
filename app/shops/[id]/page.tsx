
"use client"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import { gql } from "@apollo/client";
import ShopPage from "@/components/shop/shop-page";

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
    const { data } = useQuery(query, { context: { headers: { 'Authorization': 'Bearer ' + session?.user.access_token } }, variables:{id:params.id} });
    console.log(params.id)
    let shop

    if (data){
        ({ shop } = data)
        
    }

    if (status == "loading") {
        return <p>loading</p>
    }
    else if (status == "authenticated" && data) {
        return (<ShopPage shop={shop}/>)
    } else {
        //router.push("/")
    }
}