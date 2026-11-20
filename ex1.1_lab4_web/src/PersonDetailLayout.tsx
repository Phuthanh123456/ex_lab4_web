import type { ReactNode } from 'react'
import type { Person } from './people'

export default function PersonDetailLayout({
  person,
  children,
  loading = false,
}: {
  person: Person | undefined
  children: ReactNode
  loading?: boolean
}) {
  return (
    <section className="panel person-detail" aria-busy={loading || undefined}>
      <div className={loading ? 'person-skeleton' : undefined} aria-hidden={loading || undefined}>
        <h1><span>{person?.name ?? 'Không tìm thấy hồ sơ'}</span></h1>
        {person && <p><strong><span>{person.role}</span></strong></p>}
        <p><span>{person?.description ?? 'Không có hồ sơ nào khớp với ID này.'}</span></p>
        {children}
      </div>
    </section>
  )
}
