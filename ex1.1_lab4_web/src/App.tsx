import { Link, NavLink, Route, Routes } from 'react-router'
import PeopleList from './PeopleList'

import PersonDetailRoute from './PersonDetailRoute'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Bỏ qua điều hướng</a>
      <header className="site-header">
        <div className="container header-content">
          <span className="brand">Lab 4 · Exercise 1.1</span>
          <nav aria-label="Điều hướng chính">
            <NavLink to="/" end>Danh sách hồ sơ</NavLink>
          </nav>
        </div>
      </header>
      <main id="main-content" className="container" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<PeopleList />} />
          <Route path="/people/:id" element={<PersonDetailRoute />} />
          <Route path="*" element={
            <section className="panel">
              <h1>Không tìm thấy trang</h1>
              <Link className="action" to="/">Về danh sách</Link>
            </section>
          } />
        </Routes>
      </main>
    </>
  )
}
