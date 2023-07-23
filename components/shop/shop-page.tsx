"use client"
import * as React from 'react';
import { Box, Grid, Typography,  } from '@mui/material';
import ImageGallery from 'react-image-gallery';

import Link from 'next/link';
import { Shop } from '@/types/shop';

export default function ShopPage({ shop }:{ shop:Shop }) {
    return (
        <Grid container  spacing={2} >
            <Grid xs={5}>
                <Typography sx={{margin:5}} variant="h1" gutterBottom>{shop.name}</Typography>
                <Typography sx={{margin:5}} variant="subtitle1">{shop.address.street} {shop.address.number}, {shop.address.city} ({shop.address.province})</Typography>
                <Typography sx={{margin:5}} variant="body1">{shop.description}</Typography>

            </Grid>
            <Grid  xs={7}>
                
            <ImageGallery useBrowserFullscreen={false} items={shop.media.map((link: string) => ({
                            original: link,
                            thumbnail: link,
                            originalHeight: 100,
                            originalWidth: 500,
                            thumbnailHeight: 50,
                            thumbnailWidth: 50
                        }))} />
            </Grid>
        </Grid>
    );
}
