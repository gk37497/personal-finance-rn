import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { User, UserModel } from "./User"
import { LoginValues } from "../screens"
import auth from "@react-native-firebase/auth"
import { Alert } from "react-native"
/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({ user: types.optional(UserModel, { uid: "", email: "" } as User) })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async login(formValues: LoginValues) {
      await auth()
        .signInWithEmailAndPassword(formValues.email, formValues.password)
        .then((res) => {
          const user = {
            uid: res.user.uid,
            email: res.user.email,
          }
          self.setProp("user", user)
        })
        .catch((error) => {
          Alert.alert(JSON.stringify(error))
        })
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshotOut extends SnapshotOut<typeof UserStoreModel> {}
export interface UserStoreSnapshotIn extends SnapshotIn<typeof UserStoreModel> {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
