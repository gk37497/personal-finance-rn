import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Alert, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { Button, Screen, Text, TextField } from "../components"
import { colors, spacing } from "../theme"
import { AuthStackScreenProps } from "../navigators/AuthStack"
import { navigate } from "../navigators"
import { useForm, Controller } from "react-hook-form"
import auth from "@react-native-firebase/auth"

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

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                placeholder="email"
                containerStyle={$mailField}
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
                containerStyle={$mailField}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                value={value}
              />
            )}
            name="password"
          />

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
  // backgroundColor: colors.errorBackground,
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
