import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
export const metadata = {
  title: "CodePathshala",
  description: "CodePathshala help to find jobs/intership for newly Student.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}
