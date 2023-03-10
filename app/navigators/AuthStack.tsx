import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { LoginScreen, SignupScreen } from "../screens"

export type AuthStackParamList = {
  Signup: undefined
  Login: undefined
}

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = StackScreenProps<
  AuthStackParamList,
  T
>
const Stack = createNativeStackNavigator<AuthStackParamList>()
export const AuthStack = observer(function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  )
})
