import { Profiler } from 'react'
import SimpleForm from './SimpleForm'
import { traceLegacyCommit } from './legacyTrace'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Đến nội dung chính</a>
      <main id="main-content" className="container" tabIndex={-1}>
        <h1>Legacy Validation Anti-Patterns</h1>
        {import.meta.env.DEV ? (
          <Profiler id="SimpleForm" onRender={traceLegacyCommit}>
            <SimpleForm />
          </Profiler>
        ) : <SimpleForm />}
      </main>
    </>
  )
}
