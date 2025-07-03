// app/layout.tsx
import "./globals.css"
import { Inter } from "next/font/google"
import SessionWrapper from "../components/ui/sessionwrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "BlogSpace",
  description: "Your personal blogging platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  )
}
