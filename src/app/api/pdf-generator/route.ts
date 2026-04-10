import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium-min'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const htmlParam: string | undefined = body?.html
  const signatureDataUrl: string | undefined = body?.signatureDataUrl
  const qrCodeDataUrl: string | undefined = body?.qrCodeDataUrl

  if (!htmlParam) {
    return new NextResponse('Please provide the HTML.', { status: 400 })
  }

  let html = htmlParam
  if (signatureDataUrl && typeof signatureDataUrl === 'string' && signatureDataUrl.startsWith('data:image')) {
    const marker = signatureDataUrl.slice(0, 48)
    if (!html.includes(marker)) {
      html += `<div style="margin-top:10px;padding-top:8px;border-top:1px solid #e2e8f0"><p style="font-size:0.65rem;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;margin:0 0 4px 0">Signature</p><img src="${signatureDataUrl.replace(/"/g, '&quot;')}" alt="Signature" style="max-width:180px;max-height:72px;object-fit:contain;display:block" /></div>`
    }
  }
  if (qrCodeDataUrl && typeof qrCodeDataUrl === 'string' && qrCodeDataUrl.startsWith('data:image')) {
    const marker = qrCodeDataUrl.slice(0, 48)
    if (!html.includes(marker)) {
      html += `<div style="margin-top:10px;padding-top:8px;border-top:1px solid #e2e8f0;text-align:right"><p style="font-size:0.65rem;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;margin:0 0 4px 0;text-align:right">QR Code</p><img src="${qrCodeDataUrl.replace(/"/g, '&quot;')}" alt="QR Code" style="max-width:180px;max-height:72px;object-fit:contain;display:block;margin-left:auto" /></div>`
    }
  }

  // A4 is 210mm wide. Invoice markup uses maxWidth 780px (~206mm), which is wider than the printable
  // area once PDF margins apply, so Chromium clips the right side and the right border disappears.
  const pdfMarginMm = 8
  const pdfContentWidthMm = 210 - pdfMarginMm * 2

  const documentHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
html,body{margin:0;padding:0;}
.pdf-root{box-sizing:border-box;width:${pdfContentWidthMm}mm;max-width:100%;margin:0 auto;}
.pdf-root > *{box-sizing:border-box;max-width:100% !important;}
</style></head><body><div class="pdf-root">${html}</div></body></html>`

  let browser

  try {
    const isVercel = !!process.env.VERCEL_ENV

    const pptr = isVercel ? puppeteer : ((await import('puppeteer')) as unknown as typeof puppeteer)

    browser = await pptr.launch(
      isVercel
        ? {
            headless: true,
            args: chromium.args,
            executablePath: await chromium.executablePath(
              'https://github.com/Sparticuz/chromium/releases/download/v143.0.4/chromium-v143.0.4-pack.x64.tar',
            ),
          }
        : {
            headless: true,
            args: puppeteer.defaultArgs(),
          },
    )

    const page = await browser.newPage()
    await page.setContent(documentHtml, { waitUntil: 'load' })

    const marginCss = `${pdfMarginMm}mm`
    const pdf = await page.pdf({
      path: undefined,
      printBackground: true,
      format: 'A4',
      margin: { top: marginCss, right: marginCss, bottom: marginCss, left: marginCss },
    })
    return new NextResponse(Buffer.from(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="page-output.pdf"',
      },
    })
  } catch (error) {
    console.error(error)
    return new NextResponse('An error occurred while generating the PDF.', {
      status: 500,
    })
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}
