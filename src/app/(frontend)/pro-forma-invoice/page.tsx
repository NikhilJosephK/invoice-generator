'use client'

import InvoiceGeneratorComponent from '@/app/components/invoice-builder/builder-one/builder-one'
import { Invoice } from '@/app/components/invoice/invoice'

export default function ProFormaInvoicePage() {
  return (
    <>
      <InvoiceGeneratorComponent InvoiceComponent={Invoice} />
    </>
  )
}
