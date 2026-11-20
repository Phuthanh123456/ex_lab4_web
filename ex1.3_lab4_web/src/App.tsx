import { Profiler, useState } from 'react'
import SimpleForm from './SimpleForm'
import { traceLegacyCommit } from './legacyTrace'
import RefactoredForm from './refactored/SimpleForm'

export default function App() {
  const [mode, setMode] = useState<'legacy' | 'refactored'>('legacy')
  const form = mode === 'legacy' ? <SimpleForm /> : <RefactoredForm />

  return (
    <>
      <a className="skip-link" href="#main-content">Đến nội dung chính</a>
      <main id="main-content" className="container" tabIndex={-1}>
        <h1>Legacy Validation Anti-Patterns</h1>
        <p className="intro">Thử cùng dữ liệu trên hai form để so sánh cách React xử lý validation.</p>
        <div className="form-switch" role="group" aria-label="Phiên bản form">
          <button type="button" aria-pressed={mode === 'legacy'} onClick={() => setMode('legacy')}>Legacy</button>
          <button type="button" aria-pressed={mode === 'refactored'} onClick={() => setMode('refactored')}>Refactored</button>
        </div>
        {import.meta.env.DEV ? (
          <Profiler id={mode === 'legacy' ? 'SimpleForm' : 'RefactoredForm'} onRender={traceLegacyCommit}>
            {form}
          </Profiler>
        ) : form}
        <section className="comparison" aria-labelledby="comparison-heading">
          <h2 id="comparison-heading">So sánh khi gõ một ký tự</h2>
          <p>Nhập A vào ô Tên trống sau khi form mount ổn định. Đo bằng React 19.3.1 development, StrictMode và jsdom.</p>
          <table>
            <thead>
              <tr>
                <th scope="col">Phiên bản</th>
                <th scope="col">Commit</th>
                <th scope="col">Cách xử lý</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Legacy</th>
                <td>4</td>
                <td>Đồng bộ giá trị, validate rồi tính validity qua các effect.</td>
              </tr>
              <tr>
                <th scope="row">Refactored</th>
                <td>1</td>
                <td>Tính lỗi và validity từ giá trị form. Focus và cuộn khi submit sai.</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </>
  )
}
