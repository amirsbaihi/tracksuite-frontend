"use client"
import { Button, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'


export default function ShopCard({title, number, href, coverImg}:{title:string, number:number, href:string, coverImg:string}) {
  return (
    <Card sx={{ minWidth: 275, maxWidth:300 }} className='m-5'>
      <Link href={href} passHref>
      <CardActionArea>
      <CardMedia
          component="img"
          sx={{height: 300 }}
          image={coverImg}
        />
      <CardContent>
        <Typography className=" text-center" variant="h4" component="div">
          {title}
        </Typography>
        <Typography className=" text-center" variant="subtitle1">
          Prodotti
        </Typography>
        <Typography className=" text-center" variant="h4">
          {number}
        </Typography>
      </CardContent>
      </CardActionArea>
      </Link>
    </Card>
  )
}
