import { Link } from 'react-router'

export default function NotFoundState({
  title,
  heading: Heading = 'h1',
}) {
  return (
    <>
      <Heading>{title}</Heading>
      <Link className="nav-link" to="/people">Về danh sách People</Link>
    </>
  )
}
