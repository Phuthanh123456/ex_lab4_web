import { useParams } from 'react-router'
import NotFoundState from './NotFoundState'
import { people } from './people'

export default function PersonDetail() {
  const { id } = useParams()
  const person = people.find((entry) => entry.id === id)

  if (!person) {
    return <NotFoundState title="Không tìm thấy hồ sơ" heading="h2" />
  }

  return (
    <>
      <h2>Chi tiết hồ sơ</h2>
      <dl>
        <dt>Tên</dt>
        <dd>{person.name}</dd>
        <dt>Vai trò</dt>
        <dd>{person.role}</dd>
        <dt>ID hồ sơ</dt>
        <dd>{person.id}</dd>
      </dl>
    </>
  )
}
