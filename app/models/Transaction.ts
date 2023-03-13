import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const TransactionModel = types
  .model("Transaction")
  .props({
    id: types.string,
    title: types.string,
    amount: types.number,
    categoryId: types.string,
    userId: types.string,
    date: types.string,
    type: types.enumeration(["INCOME", "OUTCOME"]),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Transaction extends Instance<typeof TransactionModel> {}
export interface TransactionSnapshotOut extends SnapshotOut<typeof TransactionModel> {}
export interface TransactionSnapshotIn extends SnapshotIn<typeof TransactionModel> {}
export const createTransactionDefaultModel = () => types.optional(TransactionModel, {})
