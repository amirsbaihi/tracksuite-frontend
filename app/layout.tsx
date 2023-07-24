"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "jotai";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./providers";

import React from "react";
import { ApolloWrapper } from "../lib/apollo-wrapper";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <main>
            <ThemeProvider theme={darkTheme}>
              <ApolloWrapper>
                <Provider>
                  {children}
                </Provider>
              </ApolloWrapper>
            </ThemeProvider>
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
