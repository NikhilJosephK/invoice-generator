'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Invoice } from '@/app/components/invoice/invoice'
import { CurrencyPicker } from '@/app/components/currency-picker/currency-picker'
import { SignatureMaker } from '@/app/components/signature-maker/signature-maker'

export default function InvoiceGeneratorComponent({
  InvoiceComponent = Invoice,
  invoiceType,
}: any) {
  const [preview, setPreview] = useState<string | null>(null)
  const [fromAddress, setFromAddress] = useState<string>('')
  const [billToAddress, setBillToAddress] = useState<string>('')
  const [shipToAddress, setShipToAddress] = useState<string>('')
  const [invoiceNumber, setInvoiceNumber] = useState<string>('')
  const [discount, setDiscount] = useState<any>()
  const [isDiscountPercentage, setIsDiscountPercentage] = useState<any>(false)
  const [tax, setTax] = useState<any>()
  const [isTaxPercentage, setIsTaxPercentage] = useState<any>(false)
  const [shipping, setShipping] = useState<any>()
  const [ImageObjectUrl, setImageObjectUrl] = useState<string | null>(null)
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null)
  const [signatureObjectUrl, setSignatureObjectUrl] = useState<string | null>(null)
  const [qrCodePreview, setQrCodePreview] = useState<string | null>(null)
  const [qrCodeObjectUrl, setQrCodeObjectUrl] = useState<string | null>(null)
  const [date, setDate] = useState<string>('')
  const [dueDate, setDueDate] = useState<string>('')
  const [note, setNote] = useState<string>('')
  const imageUploadRef = useRef(null)
  const signatureUploadRef = useRef(null)
  const qrCodeUploadRef = useRef(null)
  const numberOfItemRef = useRef(0)
  const [tableData, setTableData] = useState([
    { id: 0, quantity: 0, rate: 0, amount: 0, product: '' },
  ])
  const [currencySymbol, setCurrencySymbol] = useState('')
  const [pdfLoading, setPdfLoading] = useState(false)

  const [data, setData] = useState<any>({})
  useEffect(() => {
    setData({
      fromAddress,
      billToAddress,
      shipToAddress,
      invoiceNumber,
      date,
      dueDate,
      tableData,
      ImageObjectUrl,
      signatureObjectUrl,
      qrCodeObjectUrl,
      note,
    })
  }, [
    fromAddress,
    billToAddress,
    shipToAddress,
    invoiceNumber,
    date,
    dueDate,
    tableData,
    ImageObjectUrl,
    signatureObjectUrl,
    qrCodeObjectUrl,
    note,
    discount,
    isDiscountPercentage,
    tax,
    isTaxPercentage,
    shipping,
  ])

  const total = tableData.reduce((acc, current) => acc + current.amount, 0)
  const totalAfterDiscount =
    isDiscountPercentage && discount > 0
      ? total - (total * discount) / 100
      : total - (discount || 0)
  const totalAfterTax =
    isTaxPercentage && tax > 0
      ? totalAfterDiscount + (totalAfterDiscount * tax) / 100
      : totalAfterDiscount + (tax || 0)
  const totalAfterShipping = totalAfterTax + (shipping || 0)

  async function printInvoice() {
    const invoiceHtml = document.getElementById('invoice')?.innerHTML
    setPdfLoading(true)
    try {
      const response = await fetch('/api/pdf-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          html: invoiceHtml || '',
          ...(signatureObjectUrl?.startsWith('data:image')
            ? { signatureDataUrl: signatureObjectUrl }
            : {}),
          ...(qrCodeObjectUrl?.startsWith('data:image') ? { qrCodeDataUrl: qrCodeObjectUrl } : {}),
        }),
      })
      if (!response.ok) throw new Error('Failed to create PDF.')
      const blob = await response.blob()
      const objectUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = objectUrl
      link.download = 'output.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(objectUrl)
    } catch (err) {
      console.error(err)
    } finally {
      setPdfLoading(false)
    }
  }

  const inputBase =
    'w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-800 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:ring-offset-2 focus:border-indigo-400'
  const labelBase = 'block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5'

  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Page title */}
        <div className="mb-8 text-center sm:mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Create Your {invoiceType} Invoice
          </h2>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Fill in the details below to generate a professional PDF invoice
          </p>
        </div>

        <div className="space-y-8">
          {/* Card 1: Branding & Addresses */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Left: Logo + From + Addresses */}
              <div className="space-y-6">
                {/* Logo upload */}
                <div>
                  <label className={labelBase}>Company Logo</label>
                  {!preview ? (
                    <button
                      type="button"
                      onClick={() =>
                        (imageUploadRef.current as unknown as HTMLInputElement)?.click()
                      }
                      className="flex h-36 w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 text-slate-500 transition-colors hover:border-indigo-300 hover:bg-indigo-50/30 hover:text-indigo-600"
                    >
                      <span className="text-sm font-medium">+ Upload Logo</span>
                    </button>
                  ) : (
                    <div className="relative inline-block">
                      <Image
                        src={preview}
                        id="preview"
                        width={140}
                        height={80}
                        alt="Logo preview"
                        className="rounded-lg border border-slate-200 object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreview(null)
                          setImageObjectUrl(null)
                        }}
                        className="absolute -right-2 -top-2 rounded-full bg-slate-800 p-1 text-white shadow hover:bg-slate-700"
                        aria-label="Remove logo"
                      >
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={imageUploadRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      setPreview(URL.createObjectURL(file))
                      const reader = new FileReader()
                      reader.onloadend = () => setImageObjectUrl(reader.result as string)
                      reader.readAsDataURL(file)
                    }}
                    className="sr-only"
                  />
                </div>

                <div>
                  <label htmlFor="from" className={labelBase}>
                    From
                  </label>
                  <textarea
                    id="from"
                    value={fromAddress}
                    onChange={(e) => setFromAddress(e.target.value)}
                    className={`${inputBase} min-h-[80px] resize-y`}
                    placeholder="Your company name and address"
                    rows={3}
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="billTo" className={labelBase}>
                      Bill To
                    </label>
                    <textarea
                      id="billTo"
                      value={billToAddress}
                      onChange={(e) => setBillToAddress(e.target.value)}
                      className={`${inputBase} min-h-[80px] resize-y`}
                      placeholder="Client billing address"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label htmlFor="shipTo" className={labelBase}>
                      Ship To <span className="text-slate-400">(optional)</span>
                    </label>
                    <textarea
                      id="shipTo"
                      value={shipToAddress}
                      onChange={(e) => setShipToAddress(e.target.value)}
                      className={`${inputBase} min-h-[80px] resize-y`}
                      placeholder="Shipping address if different"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Right: Invoice meta */}
              <div className="space-y-6 lg:pt-0">
                <div className="rounded-xl bg-linear-to-br from-slate-50 to-indigo-50/50 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-slate-800">Invoice Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="invoiceNumber" className={labelBase}>
                        Invoice Number
                      </label>
                      <input
                        id="invoiceNumber"
                        type="text"
                        value={invoiceNumber}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                        className={`${inputBase} max-w-[200px]`}
                        placeholder="#INV-001"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="date" className={labelBase}>
                          Date
                        </label>
                        <input
                          id="date"
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className={inputBase}
                        />
                      </div>
                      <div>
                        <label htmlFor="dueDate" className={labelBase}>
                          Due Date
                        </label>
                        <input
                          id="dueDate"
                          type="date"
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                          className={inputBase}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Line Items */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">List Items</h3>
              <button
                type="button"
                onClick={() => {
                  numberOfItemRef.current += 1
                  setTableData((prev) => [
                    ...prev,
                    {
                      id: numberOfItemRef.current,
                      quantity: 0,
                      rate: 0,
                      amount: 0,
                      product: '',
                    },
                  ])
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Item
              </button>
            </div>

            {/* Table - scroll horizontally on mobile */}
            <div className="-mx-4 overflow-x-auto sm:mx-0">
              <div className="min-w-[800px] px-4 sm:px-0">
                {/* Table header */}
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-2 rounded-t-lg bg-slate-800 px-4 py-3 text-sm font-semibold text-white">
                  <div className="text-slate-200 min-w-[200px]">Product / Description</div>
                  <div className="text-center text-slate-200 min-w-[100px]">Qty</div>
                  <div className="text-center text-slate-200 min-w-[100px]">Rate</div>
                  <div className="text-right text-slate-200 min-w-[100px]">Amount</div>
                  <div className="w-8" aria-hidden />
                </div>
                {/* Table body */}
                <div className="divide-y divide-slate-100">
                  {tableData.map((item) => (
                    <div
                      key={item.id}
                      className="relative grid grid-cols-[2fr_1fr_1fr_1fr_auto] items-center gap-2 px-4 py-3 transition-colors hover:bg-slate-50/50"
                    >
                      <input
                        value={item?.product || ''}
                        onChange={(e) =>
                          setTableData((prev) =>
                            prev.map((row) =>
                              row.id === item.id ? { ...row, product: e.target.value } : row,
                            ),
                          )
                        }
                        type="text"
                        placeholder="Item name"
                        className="rounded-md  bg-transparent py-1.5 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 min-w-[200px]  border border-slate-200/90 pl-2"
                      />
                      <input
                        value={item?.quantity || ''}
                        onChange={(e) => {
                          const quantity = Number(e.target.value)
                          setTableData((prev) =>
                            prev.map((row) =>
                              row.id === item.id
                                ? { ...row, quantity, amount: quantity * row.rate }
                                : row,
                            ),
                          )
                        }}
                        type="number"
                        min={0}
                        className="rounded-md border bg-transparent py-1.5 text-center text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 min-w-[100px]  border-slate-200/90"
                      />
                      <input
                        value={item?.rate || ''}
                        onChange={(e) => {
                          const rate = Number(e.target.value)
                          setTableData((prev) =>
                            prev.map((row) =>
                              row.id === item.id
                                ? { ...row, rate, amount: row.quantity * rate }
                                : row,
                            ),
                          )
                        }}
                        type="number"
                        min={0}
                        step={0.01}
                        className="rounded-md bg-transparent py-1.5 text-center text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 min-w-[100px] border border-slate-200/90"
                      />
                      <div className="text-right font-medium text-slate-700 min-w-[100px]">
                        {currencySymbol + Number(item.amount).toFixed(2)}
                      </div>
                      <button
                        type="button"
                        onClick={() => setTableData((prev) => prev.filter((a) => a.id !== item.id))}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        aria-label="Remove item"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Adjustments & Totals */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Left: Discount, Tax, Shipping */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800">Adjustments</h3>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <label className="w-24 text-sm font-medium text-slate-600">Discount</label>
                  <div className="flex flex-1 flex-wrap items-center gap-3">
                    <input
                      type="number"
                      min={0}
                      step={0.01}
                      value={discount ?? ''}
                      onChange={(e) => setDiscount(Number(e.target.value) || undefined)}
                      className={`${inputBase} max-w-[120px]`}
                      placeholder={isDiscountPercentage ? 'eg: 10%' : 'eg: 50.00'}
                    />
                    <div
                      className="flex rounded-lg border border-slate-200 bg-slate-50 p-0.5"
                      role="group"
                      aria-label="Discount type"
                    >
                      <button
                        type="button"
                        onClick={() => setIsDiscountPercentage(false)}
                        className={`rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                          !isDiscountPercentage
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {currencySymbol} Amount
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsDiscountPercentage(true)}
                        className={`rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                          isDiscountPercentage
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        % Percent
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <label className="w-24 text-sm font-medium text-slate-600">Tax</label>
                  <div className="flex flex-1 flex-wrap items-center gap-3">
                    <input
                      type="number"
                      min={0}
                      step={0.01}
                      value={tax ?? ''}
                      onChange={(e) => setTax(Number(e.target.value) || undefined)}
                      className={`${inputBase} max-w-[120px]`}
                      placeholder={isTaxPercentage ? 'eg: 10%' : 'eg: 25.00'}
                    />
                    <div
                      className="flex rounded-lg border border-slate-200 bg-slate-50 p-0.5"
                      role="group"
                      aria-label="Tax type"
                    >
                      <button
                        type="button"
                        onClick={() => setIsTaxPercentage(false)}
                        className={`rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                          !isTaxPercentage
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {currencySymbol} Amount
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsTaxPercentage(true)}
                        className={`rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                          isTaxPercentage
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        % Percent
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <label className="w-24 text-sm font-medium text-slate-600">Shipping</label>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={shipping ?? ''}
                    onChange={(e) => setShipping(Number(e.target.value) || undefined)}
                    className={`${inputBase} max-w-[120px]`}
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Right: Totals summary */}
              <div className="rounded-xl bg-slate-50 p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Summary
                </h3>
                <div className="mb-6">
                  <label htmlFor="currency" className={labelBase}>
                    Currency
                  </label>
                  <CurrencyPicker setCurrencySymbol={setCurrencySymbol} />
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>
                      {currencySymbol}
                      {total.toFixed(2)}
                    </span>
                  </div>
                  {discount != null && discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount</span>
                      <span>
                        - {currencySymbol}
                        {(isDiscountPercentage && discount > 0
                          ? (total * discount) / 100
                          : discount
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
                  {tax != null && tax > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>Tax</span>
                      <span>
                        + {currencySymbol}
                        {(isTaxPercentage && tax > 0
                          ? (totalAfterDiscount * tax) / 100
                          : tax
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
                  {shipping != null && shipping > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>Shipping</span>
                      <span>
                        +{currencySymbol}
                        {Number(shipping).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 text-lg font-bold text-slate-900">
                  <span>Total</span>
                  <span>
                    {currencySymbol}
                    {totalAfterShipping.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 sm:p-8">
            <label htmlFor="note" className={labelBase}>
              Note
            </label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className={`${inputBase} h-[200px] min-h-[200px] w-full resize-y`}
              placeholder="Payment terms, thank-you message, or other details for your client"
              rows={6}
            />
          </div>

          {/* Signature */}
          <div className="min-w-0 w-full rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 sm:p-8">
            <label className={labelBase}>Signature</label>
            {!signaturePreview ? (
              <button
                type="button"
                onClick={() => (signatureUploadRef.current as unknown as HTMLInputElement)?.click()}
                className="flex h-32 w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 text-slate-500 transition-colors hover:border-indigo-300 hover:bg-indigo-50/30 hover:text-indigo-600"
              >
                <span className="text-sm font-medium">+ Upload signature</span>
              </button>
            ) : (
              <div className="relative inline-block max-w-full">
                {/* eslint-disable-next-line @next/next/no-img-element -- blob and data URLs for signature */}
                <img
                  src={signaturePreview}
                  id="signature-preview"
                  alt="Signature preview"
                  className="max-h-[72px] max-w-[180px] rounded-lg border border-slate-200 object-contain"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (signaturePreview.startsWith('blob:')) URL.revokeObjectURL(signaturePreview)
                    setSignaturePreview(null)
                    setSignatureObjectUrl(null)
                  }}
                  className="absolute -right-2 -top-2 rounded-full bg-slate-800 p-1 text-white shadow hover:bg-slate-700"
                  aria-label="Remove signature"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
            <input
              type="file"
              id="signature"
              accept="image/*"
              ref={signatureUploadRef}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (!file) return
                if (signaturePreview?.startsWith('blob:')) URL.revokeObjectURL(signaturePreview)
                setSignaturePreview(URL.createObjectURL(file))
                const reader = new FileReader()
                reader.onloadend = () => setSignatureObjectUrl(reader.result as string)
                reader.readAsDataURL(file)
                e.target.value = ''
              }}
              className="sr-only"
            />

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center" aria-hidden>
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs font-medium uppercase tracking-wider text-slate-400">
                <span className="bg-white px-3">Or</span>
              </div>
            </div>

            <SignatureMaker
              onSignatureChange={(dataUrl) => {
                if (signaturePreview?.startsWith('blob:')) URL.revokeObjectURL(signaturePreview)
                setSignatureObjectUrl(dataUrl)
                setSignaturePreview(dataUrl)
              }}
            />
          </div>
          {/* QR Code */}
          <div className="min-w-0 w-full rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 sm:p-8">
            <label className={labelBase}>QR Code</label>
            {!qrCodePreview ? (
              <button
                type="button"
                onClick={() => (qrCodeUploadRef.current as unknown as HTMLInputElement)?.click()}
                className="flex h-32 w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 text-slate-500 transition-colors hover:border-indigo-300 hover:bg-indigo-50/30 hover:text-indigo-600"
              >
                <span className="text-sm font-medium">+ Upload QR code</span>
              </button>
            ) : (
              <div className="relative inline-block max-w-full">
                {/* eslint-disable-next-line @next/next/no-img-element -- blob and data URLs for QR */}
                <img
                  src={qrCodePreview}
                  id="qr-code-preview"
                  alt="QR code preview"
                  className="max-h-[72px] max-w-[180px] rounded-lg border border-slate-200 object-contain"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (qrCodePreview.startsWith('blob:')) URL.revokeObjectURL(qrCodePreview)
                    setQrCodePreview(null)
                    setQrCodeObjectUrl(null)
                  }}
                  className="absolute -right-2 -top-2 rounded-full bg-slate-800 p-1 text-white shadow hover:bg-slate-700"
                  aria-label="Remove QR code"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
            <input
              type="file"
              id="qr-code"
              accept="image/*"
              ref={qrCodeUploadRef}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (!file) return
                if (qrCodePreview?.startsWith('blob:')) URL.revokeObjectURL(qrCodePreview)
                setQrCodePreview(URL.createObjectURL(file))
                const reader = new FileReader()
                reader.onloadend = () => setQrCodeObjectUrl(reader.result as string)
                reader.readAsDataURL(file)
                e.target.value = ''
              }}
              className="sr-only"
            />
          </div>

          {/* Submit / Download PDF button */}
          <div className="flex max-lg:flex-col items-center gap-4 justify-center">
            <button
              type="button"
              onClick={printInvoice}
              disabled={pdfLoading}
              aria-busy={pdfLoading}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-90"
            >
              {pdfLoading ? (
                <>
                  <span
                    className="h-5 w-5 shrink-0 rounded-full border-2 border-white/35 border-t-white animate-spin"
                    aria-hidden
                  />
                  <span>Generating PDF…</span>
                </>
              ) : (
                <>
                  <svg
                    className="h-5 w-5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>Download PDF</span>
                </>
              )}
            </button>
            <p className="text-xs text-slate-500 max-lg:text-center">
              Generate a professional PDF invoice from your entered data
            </p>
          </div>
        </div>

        {/* Live invoice preview (also used for PDF generation) */}
        {data.tableData?.length > 0 && (
          <div className="mt-12 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/50 sm:p-8 max-lg:hidden">
            <h3 className="mb-6 text-lg font-semibold text-slate-800">Invoice Preview</h3>
            <div className="overflow-x-auto">
              <InvoiceComponent
                innerData={{
                  ...data,
                  subtotal: total,
                  discount,
                  isDiscountPercentage,
                  tax,
                  isTaxPercentage,
                  shipping,
                  totalDue: totalAfterShipping,
                  currencySymbol,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
