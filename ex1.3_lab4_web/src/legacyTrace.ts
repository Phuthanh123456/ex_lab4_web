import type { ProfilerOnRenderCallback } from 'react'

export function traceLegacy(kind: 'render' | 'effect', label: string) {
  if (import.meta.env.DEV) console.log(`[Legacy ${kind}] ${label}`)
}

export const traceLegacyCommit: ProfilerOnRenderCallback = (id, phase) => {
  const label = id === 'SimpleForm' ? 'Legacy' : 'Refactored'
  console.count(`[${label} Profiler] commits`)
  console.log(`[${label} commit] ${id}: ${phase}`)
}
