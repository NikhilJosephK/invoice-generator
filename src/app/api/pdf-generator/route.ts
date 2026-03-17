import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium-min'

export async function POST(request: NextRequest) {
  const { html: htmlParam } = await request.json()

  if (!htmlParam) {
    return new NextResponse('Please provide the HTML.', { status: 400 })
  }

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
    await page.setContent(htmlParam, { waitUntil: 'load' })

    const pdf = await page.pdf({
      path: undefined,
      printBackground: true,
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
