"use client";

import {
  Card,
  Grid,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import Link from "next/link";
import React from "react";

export default function DashboardPage() {
  return (
    <Grid container sx={{ marginTop: 2 }}>
      <Grid xs={2} sx={{ margin: 5 }}>
        <Card sx={{ "text-align": "center" }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Numero prodotti
            </Typography>
            <Typography variant="h5" component="div">
              5
            </Typography>
          </CardContent>
          <CardActions>
            <Link href="/merchant/products" passHref>
              <Button size="small">Vai ai prodotti</Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
      <Grid xs={2} sx={{ margin: 5 }}>
        <Card sx={{ "text-align": "center" }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Numero negozi
            </Typography>
            <Typography variant="h5" component="div">
              1
            </Typography>
          </CardContent>
          <CardActions>
            <Link href="/merchant/shops" passHref>
              <Button size="small">Vai ai negozi</Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
