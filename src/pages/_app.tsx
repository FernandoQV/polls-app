import { AppRouter } from "@/backend/router"
import { theme } from "@/theme"
import { ChakraProvider, Container } from "@chakra-ui/react"
import { withTRPC } from "@trpc/next"
import { AppType } from "next/dist/shared/lib/utils"

import superjson from 'superjson'
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Container maxWidth={"container.xl"}>
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  )
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url_vercel=process.env.NEXT_PUBLIC_VERCEL_URL as string
    const url =`/api/trpc`
      

    return {
      transformer:superjson,
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp)
