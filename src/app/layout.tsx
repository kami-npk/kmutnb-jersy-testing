import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "KMUTNB ESPORT JERSEY",
  description: "KMUTNB ESPORT MERCH",
  icons:{
    icon:'/logotop.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
