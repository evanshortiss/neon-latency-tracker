import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Neon Regional Latencies',
  description: 'View the latencies of queries to Neon databases across different deployment platforms and regions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + ' mx-12 my-6 container mx-auto bg-zinc-900 text-white'}>{children}</body>
    </html>
  )
}
