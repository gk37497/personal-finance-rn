import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { useColorScheme } from "react-native"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { AppStack } from "./AppStack"
import { AuthStack } from "./AuthStack"

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

const exitRoutes = Config.exitRoutes

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()
  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  const [initializing, setInitializing] = useState<boolean>(true)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User) {
    setUser(user)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
})
