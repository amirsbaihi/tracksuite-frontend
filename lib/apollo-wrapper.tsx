"use client";

import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
  NextSSRApolloClient
} from "@apollo/experimental-nextjs-app-support/ssr";
import { useSession } from 'next-auth/react';




export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const session = useSession()
  const headerLink = setContext((request, previousContext) => {
    return {
    headers: {
      // Make sure you include any existing headers!
      ...previousContext.headers,
      //'Authorization':'Bearer '+session?.data?.user.access_token
    },
  }});
  function makeClient() {
  
    const httpLink = headerLink.concat(new HttpLink({
      uri: "/backend/graphql"
    }))
  
    return new NextSSRApolloClient({
      cache: new NextSSRInMemoryCache(),
      link:
        typeof window === "undefined"
          ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
          : httpLink,
    });
  }
  
  return (
    <ApolloNextAppProvider
      makeClient={makeClient}
    >
      {children}
    </ApolloNextAppProvider>
  );
}