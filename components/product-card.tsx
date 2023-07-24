"use client"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Chip, Stack } from '@mui/material';
import Link from 'next/link';

export default function ProductCard({ title, category, price, quantity, image, variantNumber, id }: { title: string, category: string, price: string, quantity: number, image: string, variantNumber: number, id:string }) {
  return (
    <Card sx={{ width: 250, height:600, margin:5}}>
      <Link href={"/merchant/products/"+id}>
        <CardActionArea sx={{  display:"flex", justifyContent:"flex-start", alignItems:"flex-start", flexDirection: 'column', width: 250, height:600}}>
        <CardMedia
          component="img"
          sx={{height: 300 }}
          image={image}
        />
        <CardContent>
          <Typography sx={{width: 230, height:130}} variant="h5" component="div">
            {title}
          </Typography>
          <Stack paddingY={1} direction="row" spacing={1}>
            <Chip label={category} variant="outlined" />
          </Stack>
          <Typography gutterBottom variant="h4" component="div" fontWeight="bold">
            {price} €
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quantità: {quantity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Varianti: {variantNumber}
          </Typography>
        </CardContent>
      </CardActionArea>
      </Link>
    </Card>
  );
}

