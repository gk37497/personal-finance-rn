export interface Transaction {
  id: string
  title: string
  amount: number
  categoryId: string
  userId: string
  date: string
  type: "INCOME" | "OUTCOME"
}

export interface Category {
  id: string
  name: string
  userId: string
  createdDate: string
}

export type CreateCategory = {
  name: string
}

export type CreateTransaction = {
  title: Transaction["title"]
  amount: string
}
