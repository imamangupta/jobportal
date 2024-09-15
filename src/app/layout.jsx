
import "./globals.css";

export const metadata = {
  title: "CodePathshala",
  description: "CodePathshala help to find jobs/intership for newly Student.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#f8f3ff]">
        {children}
      </body>
    </html>
  );
}
