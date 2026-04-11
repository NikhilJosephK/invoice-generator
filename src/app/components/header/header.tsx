import Image from 'next/image'

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-white/80 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-x-0 -top-16 h-24 bg-radial-[circle_at_top] from-indigo-300/40 via-violet-200/20 to-transparent blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-indigo-300/70 to-transparent" />
      </div>

      <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-3 max-sm:justify-between sm:justify-between sm:px-6 sm:py-4">
        <div className="flex items-center gap-1">
          <div className="relative">
            <div className="relative grid h-9 w-9 place-items-center sm:h-10 sm:w-10">
              <span className="text-base sm:text-lg" aria-hidden>
                <Image
                  src="/logo/invoice-stack-logo.svg"
                  alt="InvoiceStack"
                  width={32}
                  height={32}
                />
              </span>
            </div>
          </div>
          <div className="leading-tight">
            <h1 className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg md:text-xl">
              invoiceStack
            </h1>
          </div>
        </div>

        <div className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-600 shadow-sm sm:text-[11px] sm:tracking-[0.16em]">
          Generate Free Invoice
        </div>
      </div>
    </header>
  )
}
