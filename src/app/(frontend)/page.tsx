import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `linear-gradient(to right, rgb(148 163 184 / 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(148 163 184 / 0.15) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-indigo-400/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-1/4 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[min(90%,42rem)] -translate-x-1/2 rounded-full bg-indigo-300/30 blur-3xl"
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto w-full max-w-3xl text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600/90 sm:text-xs">
            InvoiceStack
          </p>
          <h1 className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl md:text-5xl">
            Professional invoices, free and fast
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
            Pick a template, fill in your details, and download a polished PDF.
            <br aria-hidden="true" className="max-lg:hidden" /> No account required.
          </p>
        </div>

        <div className="mx-auto mt-12 grid w-full max-w-4xl gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6">
          <Link
            href="/pro-forma-invoice"
            className="group relative flex flex-col rounded-2xl border border-white/80 bg-white/70 p-6 shadow-[0_1px_0_rgb(255_255_255/0.9)_inset,0_12px_40px_-12px_rgb(99_102_241/0.35)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-indigo-200/90 hover:bg-white/90 hover:shadow-[0_1px_0_rgb(255_255_255/1)_inset,0_20px_50px_-12px_rgb(99_102_241/0.45)] sm:p-7"
          >
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </span>
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
              Pro forma invoice
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
              Classic layout with line items, totals, and terms—ideal for quotes and formal billing.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition group-hover:gap-2.5">
              Open builder
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </Link>

          <Link
            href="/freelance-invoice"
            className="group relative flex flex-col rounded-2xl border border-white/80 bg-white/70 p-6 shadow-[0_1px_0_rgb(255_255_255/0.9)_inset,0_12px_40px_-12px_rgb(139_92_246/0.3)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-violet-200/90 hover:bg-white/90 hover:shadow-[0_1px_0_rgb(255_255_255/1)_inset,0_20px_50px_-12px_rgb(139_92_246/0.4)] sm:p-7"
          >
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
              Freelance invoice
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
              A streamlined look for independent work—projects, hourly rates, and client-ready
              polish.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 transition group-hover:gap-2.5">
              Open builder
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
