import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { Button, Screen, Text } from "../components"
import { colors, spacing } from "../theme"
import { AuthStackScreenProps } from "../navigators/AuthStack"
import { navigate } from "../navigators"
import { useForm } from "react-hook-form"
import Field from "../components/Field"
import { useStores } from "../models"

export type LoginValues = {
  email: string
  password: string
}

export const LoginScreen: FC<StackScreenProps<AuthStackScreenProps<"Signup">>> = observer(
  function SignupScreen() {
    const { userStore } = useStores()

    const { control, handleSubmit } = useForm<LoginValues>({
      defaultValues: { email: "", password: "" },
    })

    const login = async (formValues: LoginValues) => {
      await userStore.login(formValues)
      console.log("USER", userStore.user)
      // await auth()
      //   .signInWithEmailAndPassword(formValues.email, formValues.password)
      //   .then(() => {
      //     console.log("User logged in!")
      //   })
      //   .catch((error) => {
      //     Alert.alert(JSON.stringify(error))
      //   })
    }

    return (
      <Screen style={$root} contentContainerStyle={$container} preset="scroll">
        <View style={$formWrapper}>
          <Text text="Login" preset="heading" style={$field} />
          <Field<LoginValues> control={control} name="email" />
          <Field<LoginValues> control={control} name="password" secure />
          <Button text="Login" preset="reversed" onPress={handleSubmit(login)} />
          <Button
            text="Register"
            preset="default"
            onPress={() => navigate("Signup")}
            style={$registerButton}
          />
        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $container: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "100%",
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: spacing.large,
}

const $formWrapper: ViewStyle = {
  flexShrink: 1,
  paddingHorizontal: spacing.huge,
  width: "100%",
}

const $field: TextStyle = {
  marginBottom: spacing.large,
  textAlign: "center",
}

const $registerButton: ViewStyle = {
  marginTop: spacing.medium,
}
