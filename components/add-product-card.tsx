"use client"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions, Chip, Container, Stack } from '@mui/material';
import Link from 'next/link';

export default function AddProductCard() {
  return (
  <Box sx={{ margin:5}}>
    <Link href="/products/add" passHref><Card sx={{ width: 250, height:600, display: 'flex', alignContent: 'center', justifyContent: 'center', margin: "auto"}}>
      <CardActionArea ><Box sx={{justifyContent: 'center', display: 'flex'}}>
        <CardContent >
        
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
        </CardContent></Box>
      </CardActionArea>
    </Card></Link></Box>
  );
}

