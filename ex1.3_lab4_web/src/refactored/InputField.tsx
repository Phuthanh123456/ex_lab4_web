import { useId } from 'react'
import type { Field } from '../validation'

export default function InputField({
  name, label, type, value, onChange, onBlur, error,
}: {
  name: Field
  label: string
  type: 'text' | 'email'
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  error: string
}) {
  const id = useId()

  return (
    <div className="validation-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={name}
        required
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && <p className="field-error" id={`${id}-error`}>{error}</p>}
    </div>
  )
}
