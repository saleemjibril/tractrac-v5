"use client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// export const App = () => {
//   return (
//     <ChakraProvider theme={theme}>
//       <App />
//     </ChakraProvider>
//   );
// };
// import "./globals.css";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CacheProvider } from "@chakra-ui/next-js";
import { Providers } from "@/redux/provider";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

// const nanum = Nanum_Pen_Script({
//   // weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   subsets: ["latin"],
//   weight: "400",
// });

// export const metadata: Metadata = {
//   title: "TracTrac",
//   description:
//     "Facilitating access to mechanization services for all farmers in Africa.",
// };
export const theme = extendTheme({
  // components: {
  //   Checkbox: {
  //     baseStyle: {
  //       control: {
  //         bg: "white",
  //         borderColor: "black",
  //         _checked: {
  //           bg: "black",
  //         },
  //       },
  //     },
  //   },
  // },
  // components: {
  //   BottomNavigation,
  // },
  fonts: {
    inter: inter.style.fontFamily,
    // nanum: nanum.style.fontFamily,
  },
  // breakpoints: {
  //   sm: "320px",
  //   md: "768px",
  //   lg: "960px",
  //   xl: "1200px",
  // },
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>
        <CacheProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
