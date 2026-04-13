'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  NavigationMenuComponent,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/app/components/navigation-menu/navigation'

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {open ? (
        <>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </>
      ) : (
        <>
          <path d="M4 5h16" />
          <path d="M4 12h16" />
          <path d="M4 19h16" />
        </>
      )}
    </svg>
  )
}

export function HeaderNavigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  return (
    <>
      <NavigationMenuComponent
        className="relative z-50 hidden md:flex"
        delayDuration={40}
        skipDelayDuration={0}
      >
        <NavigationMenuList className="m-0 flex list-none items-center gap-1 p-0">
          <NavigationMenuItem value="tools" className="relative">
            <NavigationMenuTrigger className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-slate-600 outline-none transition-colors duration-200 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-indigo-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white data-[state=open]:text-slate-900 [&[data-state=open]>svg]:rotate-180">
              Tools
              <ChevronDown className="shrink-0 text-slate-500 transition-transform duration-200 ease-out" />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="header-tools-dropdown absolute right-0 top-full z-50 mt-2 min-w-48 origin-top-right rounded-xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/50 ring-1 ring-black/5">
              <ul className="m-0 grid list-none gap-0 p-0">
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/currency-converter"
                      className="block rounded-lg px-3 py-2.5 text-sm text-slate-700 no-underline outline-none hover:bg-indigo-50 hover:text-slate-900 focus-visible:bg-indigo-50 focus-visible:ring-2 focus-visible:ring-indigo-500/40"
                    >
                      Currency converter
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenuComponent>

      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-600 outline-none transition-colors duration-200 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-indigo-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white md:hidden"
        aria-expanded={mobileOpen}
        aria-controls="header-mobile-nav"
        onClick={() => setMobileOpen((v) => !v)}
      >
        <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
        <MenuIcon open={mobileOpen} />
      </button>

      {mobileOpen ? (
        <div
          id="header-mobile-nav"
          className="absolute inset-x-0 top-full z-50 border-b border-slate-200/80 bg-white/95 px-4 py-3 shadow-md backdrop-blur-xl md:hidden"
        >
          <details className="group rounded-lg border border-slate-200/90 bg-slate-50/80 open:bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 [&::-webkit-details-marker]:hidden">
              <span>Tools</span>
              <ChevronDown className="text-slate-500 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="border-t border-slate-200/80 px-2 py-1">
              <Link
                href="/currency-converter"
                className="block rounded-md px-3 py-2 text-sm text-slate-600 no-underline transition hover:bg-indigo-50 hover:text-slate-900 focus-visible:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500/40"
                onClick={() => setMobileOpen(false)}
              >
                Currency converter
              </Link>
            </div>
          </details>
        </div>
      ) : null}
    </>
  )
}
