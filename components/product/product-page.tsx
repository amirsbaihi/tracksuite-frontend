"use client"
import * as React from 'react';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography,  } from '@mui/material';
import ImageGallery from 'react-image-gallery';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/types/product';



export default function ProductPage({ product }:{product:Product}) {
    const variantsNames = product.variants.map((v, i) => v.optionValues.flatMap((value, i)=>[product.optionNames[i], value]).join(" "))

    const [selectedVariant,setSelectedVariant]=useState(0)
    return (
        <Grid container justifyContent="space-between"   sx={{ margin:0, padding:5, width:"100%"}}>
            <Grid xs={12} md={6}>
                <Typography  variant="h1" gutterBottom>{product.title}</Typography>
                <Typography  variant="h3" gutterBottom>Brand: {product.brand}</Typography>
                <Typography  variant="h3" gutterBottom>Categoria: {product.category}</Typography>
                <Typography  variant="body1" gutterBottom>{product.description}</Typography>
                <FormControl sx={{ width: "100%", 'margin-top':5, 'margin-bottom':2 }} >
              <InputLabel id={"select-variant-label"}>Variante</InputLabel>
              <Select
                labelId={"select-variant-label"}
                id={"select-variant"}
                name={"select-variant"}
                label={"select-variant"}
                onChange={(event)=>setSelectedVariant(variantsNames.indexOf(event.target.value))}
                value={variantsNames[selectedVariant]}
              >
                {variantsNames.map((n:string, i:number) =>(
                  <MenuItem value={n} key={i}>{n}</MenuItem>
                ))}
              </Select>
            </FormControl>
                    <Typography sx={{margin:2}} variant="h5">{product.variants[selectedVariant].price} €</Typography>
                <Typography sx={{margin:2}} variant="h5">Quantità: {product.variants[selectedVariant].quantity}</Typography>
            </Grid>
            <Grid sx={{padding:"80px"}} xs="auto">
            
                        <ImageGallery thumbnailPosition="right"  useBrowserFullscreen={false} items={product.variants[selectedVariant].media.map((link: string) => ({
                            original: link,
                            thumbnail: link
                        }))} />
                    
            </Grid>
        </Grid>
    );
}
