import { Link } from 'react-router'
import PersonDetailLayout from './PersonDetailLayout'
import type { Person } from './people'

export default function PersonDetail({ person }: { person: Person | undefined }) {
  return (
    <PersonDetailLayout person={person}>
      <Link className="action" to="/">Về danh sách</Link>
    </PersonDetailLayout>
  )
}
