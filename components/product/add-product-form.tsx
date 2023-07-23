"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddVariantCard from './add-variant-card';
import { Button, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { CompactProduct, Product, Variant } from '@/types/product';

const mutation = gql`mutation AddProduct($newProductData: NewProductInput!) {
  addProduct(newProductData:$newProductData){
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

export default function AddProductForm() {
  const [submit, setSubmit]=useState(false)
  const [variants, setVariants]=useState([] as Variant[])
  const [product, setProduct]=useState({} as CompactProduct)
  const { data: session, status } = useSession()
  const [addProduct, { data, loading, error }] = useMutation(mutation, { context: { headers: { 'Authorization': 'Bearer ' + session?.user.access_token } }})
  function onVariantsSubmitted(variantsObj:Variant[]){
    setVariants(Object.values(variantsObj))
  }
  useEffect(()=>{
    if(variants.length>0){
      const newProductData = {...product, variants, owner:"12123213123"}
      console.log(newProductData)
      addProduct({ variables: { newProductData } })
    }

  }, [variants])
  function modifyProduct(value:string , product:CompactProduct, key:keyof CompactProduct, index?:number) {
    if(index && key =='optionNames'){
      product[key]=product.optionNames||[]
      product[key][index]=value
      return product
    }else if (key !='optionNames')
      product[key]=value
    return product
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1 },
        margin:5
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h3" gutterBottom>Aggiungi un prodotto</Typography>
      <div>
        <TextField
          required
          id="title"
          label="Titolo"
          onChange={({target})=>setProduct(modifyProduct(target.value, product, "title"))}
        />
        
        <TextField
          required
          id="category"
          label="Categoria"
          onChange={({target})=>setProduct(modifyProduct(target.value, product, "category"))}
        />
        <TextField
          required
          id="brand"
          label="Brand"
          onChange={({target})=>setProduct(modifyProduct(target.value, product, "brand"))}
        />
        <TextField
        sx={{width:"50%"}}
          required
          multiline
          rows={4}
          maxRows={50}
          id="description"
          label="Descrizione"
          onChange={({target})=>setProduct(modifyProduct(target.value, product, "description"))}
        />
        <TextField
          required
          id="option1Name"
          label="Nome varianti 1"
          onChange={({target})=>setProduct(modifyProduct(target.value, product, "optionNames", 0))}
        />
        <TextField
          required
          id="option2Name"
          label="Nome varianti 2"
          onChange={({target})=>setProduct(modifyProduct(target.value, product, "optionNames", 1))}
        />
        
        <AddVariantCard formSubmitted={submit} onVariantsSubmitted={onVariantsSubmitted} />
        
      </div>
      <Button variant="contained" onClick={()=>setSubmit(!submit)}>Aggiungi</Button>
    </Box>
    
  );
}