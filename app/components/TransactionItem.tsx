import React from "react"
import { Alert, TextStyle, View, ViewStyle } from "react-native"
import { Transaction } from "../types"
import { Text } from "./Text"
import { Button } from "./Button"
import { colors, spacing } from "../theme"
import firestore from "@react-native-firebase/firestore"

export function TransactionItem({ item }: { item: Transaction }) {
  const { title, amount, date, type, id } = item

  const deleteDoc = async (id: string) => {
    await firestore()
      .collection("transaction")
      .doc(id)
      .delete()
      .then(() => console.log("deleted!"))
      .catch((e) => Alert.alert(JSON.stringify(e)))
  }

  return (
    <View style={[$listItem, type === "OUTCOME" && $outcome]}>
      <View>
        <Text preset="formLabel">{title}</Text>
        <Text preset="bold">
          {type === "INCOME" ? "+" : "-"}
          {amount} $
        </Text>
        <Text style={$date}>{date}</Text>
      </View>
      <Button preset="reversed" text="D" onPress={() => deleteDoc(id)} />
    </View>
  )
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
