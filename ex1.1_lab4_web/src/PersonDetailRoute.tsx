import { lazy, Suspense, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import PersonDetailLayout from './PersonDetailLayout'
import { people, type Person } from './people'

const PersonDetail = lazy(() => import('./PersonDetail'))

function PersonDetailSkeleton({
  person,
  setLoading,
}: {
  person: Person | undefined
  setLoading: (loading: boolean) => void
}) {
  useEffect(() => {
    setLoading(true)
    return () => setLoading(false)
  }, [setLoading])

  return (
    <PersonDetailLayout person={person} loading>
      <span className="action">Về danh sách</span>
    </PersonDetailLayout>
  )
}

export default function PersonDetailRoute() {
  const { id } = useParams<'id'>()
  const person = people.find((entry) => entry.id === id)
  const [loading, setLoading] = useState(false)

  return (
    <>
      <div className="visually-hidden" aria-live="polite" lang="en">
        {loading ? 'Loading person details…' : ''}
      </div>
      <Suspense fallback={<PersonDetailSkeleton person={person} setLoading={setLoading} />}>
        <PersonDetail person={person} />
      </Suspense>
    </>
  )
}
