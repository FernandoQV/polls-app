import { extendTheme,theme as themeChakra } from "@chakra-ui/react";

export const theme=extendTheme({
    colors:{
        primary:themeChakra.colors.blue,
        secondary:themeChakra.colors.pink
    }
})