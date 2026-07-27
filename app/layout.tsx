import type { Metadata, Viewport } from 'next'
import { Syne, Inter } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'Aevora — Premium Web Development Agency',
  description:
    'We craft premium digital experiences that convert. Next.js, AI integrations, and automation for companies that demand the extraordinary.',
  keywords: 'web development, Next.js, AI integrations, automation, premium agency',
  openGraph: {
    title: 'Aevora — Premium Web Development Agency',
    description: 'We craft premium digital experiences that convert.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="bg-black text-white antialiased font-inter" style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
        {children}
      </body>
    </html>
  )
}
