import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators/AppStack"
import { useStores } from "../models"

export const AddCategoryScreen: FC<StackScreenProps<AppStackScreenProps<"AddCategory">>> = observer(
  function AddCategoryScreen() {
    // Pull in one of our MST stores
    const a = useStores()
    console.log(a)
    return (
      <Screen style={$root} preset="scroll">
        <Text text="addCategory" />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
