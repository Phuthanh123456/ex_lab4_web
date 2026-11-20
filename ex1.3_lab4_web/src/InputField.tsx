import { useEffect, useId, useRef, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { traceLegacy } from './legacyTrace'

type Field = 'name' | 'email'

export default function InputField({
  name,
  label,
  type,
  error,
  scrollAttempt,
  setValues,
  clearFeedback,
}: {
  name: Field
  label: string
  type: 'text' | 'email'
  error: string
  scrollAttempt: number
  setValues: Dispatch<SetStateAction<Record<Field, string>>>
  clearFeedback: (value: string) => void
}) {
  traceLegacy('render', `InputField(${name})`)
  const id = useId()
  const input = useRef<HTMLInputElement>(null)
  const lastScrolled = useRef(0)
  const [value, setValue] = useState('')
  const [visibleError, setVisibleError] = useState('')

  // 1. Synchronize the field value to the parent.
  useEffect(() => {
    traceLegacy('effect', `1. Sync value up (${name})`)
    setValues((current) => current[name] === value ? current : { ...current, [name]: value })
  }, [name, setValues, value])

  // 4. Mirror the parent's error into field state.
  useEffect(() => {
    traceLegacy('effect', `4. Mirror error down (${name})`)
    setVisibleError(error)
  }, [error])

  // 5. Scroll only once per failed submit, after the error is visible.
  useEffect(() => {
    traceLegacy('effect', `5. Check submit scroll (${name})`)
    if (!scrollAttempt || scrollAttempt === lastScrolled.current || !visibleError || visibleError !== error) return

    lastScrolled.current = scrollAttempt
    traceLegacy('effect', `5. Scroll to error (${name})`)
    input.current?.focus({ preventScroll: true })
    input.current?.scrollIntoView({ block: 'nearest' })
  }, [error, name, scrollAttempt, visibleError])

  return (
    <div className="legacy-field">
      <label htmlFor={id}>{label}</label>
      <input
        ref={input}
        id={id}
        name={name}
        type={type}
        autoComplete={name}
        required
        value={value}
        aria-invalid={visibleError ? true : undefined}
        aria-describedby={visibleError ? `${id}-error` : undefined}
        onChange={(event) => {
          setValue(event.currentTarget.value)
          clearFeedback('')
        }}
      />
      {visibleError && <p className="field-error" id={`${id}-error`}>{visibleError}</p>}
    </div>
  )
}
