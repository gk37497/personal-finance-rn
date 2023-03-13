import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { TransactionModel } from "./Transaction"

/**
 * Model description here for TypeScript hints.
 */
export const TransactionStoreModel = types
  .model("TransactionStore")
  .props({
    transactions: types.optional(types.array(TransactionModel), []),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface TransactionStore extends Instance<typeof TransactionStoreModel> {}
export interface TransactionStoreSnapshotOut extends SnapshotOut<typeof TransactionStoreModel> {}
export interface TransactionStoreSnapshotIn extends SnapshotIn<typeof TransactionStoreModel> {}
export const createTransactionStoreDefaultModel = () => types.optional(TransactionStoreModel, {})
