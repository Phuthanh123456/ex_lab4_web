import { Link } from 'react-router'
import { people } from './people'

export default function PeopleList() {
  return (
    <section className="panel">
      <h1>Danh sách hồ sơ</h1>
      <ul className="people-list">
        {people.map((person) => (
          <li key={person.id}>
            <h2>{person.name}</h2>
            <p>{person.role}</p>
            <Link className="action" to={`/people/${person.id}`} aria-label={`Xem hồ sơ của ${person.name}`}>
              Xem hồ sơ
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
