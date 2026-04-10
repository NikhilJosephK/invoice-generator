export function InvoiceTwo({ innerData }: { innerData?: any }) {
  const {
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
    subtotal,
    discount,
    isDiscountPercentage,
    tax,
    isTaxPercentage,
    shipping,
    totalDue,
    currencySymbol,
    note,
  } = innerData || {}

  const computedSubtotal =
    tableData?.reduce((sum: number, item: any) => sum + (item.amount || 0), 0) ?? 0
  const total = subtotal ?? computedSubtotal
  const totalAfterDiscount =
    isDiscountPercentage && discount > 0
      ? total - (total * discount) / 100
      : total - (discount || 0)
  const totalAfterTax =
    isTaxPercentage && tax > 0
      ? totalAfterDiscount + (totalAfterDiscount * tax) / 100
      : totalAfterDiscount + (tax || 0)
  const finalTotal = totalDue ?? totalAfterTax + (shipping || 0)

  const accent = '#e85d04'
  const accentLight = '#fff4ec'
  const dark = '#1b1b1b'
  const muted = '#6b7280'
  const border = '#e5e7eb'

  return (
    <div id="invoice">
      <div
        style={{
          fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          maxWidth: '780px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          color: dark,
          display: 'flex',
          overflow: 'hidden',
          border: `1px solid ${border}`,
        }}
      >
        {/* Left accent sidebar */}
        <div
          style={{
            width: '6px',
            flexShrink: 0,
            background: `linear-gradient(180deg, ${accent}, #f97316, #fbbf24)`,
          }}
        />

        <div style={{ flex: 1, padding: '1.5rem 1.75rem' }}>
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1.5rem',
            }}
          >
            <div>
              {ImageObjectUrl && (
                <img
                  src={ImageObjectUrl}
                  alt="logo"
                  style={{
                    maxWidth: '110px',
                    maxHeight: '56px',
                    objectFit: 'contain',
                    marginBottom: '0.5rem',
                  }}
                />
              )}
              {fromAddress && (
                <p
                  style={{
                    fontSize: '0.82rem',
                    color: muted,
                    lineHeight: 1.5,
                    whiteSpace: 'pre-line',
                    margin: 0,
                    maxWidth: '260px',
                  }}
                >
                  {fromAddress}
                </p>
              )}
            </div>

            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: accentLight,
                  borderRadius: '8px',
                  padding: '0.55rem 1rem',
                  marginBottom: '0.5rem',
                }}
              >
                <span
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: accent,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  Invoice
                </span>
              </div>
              {invoiceNumber && (
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: muted,
                    margin: '4px 0 0 0',
                    fontWeight: 500,
                  }}
                >
                  {invoiceNumber}
                </p>
              )}
              {(date || dueDate) && (
                <div style={{ marginTop: '0.6rem' }}>
                  {date && (
                    <p style={{ fontSize: '0.78rem', color: muted, margin: '2px 0' }}>
                      <span style={{ fontWeight: 600, color: dark }}>Issued:</span> {date}
                    </p>
                  )}
                  {dueDate && (
                    <p style={{ fontSize: '0.78rem', color: accent, margin: '2px 0', fontWeight: 600 }}>
                      <span style={{ color: dark }}>Due:</span> {dueDate}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Client details */}
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              marginBottom: '1.25rem',
              padding: '0.85rem 1rem',
              backgroundColor: '#fafafa',
              borderRadius: '8px',
              borderLeft: `3px solid ${accent}`,
            }}
          >
            {billToAddress && (
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: accent,
                    marginBottom: '4px',
                  }}
                >
                  Bill To
                </p>
                <p
                  style={{
                    fontSize: '0.82rem',
                    color: dark,
                    lineHeight: 1.5,
                    whiteSpace: 'pre-line',
                    margin: 0,
                  }}
                >
                  {billToAddress}
                </p>
              </div>
            )}
            {shipToAddress && (
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: accent,
                    marginBottom: '4px',
                  }}
                >
                  Ship To
                </p>
                <p
                  style={{
                    fontSize: '0.82rem',
                    color: dark,
                    lineHeight: 1.5,
                    whiteSpace: 'pre-line',
                    margin: 0,
                  }}
                >
                  {shipToAddress}
                </p>
              </div>
            )}
          </div>

          {/* Items Table */}
          <table
            style={{
              width: '100%',
              borderCollapse: 'separate',
              borderSpacing: '0 4px',
              fontSize: '0.82rem',
            }}
          >
            <thead>
              <tr>
                {['Service / Item', 'Qty', 'Rate', 'Amount'].map((header, i) => (
                  <th
                    key={header}
                    style={{
                      padding: '0.5rem 0.65rem',
                      textAlign: i === 0 ? 'left' : i === 3 ? 'right' : 'center',
                      fontWeight: 700,
                      fontSize: '0.65rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: muted,
                      borderBottom: `2px solid ${dark}`,
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData?.map((item: any) => (
                <tr key={item.id}>
                  <td
                    style={{
                      padding: '0.55rem 0.65rem',
                      color: dark,
                      fontWeight: 500,
                      borderBottom: `1px solid ${border}`,
                    }}
                  >
                    {item.product}
                  </td>
                  <td
                    style={{
                      padding: '0.55rem 0.65rem',
                      textAlign: 'center',
                      color: muted,
                      borderBottom: `1px solid ${border}`,
                    }}
                  >
                    {item.quantity}
                  </td>
                  <td
                    style={{
                      padding: '0.55rem 0.65rem',
                      textAlign: 'center',
                      color: muted,
                      borderBottom: `1px solid ${border}`,
                    }}
                  >
                    {currencySymbol}
                    {Number(item.rate).toFixed(2)}
                  </td>
                  <td
                    style={{
                      padding: '0.55rem 0.65rem',
                      textAlign: 'right',
                      color: dark,
                      fontWeight: 600,
                      borderBottom: `1px solid ${border}`,
                    }}
                  >
                    {currencySymbol}
                    {Number(item.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '1rem',
            }}
          >
            <div style={{ width: '280px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.35rem 0',
                  fontSize: '0.82rem',
                  color: muted,
                }}
              >
                <span>Subtotal</span>
                <span style={{ color: dark, fontWeight: 500 }}>
                  {currencySymbol}
                  {total.toFixed(2)}
                </span>
              </div>

              {discount != null && discount > 0 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.35rem 0',
                    fontSize: '0.82rem',
                    color: '#16a34a',
                  }}
                >
                  <span>Discount</span>
                  <span style={{ fontWeight: 500 }}>
                    -{currencySymbol}
                    {(isDiscountPercentage && discount > 0
                      ? (total * discount) / 100
                      : discount
                    ).toFixed(2)}
                  </span>
                </div>
              )}

              {tax != null && tax > 0 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.35rem 0',
                    fontSize: '0.82rem',
                    color: muted,
                  }}
                >
                  <span>Tax</span>
                  <span style={{ color: dark, fontWeight: 500 }}>
                    +{currencySymbol}
                    {(isTaxPercentage && tax > 0
                      ? (totalAfterDiscount * tax) / 100
                      : tax
                    ).toFixed(2)}
                  </span>
                </div>
              )}

              {shipping != null && shipping > 0 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.35rem 0',
                    fontSize: '0.82rem',
                    color: muted,
                  }}
                >
                  <span>Shipping</span>
                  <span style={{ color: dark, fontWeight: 500 }}>
                    +{currencySymbol}
                    {Number(shipping).toFixed(2)}
                  </span>
                </div>
              )}

              {/* Total due */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '0.5rem',
                  padding: '0.6rem 0.75rem',
                  backgroundColor: accent,
                  color: '#ffffff',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '1rem',
                }}
              >
                <span>Total Due</span>
                <span style={{ fontSize: '1.1rem' }}>
                  {currencySymbol}
                  {finalTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Note */}
          {note?.trim() && (
            <div
              style={{
                marginTop: '1.25rem',
                padding: '0.75rem 1rem',
                backgroundColor: accentLight,
                borderRadius: '8px',
                borderLeft: `3px solid #fbbf24`,
              }}
            >
              <p
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: accent,
                  marginBottom: '4px',
                }}
              >
                Note
              </p>
              <p
                style={{
                  fontSize: '0.82rem',
                  color: dark,
                  lineHeight: 1.5,
                  whiteSpace: 'pre-line',
                  margin: 0,
                }}
              >
                {note}
              </p>
            </div>
          )}

          {/* Signature & QR */}
          {(signatureObjectUrl || qrCodeObjectUrl) && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginTop: '1.25rem',
                paddingTop: '0.85rem',
                borderTop: `1px dashed ${border}`,
              }}
            >
              <div>
                {signatureObjectUrl && (
                  <>
                    <p
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: muted,
                        marginBottom: '6px',
                      }}
                    >
                      Signature
                    </p>
                    <img
                      src={signatureObjectUrl}
                      alt="Signature"
                      style={{
                        maxWidth: '170px',
                        maxHeight: '68px',
                        objectFit: 'contain',
                        display: 'block',
                      }}
                    />
                    <div
                      style={{
                        width: '170px',
                        height: '1px',
                        backgroundColor: dark,
                        marginTop: '4px',
                      }}
                    />
                  </>
                )}
              </div>
              <div style={{ textAlign: 'right' }}>
                {qrCodeObjectUrl && (
                  <>
                    <p
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: muted,
                        marginBottom: '6px',
                        textAlign: 'right',
                      }}
                    >
                      Scan to Pay
                    </p>
                    <img
                      src={qrCodeObjectUrl}
                      alt="QR Code"
                      style={{
                        maxWidth: '170px',
                        maxHeight: '68px',
                        objectFit: 'contain',
                        display: 'block',
                        marginLeft: 'auto',
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          )}

          {/* Footer */}
          <div
            style={{
              marginTop: '1.25rem',
              paddingTop: '0.65rem',
              borderTop: `1px solid ${border}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <p
              style={{
                fontSize: '0.75rem',
                color: muted,
                margin: 0,
                fontStyle: 'italic',
              }}
            >
              Thank you for working with me!
            </p>
            <div
              style={{
                width: '40px',
                height: '3px',
                borderRadius: '2px',
                background: `linear-gradient(90deg, ${accent}, #fbbf24)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
