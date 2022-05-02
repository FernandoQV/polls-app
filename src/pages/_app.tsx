import { theme } from "@/theme"
import { ChakraProvider, Container } from "@chakra-ui/react"
import type { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Container maxWidth={'container.xl'}>
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  )
}

export default MyApp
