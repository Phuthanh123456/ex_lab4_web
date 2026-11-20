import type { ProfilerOnRenderCallback } from 'react'

export function traceLegacy(kind: 'render' | 'effect', label: string) {
  if (import.meta.env.DEV) console.log(`[Legacy ${kind}] ${label}`)
}

export const traceLegacyCommit: ProfilerOnRenderCallback = (id, phase) => {
  console.count('[Legacy Profiler] commits')
  console.log(`[Legacy commit] ${id}: ${phase}`)
}
