'use client'

import InvoiceGeneratorComponent from '@/app/components/invoice-builder/builder-one/builder-one'
import { InvoiceTwo } from '@/app/components/invoice/invoice-two'

export default function FreelanceInvoicePage() {
  return (
    <>
      <InvoiceGeneratorComponent InvoiceComponent={InvoiceTwo} invoiceType="Freelance" />
    </>
  )
}
