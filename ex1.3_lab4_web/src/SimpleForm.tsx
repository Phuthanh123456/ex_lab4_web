import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import InputField from './InputField'
import { traceLegacy } from './legacyTrace'
import { initialValues, validate, type Field } from './validation'

export default function SimpleForm() {
  traceLegacy('render', 'SimpleForm')
  const [values, setValues] = useState(initialValues)
  const [validation, setValidation] = useState(() => ({ values: initialValues, errors: validate(initialValues) }))
  const [validity, setValidity] = useState(() => ({ validation, isValid: false }))
  const [submitCount, setSubmitCount] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [scrollTarget, setScrollTarget] = useState<{ field: Field; attempt: number } | null>(null)
  const handledSubmit = useRef(0)

  // 2. Validate fields after the parent receives the values.
  useEffect(() => {
    traceLegacy('effect', '2. Validate fields')
    setValidation({ values, errors: validate(values) })
  }, [values])

  // 3. Derive form validity in a separate render pass.
  useEffect(() => {
    traceLegacy('effect', '3. Calculate form validity')
    setValidity({ validation, isValid: !validation.errors.name && !validation.errors.email })
  }, [validation])

  useEffect(() => {
    traceLegacy('effect', 'Handle submit if pending')
    if (submitCount === handledSubmit.current || validity.validation.values !== values) return

    handledSubmit.current = submitCount
    if (validity.isValid) {
      setScrollTarget(null)
      setFeedback('Dữ liệu hợp lệ.')
      return
    }

    setFeedback('')
    setScrollTarget({ field: validity.validation.errors.name ? 'name' : 'email', attempt: submitCount })
  }, [submitCount, validity, values])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const submittedValues = { name: String(data.get('name') ?? ''), email: String(data.get('email') ?? '') }
    setValues((current) => (
      current.name === submittedValues.name && current.email === submittedValues.email ? current : submittedValues
    ))
    setSubmitCount((count) => count + 1)
  }

  return (
    <form className="validation-form" onSubmit={handleSubmit} noValidate>
      <h2>Legacy</h2>
      <InputField
        name="name"
        label="Tên"
        type="text"
        error={submitCount ? validation.errors.name : ''}
        scrollAttempt={scrollTarget?.field === 'name' ? scrollTarget.attempt : 0}
        setValues={setValues}
        clearFeedback={setFeedback}
      />
      <InputField
        name="email"
        label="Email"
        type="email"
        error={submitCount ? validation.errors.email : ''}
        scrollAttempt={scrollTarget?.field === 'email' ? scrollTarget.attempt : 0}
        setValues={setValues}
        clearFeedback={setFeedback}
      />
      <button type="submit">Gửi</button>
      <p role="status">{feedback}</p>
    </form>
  )
}
