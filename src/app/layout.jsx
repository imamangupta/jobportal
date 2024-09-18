
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
export const metadata = {
  title: "CodePathshala",
  description: "CodePathshala help to find jobs/intership for newly Student.",
};
import { Providers } from "./redux/providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <Providers>
          <Toaster position="top-left" expand={false} richColors />
          <NextTopLoader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
