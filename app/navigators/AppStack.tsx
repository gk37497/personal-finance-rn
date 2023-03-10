import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { AddCategoryScreen, AddTransactionScreen, WelcomeScreen } from "../screens"

export type AppStackParamList = {
  Welcome: undefined
  AddCategory: undefined
  AddTransaction: undefined
}

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>
const Stack = createNativeStackNavigator<AppStackParamList>()
export const AppStack = observer(function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="AddCategory" component={AddCategoryScreen} />
      <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
    </Stack.Navigator>
  )
})
