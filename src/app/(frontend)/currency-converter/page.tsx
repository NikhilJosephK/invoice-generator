'use client'

import { useState } from 'react'
import getSymbolFromCurrency from 'currency-symbol-map'

export default function CurrencyConverterPage() {
  const [inputAmount, setInputAmount] = useState(1)
  const [baseSymbol, setBaseSymbol] = useState(() => getSymbolFromCurrency('USD') ?? '$')
  const [quoteSymbol, setQuoteSymbol] = useState(() => getSymbolFromCurrency('EUR') ?? '€')
  const [isFlipped, setIsFlipped] = useState(false)
  const [isConverted, setIsConverted] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [base, setBase] = useState('USD')
  const [quote, setQuote] = useState('EUR')
  const [rate, setRate] = useState(0)
  const selectClassName =
    'w-full min-w-0 appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm font-medium text-slate-800 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:ring-offset-2 focus:border-indigo-400'
  const converted =
    Number.isFinite(rate) && Number.isFinite(inputAmount) ? rate * inputAmount : null

  async function converter() {
    setIsConverting(true)
    try {
      const res = await fetch(
        `https://api.frankfurter.dev/v2/rates?base=${isFlipped ? base : quote}&quotes=${isFlipped ? quote : base}`,
      )
      const data = await res.json()
      setRate(data?.[0].rate)
    } catch (error) {
      throw new Error('Failed to fetch rates inside converter() function', { cause: error })
    } finally {
      setIsConverting(false)
    }
  }

  return (
    <section className="flex min-h-[calc(100dvh-9rem)] w-full flex-1 flex-col sm:min-h-[calc(100dvh-8.5rem)]">
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-4 py-8 sm:max-w-2xl sm:px-6 sm:py-12">
        <div className="relative overflow-hidden rounded-sm border border-slate-200/90 bg-white/90 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.2)] ring-1 ring-slate-900/4 backdrop-blur-sm">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.45]"
            aria-hidden
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(148,163,184,0.12) 31px, rgba(148,163,184,0.12) 32px)',
            }}
          />
          <div className="relative border-b border-double border-slate-300/80 bg-linear-to-b from-slate-50/90 to-white px-5 py-6 sm:px-8 sm:py-8">
            <p className="text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500 sm:text-[11px] sm:tracking-[0.32em]">
              Exchange
            </p>
            <h1 className="mt-2 text-center font-serif text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Currency converter
            </h1>
            <p className="mx-auto mt-2 max-w-md text-center text-sm leading-relaxed text-slate-600">
              Compare amounts using live reference rates. Choose currencies, enter an amount, then
              convert.
            </p>
          </div>

          <div className="relative space-y-6 px-5 py-7 sm:space-y-8 sm:px-8 sm:py-9">
            <div>
              <label
                htmlFor="amount"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Amount
              </label>
              <input
                id="amount"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                defaultValue={1}
                className="focus-ring mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 font-mono text-lg text-slate-900 tabular-nums shadow-inner shadow-slate-900/5 transition-colors placeholder:text-slate-400 hover:border-slate-300"
                placeholder="0.00"
                onChange={(e) => {
                  setInputAmount(Number(e.target.value) || 0)
                }}
              />
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Currencies
              </p>
              <div
                className={`flex flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-3 ${isFlipped ? 'sm:flex-row-reverse' : ''}`}
              >
                <div className="relative min-w-0 flex-1">
                  <span
                    className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400 text-sm tabular-nums -bottom-px"
                    aria-hidden
                  >
                    {baseSymbol}
                  </span>
                  <select
                    name="currency"
                    id="base"
                    defaultValue="USD"
                    onChange={(e) => {
                      setBaseSymbol(getSymbolFromCurrency(e.target.value) ?? e.target.value)
                      setBase(e.target.value)
                      setRate(0)
                    }}
                    className={selectClassName}
                    aria-label="Base currency"
                  >
                    <option value="AED">AED</option>
                    <option value="AFN">AFN</option>
                    <option value="ALL">ALL</option>
                    <option value="AMD">AMD</option>
                    <option value="ANG">ANG</option>
                    <option value="AOA">AOA</option>
                    <option value="ARS">ARS</option>
                    <option value="AUD">AUD</option>
                    <option value="AWG">AWG</option>
                    <option value="AZN">AZN</option>
                    <option value="BAM">BAM</option>
                    <option value="BBD">BBD</option>
                    <option value="BDT">BDT</option>
                    <option value="BGN">BGN</option>
                    <option value="BHD">BHD</option>
                    <option value="BIF">BIF</option>
                    <option value="BMD">BMD</option>
                    <option value="BND">BND</option>
                    <option value="BOB">BOB</option>
                    <option value="BRL">BRL</option>
                    <option value="BSD">BSD</option>
                    <option value="BTN">BTN</option>
                    <option value="BWP">BWP</option>
                    <option value="BYR">BYR</option>
                    <option value="BZD">BZD</option>
                    <option value="CAD">CAD</option>
                    <option value="CDF">CDF</option>
                    <option value="CHF">CHF</option>
                    <option value="CLP">CLP</option>
                    <option value="CNH">CNH</option>
                    <option value="CNY">CNY</option>
                    <option value="COP">COP</option>
                    <option value="CRC">CRC</option>
                    <option value="CUP">CUP</option>
                    <option value="CVE">CVE</option>
                    <option value="CZK">CZK</option>
                    <option value="DJF">DJF</option>
                    <option value="DKK">DKK</option>
                    <option value="DOP">DOP</option>
                    <option value="DZD">DZD</option>
                    <option value="EGP">EGP</option>
                    <option value="ERN">ERN</option>
                    <option value="ETB">ETB</option>
                    <option value="EUR">EUR</option>
                    <option value="FJD">FJD</option>
                    <option value="FKP">FKP</option>
                    <option value="GBP">GBP</option>
                    <option value="GEL">GEL</option>
                    <option value="GGP">GGP</option>
                    <option value="GHS">GHS</option>
                    <option value="GIP">GIP</option>
                    <option value="GMD">GMD</option>
                    <option value="GNF">GNF</option>
                    <option value="GTQ">GTQ</option>
                    <option value="GYD">GYD</option>
                    <option value="HKD">HKD</option>
                    <option value="HNL">HNL</option>
                    <option value="HRK">HRK</option>
                    <option value="HTG">HTG</option>
                    <option value="HUF">HUF</option>
                    <option value="IDR">IDR</option>
                    <option value="ILS">ILS</option>
                    <option value="IMP">IMP</option>
                    <option value="INR">INR</option>
                    <option value="IQD">IQD</option>
                    <option value="IRR">IRR</option>
                    <option value="ISK">ISK</option>
                    <option value="JEP">JEP</option>
                    <option value="JMD">JMD</option>
                    <option value="JOD">JOD</option>
                    <option value="JPY">JPY</option>
                    <option value="KES">KES</option>
                    <option value="KGS">KGS</option>
                    <option value="KHR">KHR</option>
                    <option value="KMF">KMF</option>
                    <option value="KPW">KPW</option>
                    <option value="KRW">KRW</option>
                    <option value="KWD">KWD</option>
                    <option value="KYD">KYD</option>
                    <option value="KZT">KZT</option>
                    <option value="LAK">LAK</option>
                    <option value="LBP">LBP</option>
                    <option value="LKR">LKR</option>
                    <option value="LRD">LRD</option>
                    <option value="LSL">LSL</option>
                    <option value="LTL">LTL</option>
                    <option value="LVL">LVL</option>
                    <option value="LYD">LYD</option>
                    <option value="MAD">MAD</option>
                    <option value="MDL">MDL</option>
                    <option value="MGA">MGA</option>
                    <option value="MKD">MKD</option>
                    <option value="MMK">MMK</option>
                    <option value="MNK">MNK</option>
                    <option value="MNT">MNT</option>
                    <option value="MOP">MOP</option>
                    <option value="MRO">MRO</option>
                    <option value="MUR">MUR</option>
                    <option value="MVR">MVR</option>
                    <option value="MWK">MWK</option>
                    <option value="MXN">MXN</option>
                    <option value="MYR">MYR</option>
                    <option value="MZN">MZN</option>
                    <option value="NAD">NAD</option>
                    <option value="NGN">NGN</option>
                    <option value="NIO">NIO</option>
                    <option value="NOK">NOK</option>
                    <option value="NPR">NPR</option>
                    <option value="NZD">NZD</option>
                    <option value="OMR">OMR</option>
                    <option value="PAB">PAB</option>
                    <option value="PEN">PEN</option>
                    <option value="PGK">PGK</option>
                    <option value="PHP">PHP</option>
                    <option value="PKR">PKR</option>
                    <option value="PLN">PLN</option>
                    <option value="PRB">PRB</option>
                    <option value="PYG">PYG</option>
                    <option value="QAR">QAR</option>
                    <option value="RMB">RMB</option>
                    <option value="RON">RON</option>
                    <option value="RSD">RSD</option>
                    <option value="RUB">RUB</option>
                    <option value="RWF">RWF</option>
                    <option value="SAR">SAR</option>
                    <option value="SBD">SBD</option>
                    <option value="SCR">SCR</option>
                    <option value="SDG">SDG</option>
                    <option value="SEK">SEK</option>
                    <option value="SGD">SGD</option>
                    <option value="SHP">SHP</option>
                    <option value="SLL">SLL</option>
                    <option value="SOS">SOS</option>
                    <option value="SRD">SRD</option>
                    <option value="SSP">SSP</option>
                    <option value="STD">STD</option>
                    <option value="STN">STN</option>
                    <option value="SVC">SVC</option>
                    <option value="SYP">SYP</option>
                    <option value="SZL">SZL</option>
                    <option value="THB">THB</option>
                    <option value="TJS">TJS</option>
                    <option value="TMT">TMT</option>
                    <option value="TND">TND</option>
                    <option value="TOP">TOP</option>
                    <option value="TRY">TRY</option>
                    <option value="TTD">TTD</option>
                    <option value="TVD">TVD</option>
                    <option value="TWD">TWD</option>
                    <option value="TZS">TZS</option>
                    <option value="UAH">UAH</option>
                    <option value="UGX">UGX</option>
                    <option value="USD">USD</option>
                    <option value="UYU">UYU</option>
                    <option value="UZS">UZS</option>
                    <option value="VED">VED</option>
                    <option value="VEF">VEF</option>
                    <option value="VES">VES</option>
                    <option value="VND">VND</option>
                    <option value="VUV">VUV</option>
                    <option value="WST">WST</option>
                    <option value="XAF">XAF</option>
                    <option value="XCD">XCD</option>
                    <option value="XCG">XCG</option>
                    <option value="XOF">XOF</option>
                    <option value="XPF">XPF</option>
                    <option value="YER">YER</option>
                    <option value="ZAR">ZAR</option>
                    <option value="ZIG">ZIG</option>
                    <option value="ZMK">ZMK</option>
                    <option value="ZMW">ZMW</option>
                    <option value="ZWD">ZWD</option>
                    <option value="ZWL">ZWL</option>
                  </select>
                </div>
                <div className="flex shrink-0 items-center justify-center sm:w-12">
                  <button
                    type="button"
                    onClick={() => {
                      setIsFlipped((prev) => !prev)
                    }}
                    className="focus-ring inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 shadow-sm transition-colors hover:border-slate-300 hover:bg-white hover:text-slate-900 sm:h-12 sm:w-12 sm:rounded-full sm:px-0"
                    aria-label="Swap base and quote currency"
                  >
                    <span className="sm:sr-only">Swap currencies</span>
                    <span className="hidden sm:inline" aria-hidden>
                      ⇄
                    </span>
                  </button>
                </div>
                <div className="relative min-w-0 flex-1">
                  <span
                    className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400 text-sm tabular-nums"
                    aria-hidden
                  >
                    {quoteSymbol}
                  </span>
                  <select
                    name="currency"
                    id="quote"
                    defaultValue="EUR"
                    onChange={(e) => {
                      setQuoteSymbol(getSymbolFromCurrency(e.target.value) ?? e.target.value)
                      setQuote(e.target.value)
                      setRate(0)
                    }}
                    className={selectClassName}
                    aria-label="Quote currency"
                  >
                    <option value="AED">AED</option>
                    <option value="AFN">AFN</option>
                    <option value="ALL">ALL</option>
                    <option value="AMD">AMD</option>
                    <option value="ANG">ANG</option>
                    <option value="AOA">AOA</option>
                    <option value="ARS">ARS</option>
                    <option value="AUD">AUD</option>
                    <option value="AWG">AWG</option>
                    <option value="AZN">AZN</option>
                    <option value="BAM">BAM</option>
                    <option value="BBD">BBD</option>
                    <option value="BDT">BDT</option>
                    <option value="BGN">BGN</option>
                    <option value="BHD">BHD</option>
                    <option value="BIF">BIF</option>
                    <option value="BMD">BMD</option>
                    <option value="BND">BND</option>
                    <option value="BOB">BOB</option>
                    <option value="BRL">BRL</option>
                    <option value="BSD">BSD</option>
                    <option value="BTN">BTN</option>
                    <option value="BWP">BWP</option>
                    <option value="BYR">BYR</option>
                    <option value="BZD">BZD</option>
                    <option value="CAD">CAD</option>
                    <option value="CDF">CDF</option>
                    <option value="CHF">CHF</option>
                    <option value="CLP">CLP</option>
                    <option value="CNH">CNH</option>
                    <option value="CNY">CNY</option>
                    <option value="COP">COP</option>
                    <option value="CRC">CRC</option>
                    <option value="CUP">CUP</option>
                    <option value="CVE">CVE</option>
                    <option value="CZK">CZK</option>
                    <option value="DJF">DJF</option>
                    <option value="DKK">DKK</option>
                    <option value="DOP">DOP</option>
                    <option value="DZD">DZD</option>
                    <option value="EGP">EGP</option>
                    <option value="ERN">ERN</option>
                    <option value="ETB">ETB</option>
                    <option value="EUR">EUR</option>
                    <option value="FJD">FJD</option>
                    <option value="FKP">FKP</option>
                    <option value="GBP">GBP</option>
                    <option value="GEL">GEL</option>
                    <option value="GGP">GGP</option>
                    <option value="GHS">GHS</option>
                    <option value="GIP">GIP</option>
                    <option value="GMD">GMD</option>
                    <option value="GNF">GNF</option>
                    <option value="GTQ">GTQ</option>
                    <option value="GYD">GYD</option>
                    <option value="HKD">HKD</option>
                    <option value="HNL">HNL</option>
                    <option value="HRK">HRK</option>
                    <option value="HTG">HTG</option>
                    <option value="HUF">HUF</option>
                    <option value="IDR">IDR</option>
                    <option value="ILS">ILS</option>
                    <option value="IMP">IMP</option>
                    <option value="INR">INR</option>
                    <option value="IQD">IQD</option>
                    <option value="IRR">IRR</option>
                    <option value="ISK">ISK</option>
                    <option value="JEP">JEP</option>
                    <option value="JMD">JMD</option>
                    <option value="JOD">JOD</option>
                    <option value="JPY">JPY</option>
                    <option value="KES">KES</option>
                    <option value="KGS">KGS</option>
                    <option value="KHR">KHR</option>
                    <option value="KMF">KMF</option>
                    <option value="KPW">KPW</option>
                    <option value="KRW">KRW</option>
                    <option value="KWD">KWD</option>
                    <option value="KYD">KYD</option>
                    <option value="KZT">KZT</option>
                    <option value="LAK">LAK</option>
                    <option value="LBP">LBP</option>
                    <option value="LKR">LKR</option>
                    <option value="LRD">LRD</option>
                    <option value="LSL">LSL</option>
                    <option value="LTL">LTL</option>
                    <option value="LVL">LVL</option>
                    <option value="LYD">LYD</option>
                    <option value="MAD">MAD</option>
                    <option value="MDL">MDL</option>
                    <option value="MGA">MGA</option>
                    <option value="MKD">MKD</option>
                    <option value="MMK">MMK</option>
                    <option value="MNK">MNK</option>
                    <option value="MNT">MNT</option>
                    <option value="MOP">MOP</option>
                    <option value="MRO">MRO</option>
                    <option value="MUR">MUR</option>
                    <option value="MVR">MVR</option>
                    <option value="MWK">MWK</option>
                    <option value="MXN">MXN</option>
                    <option value="MYR">MYR</option>
                    <option value="MZN">MZN</option>
                    <option value="NAD">NAD</option>
                    <option value="NGN">NGN</option>
                    <option value="NIO">NIO</option>
                    <option value="NOK">NOK</option>
                    <option value="NPR">NPR</option>
                    <option value="NZD">NZD</option>
                    <option value="OMR">OMR</option>
                    <option value="PAB">PAB</option>
                    <option value="PEN">PEN</option>
                    <option value="PGK">PGK</option>
                    <option value="PHP">PHP</option>
                    <option value="PKR">PKR</option>
                    <option value="PLN">PLN</option>
                    <option value="PRB">PRB</option>
                    <option value="PYG">PYG</option>
                    <option value="QAR">QAR</option>
                    <option value="RMB">RMB</option>
                    <option value="RON">RON</option>
                    <option value="RSD">RSD</option>
                    <option value="RUB">RUB</option>
                    <option value="RWF">RWF</option>
                    <option value="SAR">SAR</option>
                    <option value="SBD">SBD</option>
                    <option value="SCR">SCR</option>
                    <option value="SDG">SDG</option>
                    <option value="SEK">SEK</option>
                    <option value="SGD">SGD</option>
                    <option value="SHP">SHP</option>
                    <option value="SLL">SLL</option>
                    <option value="SOS">SOS</option>
                    <option value="SRD">SRD</option>
                    <option value="SSP">SSP</option>
                    <option value="STD">STD</option>
                    <option value="STN">STN</option>
                    <option value="SVC">SVC</option>
                    <option value="SYP">SYP</option>
                    <option value="SZL">SZL</option>
                    <option value="THB">THB</option>
                    <option value="TJS">TJS</option>
                    <option value="TMT">TMT</option>
                    <option value="TND">TND</option>
                    <option value="TOP">TOP</option>
                    <option value="TRY">TRY</option>
                    <option value="TTD">TTD</option>
                    <option value="TVD">TVD</option>
                    <option value="TWD">TWD</option>
                    <option value="TZS">TZS</option>
                    <option value="UAH">UAH</option>
                    <option value="UGX">UGX</option>
                    <option value="USD">USD</option>
                    <option value="UYU">UYU</option>
                    <option value="UZS">UZS</option>
                    <option value="VED">VED</option>
                    <option value="VEF">VEF</option>
                    <option value="VES">VES</option>
                    <option value="VND">VND</option>
                    <option value="VUV">VUV</option>
                    <option value="WST">WST</option>
                    <option value="XAF">XAF</option>
                    <option value="XCD">XCD</option>
                    <option value="XCG">XCG</option>
                    <option value="XOF">XOF</option>
                    <option value="XPF">XPF</option>
                    <option value="YER">YER</option>
                    <option value="ZAR">ZAR</option>
                    <option value="ZIG">ZIG</option>
                    <option value="ZMK">ZMK</option>
                    <option value="ZMW">ZMW</option>
                    <option value="ZWD">ZWD</option>
                    <option value="ZWL">ZWL</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="button"
              disabled={isConverting}
              aria-busy={isConverting}
              onClick={() => {
                void converter()
              }}
              className="focus-ring inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-5 py-3.5 text-sm font-semibold tracking-wide text-white shadow-md transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isConverting ? (
                <>
                  <svg
                    className="h-4 w-4 shrink-0 animate-spin text-white/90"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-90"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Converting…</span>
                </>
              ) : (
                'Convert'
              )}
            </button>

            <div className="rounded-lg border border-slate-200 bg-slate-50/80 px-4 py-4 sm:px-5 sm:py-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Result
              </p>
              <p className="mt-2 wrap-break-word font-mono text-xl font-semibold tabular-nums text-slate-900 sm:text-2xl">
                {rate <= 0 || converted === null || !Number.isFinite(converted)
                  ? '—'
                  : `${quoteSymbol}${converted.toLocaleString(undefined, { maximumFractionDigits: 6 })}`}
              </p>
              {rate > 0 && base && quote ? (
                <p className="mt-2 text-xs text-slate-500">
                  {isFlipped ? rate.toLocaleString(undefined, { maximumFractionDigits: 6 }) : 1}{' '}
                  {isFlipped ? quote : base} ={' '}
                  {isFlipped ? 1 : rate.toLocaleString(undefined, { maximumFractionDigits: 6 })}{' '}
                  {isFlipped ? base : quote}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
