import { Route, Routes } from 'react-router'
import About from './About'
import Home from './Home'
import Layout from './Layout'
import NotFoundState from './NotFoundState'
import PeopleLayout from './PeopleLayout'
import PersonDetail from './PersonDetail'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="people" element={<PeopleLayout />}>
          <Route index element={<p>Chọn một người để xem chi tiết.</p>} />
          <Route path=":id" element={<PersonDetail />} />
        </Route>
        <Route path="*" element={<NotFoundState title="Không tìm thấy trang" />} />
      </Route>
    </Routes>
  )
}
