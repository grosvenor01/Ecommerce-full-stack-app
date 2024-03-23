import { extendTheme } from '@chakra-ui/react'

// // 2. Add your color mode config
// const config = {
//   initialColorMode: 'dark',
//   useSystemColorMode: false,
//   colors: {
//     tomato: {
//         100: '#ffffff',
//         200: '#ffffff',
//         300: '#ffffff',
//         400: '#ffffff',
//         500: '#ffffff',
//         600: '#ffffff',
//         700: '#ffffff',
//         800: '#ffffff',
//         900: '#ffffff',
//     },
//   },
// }

// // 3. extend the theme
// const theme = extendTheme({ config })






const theme = extendTheme({
    initialColorMode: 'dark',
  
    colors: {
      gray: {
        50: "#f9f9f9",
        100: "#ededed",
        200: "#d3d3d3",
        300: "#b3b3b3",
        400: "#a0a0a0",
        500: "#898989",
        600: "#6c6c6c",
        700: "#202020",
        800: "#121212",
        900: "#111",
      },
    //   red: {
    //     50: "#ffffff",        
    //     100: '#ffffff',
    //             200: '#ffffff',
    //             300: '#ffffff',
    //             400: '#ffffff',
    //             500: '#ffffff',
    //             600: '#ffffff',
    //             700: '#ffffff',
    //             800: '#ffffff',
    //             900: '#ffffff',
    //         },
    },
  });



export default theme

