import React from 'react'
import './styles.css'

export const metadata = {
  title: 'Invoice Generator',
  description: 'Free Invoice Generator',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
