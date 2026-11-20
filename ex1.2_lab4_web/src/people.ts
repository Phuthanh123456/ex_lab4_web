export type Person = {
  id: string
  name: string
  role: string
}

export const people: readonly Person[] = [
  { id: 'minh-anh', name: 'Nguyễn Minh Anh', role: 'Thiết kế giao diện' },
  { id: 'quoc-huy', name: 'Trần Quốc Huy', role: 'Lập trình frontend' },
  { id: 'thao-ly', name: 'Lê Thảo Ly', role: 'Kiểm thử phần mềm' },
]
