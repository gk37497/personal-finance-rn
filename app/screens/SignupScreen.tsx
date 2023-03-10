import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Alert, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { Button, Screen, Text } from "../components"
import { colors, spacing } from "../theme"
import { AuthStackScreenProps } from "../navigators/AuthStack"
import { navigate } from "../navigators"
import { useForm } from "react-hook-form"
import auth from "@react-native-firebase/auth"
import Field from "../components/Field"

type SignupValues = {
  email: string
  password: string
}

export const SignupScreen: FC<StackScreenProps<AuthStackScreenProps<"Signup">>> = observer(
  function SignupScreen() {
    const { control, handleSubmit } = useForm<SignupValues>({
      defaultValues: { email: "", password: "" },
    })

    const onSubmit = async (formValues: SignupValues) => {
      await auth()
        .createUserWithEmailAndPassword(formValues.email, formValues.password)
        .catch((e) => Alert.alert(JSON.stringify(e.message)))
    }

    return (
      <Screen style={$root} contentContainerStyle={$container} preset="scroll">
        <View style={$formWrapper}>
          <Text text="Sign up" preset="heading" style={$mailField} />
          <Field<SignupValues> control={control} name="email" />
          <Field<SignupValues> control={control} name="password" secure />
          <Button text="Signup" preset="reversed" onPress={handleSubmit(onSubmit)} />
          <Button
            text="Login"
            preset="default"
            style={$loginBtn}
            onPress={() => navigate("Login")}
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

const $mailField: TextStyle = {
  marginBottom: spacing.large,
  textAlign: "center",
}

const $loginBtn: ViewStyle = {
  marginTop: spacing.medium,
}
