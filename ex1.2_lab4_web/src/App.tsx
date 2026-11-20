import { Route, Routes } from 'react-router'
import About from './About'
import Home from './Home'
import Layout from './Layout'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}
