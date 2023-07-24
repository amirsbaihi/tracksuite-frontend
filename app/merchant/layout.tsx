"use client";

import ResponsiveAppBar from "@/components/appbar";
import { Box, CircularProgress } from "@mui/material";
import { Suspense } from "react";

export default function MerchantLayout({
    children,
  }: {
    children: React.ReactNode;
  }){

    return (<><ResponsiveAppBar />
    <Suspense
      fallback={
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      }
    >
      {children}
    </Suspense></>)
}