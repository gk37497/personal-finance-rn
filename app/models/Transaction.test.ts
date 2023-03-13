import { TransactionModel } from "./Transaction"

test("can be created", () => {
  const instance = TransactionModel.create({})

  expect(instance).toBeTruthy()
})
