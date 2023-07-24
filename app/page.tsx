

"use client"



import { redirect } from 'next/navigation';
import { useAtomValue } from "jotai";
import { authAtom } from "@/components/atoms/auth";

export default function Home() {
  const auth = useAtomValue(authAtom)
  if(auth.isLoggedIn)
    redirect('/merchant/dashboard')
  else
    redirect('/login')
  

}





