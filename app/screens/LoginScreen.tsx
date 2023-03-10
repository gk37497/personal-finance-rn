import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Alert, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { Button, Screen, Text, TextField } from "../components"
import { colors, spacing } from "../theme"
import { AuthStackScreenProps } from "../navigators/AuthStack"
import auth from "@react-native-firebase/auth"
import { navigate } from "../navigators"
import { Controller, useForm } from "react-hook-form"

type LoginValues = {
  email: string
  password: string
}

const welcomeLogo = require("../../assets/images/logo.png")

export const LoginScreen: FC<StackScreenProps<AuthStackScreenProps<"Signup">>> = observer(
  function SignupScreen() {
    const { control, handleSubmit } = useForm<LoginValues>({
      defaultValues: { email: "", password: "" },
    })

    const login = async (formValues: LoginValues) => {
      await auth()
        .signInWithEmailAndPassword(formValues.email, formValues.password)
        .then(() => {
          console.log("User signed in!")
        })
        .catch((error) => {
          Alert.alert(JSON.stringify(error))
        })
    }

    return (
      <Screen style={$root} contentContainerStyle={$container} preset="scroll">
        <View style={$formWrapper}>
          <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
          <Text text="Login" preset="heading" style={$field} />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                placeholder="email"
                containerStyle={$field}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                placeholder="password"
                containerStyle={$field}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                value={value}
              />
            )}
            name="password"
          />
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
  // backgroundColor: colors.errorBackground,
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

const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.huge,
}
