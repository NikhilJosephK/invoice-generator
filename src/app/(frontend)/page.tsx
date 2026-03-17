'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Invoice } from '../components/invoice'

export default function InvoiceGeneratorPage() {
  const [preview, setPreview] = useState<string | null>(null)
  const [fromAddress, setFromAddress] = useState<string>('')
  const [billToAddress, setBillToAddress] = useState<string>('')
  const [shipToAddress, setShipToAddress] = useState<string>('')
  const [invoiceNumber, setInvoiceNumber] = useState<string>('')
  const [ImageObjectUrl, setImageObjectUrl] = useState<string | null>(null)
  const [date, setDate] = useState<string>('')
  const [dueDate, setDueDate] = useState<string>('')
  const imageUploadRef = useRef(null)
  const numberOfItemRef = useRef(0)
  const [tableData, setTableData] = useState([
    { id: 0, quantity: 0, rate: 0, amount: 0, product: '' },
  ])

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
  ])

  //
  async function printInvoice() {
    const invoiceHtml = document.getElementById('invoice')?.innerHTML
    try {
      const response = await fetch('/api/pdf-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: invoiceHtml || '' }),
      })
      if (!response.ok) {
        throw new Error('Failed to create PDF.')
      }
      const blob = await response.blob()
      const objectUrl = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = objectUrl
      link.download = 'output.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      throw err
    }
  }

  //

  return (
    <section className=" my-10">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex items-stretch justify-between gap-10">
          <div className="basis-1/2 shrink-0">
            {!preview && (
              <div className="relative w-40 h-40">
                <input
                  type="file"
                  ref={imageUploadRef}
                  onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (!file) return
                    const objectUrl = URL.createObjectURL(file)
                    setPreview(objectUrl)

                    const reader = new FileReader()
                    reader.onloadend = () => {
                      setImageObjectUrl(reader.result as string)
                    }
                    reader.readAsDataURL(file)
                  }}
                  className="border border-gray-300 rounded-md p-2 invisible"
                />
                <button
                  type="button"
                  className="border border-gray-300 bg-gray-100 rounded-md p-2 text-black/80 px-4 py-2 cursor-pointer w-40 h-40 absolute top-0 left-0"
                  onClick={() => (imageUploadRef.current as unknown as HTMLInputElement)?.click()}
                >
                  Upload Image
                </button>
              </div>
            )}
            {preview && <Image src={preview} id="preview" width="200" height="200" alt="preview" />}
            {/* from */}
            <div className="flex flex-col gap-2 mt-16">
              <label htmlFor="from" className="text-gray-500">
                From
              </label>
              <textarea
                value={fromAddress}
                onChange={(e) => {
                  setFromAddress(e.target.value)
                }}
                id="from"
                className="w-full border border-gray-300 rounded-md p-2 text-black/80 px-4 py-2 max-w-96"
                placeholder="Enter your address"
              />
            </div>
            {/* bill to */}
            <div className="flex gap-10 items-center">
              <div className="flex flex-col gap-2 mt-10">
                <label htmlFor="from" className="text-gray-500">
                  Bill To
                </label>
                <textarea
                  value={billToAddress}
                  onChange={(e) => {
                    setBillToAddress(e.target.value)
                  }}
                  id="from"
                  className="w-full border border-gray-300 rounded-md p-2 text-black/80 px-4 py-2 max-w-96"
                  placeholder="Enter billing address"
                />
              </div>
              <div className="flex flex-col gap-2 mt-10">
                <label htmlFor="from" className="text-gray-500">
                  Ship To (optional)
                </label>
                <textarea
                  value={shipToAddress}
                  onChange={(e) => {
                    setShipToAddress(e.target.value)
                  }}
                  id="from"
                  className="w-full border border-gray-300 rounded-md p-2 text-black/80 px-4 py-2 max-w-96"
                  placeholder="Enter billing address"
                />
              </div>
            </div>
          </div>
          <div className="basis-1/2">
            {/* invoice number */}
            <div className="flex flex-col gap-2 mt-10 items-end">
              <label htmlFor="from" className="text-gray-500 text-5xl font-bold">
                INVOICE NO.
              </label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => {
                  setInvoiceNumber(e.target.value)
                }}
                className="border border-gray-300 rounded-md p-2 w-40 mt-10"
                placeholder="#"
              />
            </div>
            {/* date */}
            <div className="flex flex-col gap-2 mt-10 items-end">
              <label htmlFor="date" className="text-gray-500">
                Date
              </label>
              <input
                value={date}
                onChange={(e) => {
                  setDate(e.target.value)
                }}
                id="date"
                type="date"
                className="border border-gray-300 rounded-md p-2 w-40"
                placeholder="Select date"
              />
            </div>
            {/* due date */}
            <div className="flex flex-col gap-2 mt-10 items-end">
              <label htmlFor="due-date" className="text-gray-500">
                Due Date
              </label>
              <input
                value={dueDate}
                onChange={(e) => {
                  setDueDate(e.target.value)
                }}
                id="due-date"
                type="date"
                className="border border-gray-300 rounded-md p-2 w-40"
                placeholder="Select due date"
              />
            </div>
          </div>
        </div>
        {/* table */}
        <div className="w-full mt-10">
          {/* head */}
          <div className="grid grid-cols-[3fr_1fr_1fr_1fr] border border-black bg-black text-white">
            <div className="w-full text-center p-2">Product</div>
            <div className="text-center p-2">Quantity</div>
            <div className="text-center p-2">Rate</div>
            <div className="text-center p-2">Amount</div>
          </div>
          {/* body */}
          <div>
            {tableData.map((item) => {
              return (
                <div key={item.id} className="relative">
                  <div className="grid grid-cols-[3fr_1fr_1fr_1fr]">
                    <div>
                      <input
                        value={item?.product || ''}
                        onChange={(e) => {
                          setTableData((prev) => {
                            return prev.map((row) =>
                              row.id === item.id ? { ...row, product: e.target.value } : row,
                            )
                          })
                        }}
                        type="text"
                        className="border-b border-gray-400 mx-2 w-[98%] ml-auto focus:outline-none pt-5"
                      />
                    </div>
                    <div>
                      <input
                        value={item?.quantity || ''}
                        onChange={(e) => {
                          const quantity = Number(e.target.value)
                          setTableData((prev) =>
                            prev.map((row) =>
                              row.id === item.id
                                ? {
                                    ...row,
                                    quantity,
                                    amount: quantity * row.rate,
                                  }
                                : row,
                            ),
                          )
                        }}
                        type="number"
                        className="border-b border-gray-400 mx-2 w-[95%] ml-auto focus:outline-none pt-5"
                      />
                    </div>
                    <div>
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
                        className="border-b border-gray-400 mx-2 w-[95%] ml-auto focus:outline-none pt-5"
                      />
                    </div>
                    <div>
                      <p className="border-b border-gray-400 mx-2 w-full ml-auto focus:outline-none pt-5">
                        {' '}
                        {item.amount}
                      </p>
                    </div>
                  </div>
                  <button
                    className="absolute -right-5 top-6 cursor-pointer font-extrabold"
                    onClick={() => {
                      const filteredData = tableData.filter((a) => {
                        return item.id !== a.id
                      })
                      setTableData(filteredData)
                    }}
                  >
                    X
                  </button>
                </div>
              )
            })}
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            numberOfItemRef.current += 1
            setTableData((prev) => [
              ...prev,
              { id: numberOfItemRef.current, quantity: 0, rate: 0, amount: 0, product: '' },
            ])
          }}
          className="px-4 py-3 bg-amber-300 text-black font-medium rounded-md mt-5"
        >
          Add Item
        </button>
        {/* submit button */}
      </div>
      <button
        className="px-4 py-3 bg-green-300 text-black font-medium rounded-md mt-5 mx-auto block"
        type="submit"
        onClick={() => {
          printInvoice()
        }}
      >
        Submit
      </button>
      {data.tableData?.length > 0 && <Invoice innerData={data} />}
    </section>
  )
}
