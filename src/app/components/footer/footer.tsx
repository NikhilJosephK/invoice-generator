export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/60 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 max-lg:flex-col max-lg:items-center max-lg:justify-center">
          <p className="text-sm text-slate-500 max-lg:text-center">
            © {new Date().getFullYear()} Invoice Generator. Create professional invoices for free.
          </p>
          <div className="flex gap-6 text-sm">
            <span className="text-slate-400">Simple · Fast · Professional</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
