import React from 'react'
import './styles.css'
import { Header } from '@/app/components/header/header'
import { Footer } from '@/app/components/footer/footer'

export const metadata = {
  title: 'Invoice Generator',
  description: 'Free Invoice Generator',
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
