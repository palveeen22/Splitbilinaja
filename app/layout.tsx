import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MessageProvider } from "./askMe/_hooks/useMessage";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Splitin Aja",
  description: "Confused to split your bils? splitin aja and enjoy your catch up with friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MessageProvider>
        {children}
        </MessageProvider>
      </body>
    </html>
  );
}
