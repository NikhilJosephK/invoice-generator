import React from 'react'
import type { Metadata } from 'next'
import './styles.css'
import { Header } from '@/app/components/header/header'
import { Footer } from '@/app/components/footer/footer'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'InvoiceStack - Free Invoice Generator',
  description: 'Free Invoice Generator - Create professional invoices for free',
  openGraph: {
    title: 'InvoiceStack - Free Invoice Generator',
    description: 'Free Invoice Generator - Create professional invoices for free',
    siteName: 'InvoiceStack',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/meta-image/invoicestack-meta-image.png',
        width: 512,
        height: 512,
        alt: 'InvoiceStack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InvoiceStack - Free Invoice Generator',
    description: 'Free Invoice Generator - Create professional invoices for free',
    images: ['/meta-image/invoicestack-meta-image.png'],
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
