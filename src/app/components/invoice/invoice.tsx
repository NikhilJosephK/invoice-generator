export function Invoice({ innerData }: { innerData: any }) {
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

  const labelStyle: React.CSSProperties = {
    fontSize: 'calc(0.65rem + 1px)',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#94a3b8',
    marginBottom: '2px',
  }

  const addressStyle: React.CSSProperties = {
    fontSize: 'calc(0.8rem + 2px)',
    color: '#334155',
    lineHeight: 1.45,
    whiteSpace: 'pre-line',
    margin: 0,
  }

  return (
    <div id="invoice">
      <div
        style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          maxWidth: '780px',
          margin: '0 auto',
          padding: '1.25rem 1.5rem',
          backgroundColor: '#ffffff',
          color: '#1a1a1a',
          border: '1px solid #e2e8f0',
        }}
      >
        {/* Top accent */}
        <div
          style={{
            height: '3px',
            background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
            borderRadius: '2px',
            marginBottom: '0.85rem',
          }}
        />

        {/* Header: Logo + Invoice title / number */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '1rem',
          }}
        >
          <div>
            {ImageObjectUrl && (
              <img
                src={ImageObjectUrl}
                alt="logo"
                style={{
                  maxWidth: '120px',
                  maxHeight: '64px',
                  objectFit: 'contain',
                  marginBottom: '0.25rem',
                }}
              />
            )}
          </div>
          <div style={{ textAlign: 'right' }}>
            <h1
              style={{
                fontSize: 'calc(1.65rem + 2px)',
                fontWeight: 800,
                color: '#2563eb',
                margin: 0,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                lineHeight: 1.1,
              }}
            >
              Invoice
            </h1>
            {invoiceNumber && (
              <p
                style={{
                  fontSize: 'calc(0.82rem + 1px)',
                  color: '#64748b',
                  margin: '4px 0 0 0',
                  fontWeight: 500,
                }}
              >
                #{invoiceNumber}
              </p>
            )}
          </div>
        </div>

        {/* Addresses + Dates row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '1.25rem',
            marginBottom: '1rem',
          }}
        >
          {/* Left: From / Bill To / Ship To */}
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', flex: 1 }}>
            {fromAddress && (
              <div>
                <p style={labelStyle}>From</p>
                <p style={addressStyle}>{fromAddress}</p>
              </div>
            )}
            {billToAddress && (
              <div>
                <p style={labelStyle}>Bill To</p>
                <p style={addressStyle}>{billToAddress}</p>
              </div>
            )}
            {shipToAddress && (
              <div>
                <p style={labelStyle}>Ship To</p>
                <p style={addressStyle}>{shipToAddress}</p>
              </div>
            )}
          </div>

          {/* Right: Dates */}
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            {date && (
              <div style={{ marginBottom: '0.4rem' }}>
                <p style={{ ...labelStyle, textAlign: 'right' }}>Date</p>
                <p
                  style={{
                    fontSize: 'calc(0.8rem + 2px)',
                    color: '#334155',
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  {date}
                </p>
              </div>
            )}
            {dueDate && (
              <div>
                <p style={{ ...labelStyle, textAlign: 'right' }}>Due Date</p>
                <p
                  style={{
                    fontSize: 'calc(0.8rem + 2px)',
                    color: '#334155',
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  {dueDate}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            backgroundColor: '#e2e8f0',
            marginBottom: '0.65rem',
          }}
        />

        {/* Items Table */}
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 'calc(0.8rem + 2px)',
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: '0.4rem 0.55rem',
                  textAlign: 'left',
                  fontWeight: 700,
                  fontSize: 'calc(0.65rem + 1px)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#ffffff',
                  backgroundColor: '#1e293b',
                  borderTopLeftRadius: '8px',
                }}
              >
                Item
              </th>
              <th
                style={{
                  padding: '0.4rem 0.55rem',
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: 'calc(0.65rem + 1px)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#ffffff',
                  backgroundColor: '#1e293b',
                }}
              >
                Qty
              </th>
              <th
                style={{
                  padding: '0.4rem 0.55rem',
                  textAlign: 'right',
                  fontWeight: 700,
                  fontSize: 'calc(0.65rem + 1px)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#ffffff',
                  backgroundColor: '#1e293b',
                }}
              >
                Rate
              </th>
              <th
                style={{
                  padding: '0.4rem 0.55rem',
                  textAlign: 'right',
                  fontWeight: 700,
                  fontSize: 'calc(0.65rem + 1px)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#ffffff',
                  backgroundColor: '#1e293b',
                  borderTopRightRadius: '8px',
                }}
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((item: any, index: number) => (
              <tr
                key={item.id}
                style={{
                  backgroundColor: index % 2 === 0 ? '#f8fafc' : '#ffffff',
                }}
              >
                <td
                  style={{
                    padding: '0.35rem 0.55rem',
                    textAlign: 'left',
                    color: '#334155',
                    borderBottom: '1px solid #e2e8f0',
                  }}
                >
                  {item.product}
                </td>
                <td
                  style={{
                    padding: '0.35rem 0.55rem',
                    textAlign: 'center',
                    color: '#475569',
                    borderBottom: '1px solid #e2e8f0',
                  }}
                >
                  {item.quantity}
                </td>
                <td
                  style={{
                    padding: '0.35rem 0.55rem',
                    textAlign: 'right',
                    color: '#475569',
                    borderBottom: '1px solid #e2e8f0',
                  }}
                >
                  {currencySymbol}
                  {Number(item.rate).toFixed(2)}
                </td>
                <td
                  style={{
                    padding: '0.35rem 0.55rem',
                    textAlign: 'right',
                    color: '#1e293b',
                    fontWeight: 600,
                    borderBottom: '1px solid #e2e8f0',
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
            marginTop: '0.65rem',
          }}
        >
          <div style={{ width: '260px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.3rem 0.55rem',
                fontSize: 'calc(0.8rem + 2px)',
                color: '#64748b',
                borderBottom: '1px solid #f1f5f9',
              }}
            >
              <span>Subtotal</span>
              <span style={{ fontWeight: 500, color: '#334155' }}>
                {' '}
                {currencySymbol}
                {total.toFixed(2)}
              </span>
            </div>
            {discount != null && discount > 0 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.3rem 0.55rem',
                  fontSize: 'calc(0.8rem + 2px)',
                  color: '#059669',
                  borderBottom: '1px solid #f1f5f9',
                }}
              >
                <span>Discount</span>
                <span style={{ fontWeight: 500 }}>
                  - {currencySymbol}
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
                  padding: '0.3rem 0.55rem',
                  fontSize: 'calc(0.8rem + 2px)',
                  color: '#64748b',
                  borderBottom: '1px solid #f1f5f9',
                }}
              >
                <span>Tax</span>
                <span style={{ fontWeight: 500, color: '#334155' }}>
                  + {currencySymbol}
                  {(isTaxPercentage && tax > 0 ? (totalAfterDiscount * tax) / 100 : tax).toFixed(2)}
                </span>
              </div>
            )}
            {shipping != null && shipping > 0 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.3rem 0.55rem',
                  fontSize: 'calc(0.8rem + 2px)',
                  color: '#64748b',
                  borderBottom: '1px solid #f1f5f9',
                }}
              >
                <span>Shipping</span>
                <span style={{ fontWeight: 500, color: '#334155' }}>
                  + {currencySymbol}
                  {Number(shipping).toFixed(2)}
                </span>
              </div>
            )}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.45rem 0.65rem',
                marginTop: '0.25rem',
                backgroundColor: '#1e293b',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: 'calc(0.92rem + 2px)',
                borderRadius: '6px',
              }}
            >
              <span>Total</span>
              <span>
                {' '}
                {currencySymbol}
                {finalTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {note?.trim() ? (
          <div
            style={{
              marginTop: '0.85rem',
              paddingTop: '0.65rem',
              borderTop: '1px solid #e2e8f0',
            }}
          >
            <p style={labelStyle}>Note</p>
            <p style={addressStyle}>{note}</p>
          </div>
        ) : null}

        {signatureObjectUrl ? (
          <div
            style={{
              marginTop: note?.trim() ? '0.65rem' : '0.85rem',
              paddingTop: note?.trim() ? 0 : '0.65rem',
              borderTop: note?.trim() ? 'none' : '1px solid #e2e8f0',
            }}
          >
            <p style={labelStyle}>Signature</p>
            <img
              src={signatureObjectUrl}
              alt="Signature"
              style={{
                maxWidth: '180px',
                maxHeight: '72px',
                objectFit: 'contain',
                display: 'block',
                marginTop: '4px',
              }}
            />
          </div>
        ) : null}

        {/* Footer */}
        <div
          style={{
            marginTop: '1rem',
            paddingTop: '0.55rem',
            borderTop: '1px solid #e2e8f0',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: 'calc(0.72rem + 1px)',
              color: '#94a3b8',
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Thank you for your business.
          </p>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            height: '3px',
            background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
            borderRadius: '2px',
            marginTop: '0.55rem',
          }}
        />
      </div>
    </div>
  )
}
