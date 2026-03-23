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
    subtotal,
    discount,
    isDiscountPercentage,
    tax,
    isTaxPercentage,
    shipping,
    totalDue,
  } = innerData || {}

  const computedSubtotal = tableData?.reduce((sum: number, item: any) => sum + (item.amount || 0), 0) ?? 0
  const total = subtotal ?? computedSubtotal
  const totalAfterDiscount =
    isDiscountPercentage && discount > 0 ? total - (total * discount) / 100 : total - (discount || 0)
  const totalAfterTax =
    isTaxPercentage && tax > 0
      ? totalAfterDiscount + (totalAfterDiscount * tax) / 100
      : totalAfterDiscount + (tax || 0)
  const finalTotal = totalDue ?? totalAfterTax + (shipping || 0)

  const labelStyle: React.CSSProperties = {
    fontSize: '0.7rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#94a3b8',
    marginBottom: '4px',
  }

  const addressStyle: React.CSSProperties = {
    fontSize: '0.85rem',
    color: '#334155',
    lineHeight: 1.6,
    whiteSpace: 'pre-line',
    margin: 0,
  }

  return (
    <div id="invoice">
      <div
        style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          maxWidth: '780px',
          margin: '2rem auto',
          padding: '3rem',
          backgroundColor: '#ffffff',
          color: '#1a1a1a',
          border: '1px solid #e2e8f0',
        }}
      >
        {/* Top accent */}
        <div
          style={{
            height: '4px',
            background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
            borderRadius: '2px',
            marginBottom: '2.5rem',
          }}
        />

        {/* Header: Logo + Invoice title / number */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '2.5rem',
          }}
        >
          <div>
            {ImageObjectUrl && (
              <img
                src={ImageObjectUrl}
                alt="logo"
                style={{
                  maxWidth: '140px',
                  maxHeight: '80px',
                  objectFit: 'contain',
                  marginBottom: '0.5rem',
                }}
              />
            )}
          </div>
          <div style={{ textAlign: 'right' }}>
            <h1
              style={{
                fontSize: '2.2rem',
                fontWeight: 800,
                color: '#2563eb',
                margin: 0,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Invoice
            </h1>
            {invoiceNumber && (
              <p
                style={{
                  fontSize: '0.95rem',
                  color: '#64748b',
                  margin: '6px 0 0 0',
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
            gap: '2rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Left: From / Bill To / Ship To */}
          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', flex: 1 }}>
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
              <div style={{ marginBottom: '0.75rem' }}>
                <p style={{ ...labelStyle, textAlign: 'right' }}>Date</p>
                <p
                  style={{
                    fontSize: '0.9rem',
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
                    fontSize: '0.9rem',
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
            marginBottom: '1.5rem',
          }}
        />

        {/* Items Table */}
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.88rem',
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: '0.8rem 1rem',
                  textAlign: 'left',
                  fontWeight: 700,
                  fontSize: '0.72rem',
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
                  padding: '0.8rem 1rem',
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: '0.72rem',
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
                  padding: '0.8rem 1rem',
                  textAlign: 'right',
                  fontWeight: 700,
                  fontSize: '0.72rem',
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
                  padding: '0.8rem 1rem',
                  textAlign: 'right',
                  fontWeight: 700,
                  fontSize: '0.72rem',
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
                    padding: '0.7rem 1rem',
                    textAlign: 'left',
                    color: '#334155',
                    borderBottom: '1px solid #e2e8f0',
                  }}
                >
                  {item.product}
                </td>
                <td
                  style={{
                    padding: '0.7rem 1rem',
                    textAlign: 'center',
                    color: '#475569',
                    borderBottom: '1px solid #e2e8f0',
                  }}
                >
                  {item.quantity}
                </td>
                <td
                  style={{
                    padding: '0.7rem 1rem',
                    textAlign: 'right',
                    color: '#475569',
                    borderBottom: '1px solid #e2e8f0',
                  }}
                >
                  ${Number(item.rate).toFixed(2)}
                </td>
                <td
                  style={{
                    padding: '0.7rem 1rem',
                    textAlign: 'right',
                    color: '#1e293b',
                    fontWeight: 600,
                    borderBottom: '1px solid #e2e8f0',
                  }}
                >
                  ${Number(item.amount).toFixed(2)}
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
            marginTop: '1.5rem',
          }}
        >
          <div style={{ width: '280px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.5rem 1rem',
                fontSize: '0.88rem',
                color: '#64748b',
                borderBottom: '1px solid #f1f5f9',
              }}
            >
              <span>Subtotal</span>
              <span style={{ fontWeight: 500, color: '#334155' }}>${total.toFixed(2)}</span>
            </div>
            {discount != null && discount > 0 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.5rem 1rem',
                  fontSize: '0.88rem',
                  color: '#059669',
                  borderBottom: '1px solid #f1f5f9',
                }}
              >
                <span>Discount</span>
                <span style={{ fontWeight: 500 }}>
                  -
                  $
                  {(
                    isDiscountPercentage && discount > 0
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
                  padding: '0.5rem 1rem',
                  fontSize: '0.88rem',
                  color: '#64748b',
                  borderBottom: '1px solid #f1f5f9',
                }}
              >
                <span>Tax</span>
                <span style={{ fontWeight: 500, color: '#334155' }}>
                  +
                  $
                  {(
                    isTaxPercentage && tax > 0
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
                  padding: '0.5rem 1rem',
                  fontSize: '0.88rem',
                  color: '#64748b',
                  borderBottom: '1px solid #f1f5f9',
                }}
              >
                <span>Shipping</span>
                <span style={{ fontWeight: 500, color: '#334155' }}>
                  +${Number(shipping).toFixed(2)}
                </span>
              </div>
            )}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                marginTop: '0.5rem',
                backgroundColor: '#1e293b',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '1.05rem',
                borderRadius: '8px',
              }}
            >
              <span>Total Due</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: '3rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #e2e8f0',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '0.78rem',
              color: '#94a3b8',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Thank you for your business.
          </p>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            height: '4px',
            background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
            borderRadius: '2px',
            marginTop: '1.5rem',
          }}
        />
      </div>
    </div>
  )
}
