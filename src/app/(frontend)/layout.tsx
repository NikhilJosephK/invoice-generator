import React from 'react'
import './styles.css'
import { Header } from '@/app/components/header/header'
import { Footer } from '@/app/components/footer/footer'

export const metadata = {
  title: 'InvoiceStack - Free Invoice Generator',
  description: 'Free Invoice Generator - Create professional invoices for free',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
