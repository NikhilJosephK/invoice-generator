'use client'

import { useRef } from 'react'
import SignatureCanvas from 'react-signature-canvas'

type SignatureMakerProps = {
  onSignatureChange: (dataUrl: string) => void
}

const canvasClass =
  'w-full max-w-md rounded-lg border border-slate-200 bg-white touch-none cursor-crosshair'

export function SignatureMaker({ onSignatureChange }: SignatureMakerProps) {
  const sigRef = useRef<SignatureCanvas | null>(null)

  const clear = () => {
    sigRef.current?.clear()
  }

  const apply = () => {
    const pad = sigRef.current
    if (!pad || pad.isEmpty()) return
    const dataURL = pad.getTrimmedCanvas().toDataURL('image/png')
    onSignatureChange(dataURL)
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        Draw signature
      </p>
      <div className="rounded-xl border border-slate-200/90 bg-slate-50/40 p-4">
        <SignatureCanvas
          ref={sigRef}
          penColor="#0f172a"
          backgroundColor="rgba(255,255,255,0)"
          canvasProps={{
            width: 400,
            height: 140,
            className: canvasClass,
          }}
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={clear}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            Clear pad
          </button>
          <button
            type="button"
            onClick={apply}
            className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
          >
            Apply to invoice
          </button>
        </div>
      </div>
    </div>
  )
}
