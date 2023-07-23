import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient } = registerApolloClient(() => {
    const headerLink = setContext((request, previousContext) => {
        return {
        headers: {
          // Make sure you include any existing headers!
          ...previousContext.headers,
          //'Authorization':'Bearer '+session?.data?.user.access_token
        },
      }});
    const httpLink = headerLink.concat(new HttpLink({
        uri: "/backend/graphql"
      }))
    
  return new ApolloClient({

    cache: new InMemoryCache(),
    link: httpLink
  });
});