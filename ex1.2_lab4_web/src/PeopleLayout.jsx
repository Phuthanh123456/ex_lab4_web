import { Link, Outlet } from 'react-router'
import { people } from './people'
import './people.css'

export default function PeopleLayout() {
  return (
    <>
      <h1>People</h1>
      <div className="people-grid">
        <section aria-labelledby="people-list-heading">
          <h2 id="people-list-heading">Danh sách hồ sơ</h2>
          <ul role="list">
            {people.map((person) => (
              <li key={person.id}>
                <Link className="nav-link" to={person.id}>{person.name}</Link>
                <span>{person.role}</span>
              </li>
            ))}
          </ul>
        </section>
        <section aria-label="Chi tiết hồ sơ">
          <Outlet />
        </section>
      </div>
    </>
  )
}
