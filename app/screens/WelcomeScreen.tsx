/* eslint-disable react-native/no-inline-styles */
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { FlatList, ListRenderItem, TextStyle, View, ViewStyle } from "react-native"
import { Button, Header, Screen, Text } from "../components"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { AppStackScreenProps } from "../navigators/AppStack"
import { StackScreenProps } from "@react-navigation/stack"
import auth from "@react-native-firebase/auth"
import { useFirestore } from "../firebase/useFirestore"
import { Transaction } from "../types"
import { navigate } from "../navigators"
import firestore from "@react-native-firebase/firestore"

export const WelcomeScreen: FC<StackScreenProps<AppStackScreenProps<"Welcome">>> = observer(
  function WelcomeScreen() {
    const $containerInsets = useSafeAreaInsetsStyle(["bottom"])
    const [showIncome, setShowIncome] = useState<boolean>(true)

    const user = auth().currentUser

    const { data } = useFirestore<Transaction>("transaction")
    const logout = async () => await auth().signOut()
    const changeTab = () => setShowIncome((e) => !e)

    const deleteDoc = async (id: string) => {
      firestore()
        .collection("transaction")
        .doc(id)
        .delete()
        .then(() => {
          console.log("deleted!")
        })
    }

    const renderItem: ListRenderItem<Transaction> = ({
      item: { title, amount, date, type, id },
    }) => {
      if ((showIncome && type === "OUTCOME") || (!showIncome && type === "INCOME")) {
        return null
      }
      return (
        <View style={[$listItem, !showIncome && $outcome]}>
          <View>
            <Text preset="formLabel">{title}</Text>
            <Text preset="bold">
              {!showIncome ? "-" : "+"}
              {amount} $
            </Text>
            <Text style={$date}>{date}</Text>
          </View>
          <Button preset="reversed" text="D" onPress={() => deleteDoc(id)} />
        </View>
      )
    }

    const balance = (): number => {
      return data.reduce((temp, e) => temp + (e.type === "INCOME" ? e.amount : -e.amount), 0)
    }

    return (
      <Screen style={$root}>
        <Header title={user.email} rightIcon="logout" onRightPress={logout} style={$title} />
        <View style={[$bottomContainer, $containerInsets]}>
          <View style={$balanceWrapper}>
            <Text preset="heading">{data ? balance() : 0}</Text>
            <Text>total balance</Text>
          </View>

          <View style={$buttonswrapper}>
            <Button
              text="Income"
              style={$tab}
              preset={showIncome ? "reversed" : "default"}
              onPress={changeTab}
            />
            <View style={{ width: 10 }} />
            <Button
              text="Expense"
              preset={!showIncome ? "reversed" : "default"}
              style={$tab}
              onPress={changeTab}
            />
          </View>
          <FlatList contentContainerStyle={$flatlist} data={data} renderItem={renderItem} />
          <Button
            style={$addButton}
            preset="reversed"
            text="+"
            onPress={() => navigate("AddTransaction")}
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
const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexBasis: "100%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.large,
}

const $title: TextStyle = {
  height: 60,
}

const $addButton: ViewStyle = {
  position: "absolute",
  bottom: 150,
  right: 20,
  height: 50,
  width: 55,
  borderRadius: 50,
}

const $balanceWrapper: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  borderTopWidth: 1,
  borderBottomWidth: 1,
  paddingVertical: spacing.large,
  marginVertical: spacing.medium,
}

const $buttonswrapper: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  borderBottomWidth: 1,
  paddingBottom: spacing.large,
}

const $tab: ViewStyle = {
  flex: 1,
}

const $flatlist: ViewStyle = {
  paddingTop: spacing.medium,
}

const $listItem: ViewStyle = {
  backgroundColor: colors.palette.secondary100,
  padding: spacing.medium,
  borderRadius: spacing.tiny,
  marginBottom: spacing.medium,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $outcome: ViewStyle = {
  backgroundColor: colors.palette.primary100,
}

const $date: TextStyle = {
  fontSize: 12,
}
