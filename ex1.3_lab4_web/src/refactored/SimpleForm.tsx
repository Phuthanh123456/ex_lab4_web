import { useState } from 'react'
import type { FormEvent } from 'react'
import { flushSync } from 'react-dom'
import { initialValues, validate, type Field } from '../validation'
import InputField from './InputField'

const fields = [
  { name: 'name', label: 'Tên', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
] as const

export default function SimpleForm() {
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({ name: false, email: false })
  const [submitted, setSubmitted] = useState(false)
  const [feedback, setFeedback] = useState('')
  const errors = validate(values)
  const firstInvalid = fields.find(({ name }) => errors[name])
  const isValid = !firstInvalid

  function change(field: Field, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setFeedback('')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isValid) {
      setSubmitted(true)
      setFeedback('Dữ liệu hợp lệ.')
      return
    }

    const input = event.currentTarget.elements.namedItem(firstInvalid.name)
    // Make the error description available before moving focus to its input.
    flushSync(() => {
      setSubmitted(true)
      setFeedback('')
    })
    if (input instanceof HTMLInputElement) {
      input.focus({ preventScroll: true })
      input.scrollIntoView({ block: 'nearest' })
    }
  }

  return (
    <form className="validation-form" onSubmit={handleSubmit} noValidate>
      <h2>Refactored</h2>
      {fields.map((field) => (
        <InputField
          key={field.name}
          {...field}
          value={values[field.name]}
          onChange={(value) => change(field.name, value)}
          onBlur={() => setTouched((current) => ({ ...current, [field.name]: true }))}
          error={submitted || touched[field.name] ? errors[field.name] : ''}
        />
      ))}
      <button type="submit">Gửi</button>
      <p role="status">{feedback}</p>
    </form>
  )
}
