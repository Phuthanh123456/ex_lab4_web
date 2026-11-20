export type Person = {
  id: string
  name: string
  role: string
  description: string
}

export const people: readonly Person[] = [
  {
    id: 'minh-anh',
    name: 'Nguyễn Minh Anh',
    role: 'Thiết kế giao diện',
    description: 'Minh Anh thiết kế giao diện và kiểm tra khả năng sử dụng trên thiết bị di động.',
  },
  {
    id: 'quoc-huy',
    name: 'Trần Quốc Huy',
    role: 'Lập trình frontend',
    description: 'Quốc Huy xây dựng các thành phần React và tích hợp điều hướng cho ứng dụng.',
  },
  {
    id: 'thao-ly',
    name: 'Lê Thảo Ly',
    role: 'Kiểm thử phần mềm',
    description: 'Thảo Ly kiểm tra các luồng thao tác, ghi nhận lỗi và xác minh bản sửa.',
  },
]
