import { Link } from 'react-router'

export default function NotFoundState({
  title,
  heading: Heading = 'h1',
}: {
  title: string
  heading?: 'h1' | 'h2'
}) {
  return (
    <>
      <Heading>{title}</Heading>
      <Link className="nav-link" to="/people">Về danh sách People</Link>
    </>
  )
}
