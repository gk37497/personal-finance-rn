import { TransactionStoreModel } from "./TransactionStore"

test("can be created", () => {
  const instance = TransactionStoreModel.create({})

  expect(instance).toBeTruthy()
})
