import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hospital Reception Agent',
  description: 'AI-powered hospital reception assistant',
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
