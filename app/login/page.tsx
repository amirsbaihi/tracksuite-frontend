"use client";

import React, { useEffect } from "react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken, signIn } from "next-auth/react";
import { Copyright } from "@mui/icons-material";
import {
  Button,
  Link,
  CssBaseline,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Container,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useAtom } from "jotai";
import { authAtom } from "@/components/atoms/auth";

export default function SignIn() {
  const [auth, setAuth] = useAtom(authAtom);
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session) {
      if (!auth.isLoggedIn)
        setAuth({
          isLoggedIn: true,
          jwt: session.user.access_token,
          email: session.user.email,
          userId: session.user.id,
        });

      redirect("/merchant/dashboard");
    }
  }, [session, auth]);
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          paddingTop: 8,
          paddingBottom: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography component="h1" variant="h3">
          Accedi
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();

            // Read the form data
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);

            // Or you can work with it as a plain object:
            const formJson = Object.fromEntries(formData.entries());
            signIn("credentials", formJson);
          }}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Ricordami"
          />
          <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
            Accedi
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#">Password dimenticata?</Link>
            </Grid>
            <Grid item>
              <Link href="#">{"Non hai un account? Registrati"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
