import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Request Network Analytics',
  description: 'Analytics dashboard for Request Network on Sepolia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}