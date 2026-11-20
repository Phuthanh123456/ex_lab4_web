export type Field = 'name' | 'email'
export type Values = Record<Field, string>

export const initialValues: Values = { name: '', email: '' }

export function validate(values: Values): Values {
  const email = values.email.trim()
  return {
    name: values.name.trim() ? '' : 'Nhập tên.',
    email: !email ? 'Nhập email.' : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Email không đúng định dạng.',
  }
}
