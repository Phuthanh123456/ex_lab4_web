import { NavLink, Outlet } from 'react-router'
import './layout.css'

function navLinkClassName({ isActive }: { isActive: boolean }) {
  return isActive ? 'nav-link nav-link-active' : 'nav-link'
}

export default function Layout() {
  return (
    <>
      <header>
        <strong>Lab 4 · Exercise 1.2</strong>
        <nav aria-label="Điều hướng chính">
          <ul>
            <li><NavLink to="/" end className={navLinkClassName}>Trang chủ</NavLink></li>
            <li><NavLink to="/about" className={navLinkClassName}>Giới thiệu</NavLink></li>
            <li><NavLink to="/people" className={navLinkClassName}>People</NavLink></li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
