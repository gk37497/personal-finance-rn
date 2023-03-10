/* eslint-disable react-native/no-inline-styles */
import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, Alert, StyleSheet, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"

import { Button, Header, ListItem, Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators/AppStack"
import { useNavigation } from "@react-navigation/native"
import { CreateTransaction, Transaction } from "../types"
import { useForm } from "react-hook-form"
import Field from "../components/Field"
import { spacing } from "../theme"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"

export const AddTransactionScreen: FC<StackScreenProps<AppStackScreenProps<"AddTransaction">>> =
  observer(function AddTransactionScreen() {
    const navigation = useNavigation()
    const [showIncome, setShowIncome] = useState<boolean>(true)

    const [loading, setLoading] = useState<boolean>(false)

    const {
      control,
      handleSubmit,
      formState: { isValid },
    } = useForm<CreateTransaction>()

    const changeTab = (value: boolean) => setShowIncome(value)

    const user = auth().currentUser
    const onSubmit = async (formValeus: CreateTransaction) => {
      setLoading(true)
      const newTransaction: Partial<Transaction> = {
        title: formValeus.title,
        amount: parseInt(formValeus.amount),
        type: showIncome ? "INCOME" : "OUTCOME",
        date: new Date().toISOString(),
        userId: user.uid,
      }

      await firestore()
        .collection("transaction")
        .add(newTransaction)
        .then(() => navigation.goBack())
        .catch((e) => Alert.alert(JSON.stringify(e)))
        .finally(() => setLoading(false))
    }

    return (
      <>
        <Screen style={$root}>
          <Header
            title="Add Transaction"
            leftIcon="back"
            onLeftPress={() => navigation.goBack()}
            style={$header}
          />
          <View style={$formWrapper}>
            <Text text="Title" preset="formLabel" style={$field} />
            <Field<CreateTransaction> control={control} name="title" />
            <Text text="Type" preset="formLabel" style={$field} />
            <View style={$buttons}>
              <Button
                text="Income"
                style={$tab}
                preset={showIncome ? "reversed" : "filled"}
                onPress={() => changeTab(true)}
              />
              <View style={{ width: 10 }} />
              <Button
                text="Expense"
                preset={!showIncome ? "reversed" : "filled"}
                style={$tab}
                onPress={() => changeTab(false)}
              />
            </View>
            <Text text="Amount" preset="formLabel" style={$field} />
            <Field<CreateTransaction> control={control} name="amount" />
            <ListItem topSeparator height={10} />
            <Button
              text="Save"
              preset="reversed"
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
            />
          </View>
        </Screen>
        {loading && (
          <View style={[$loaderWrapper, StyleSheet.absoluteFill]}>
            <ActivityIndicator animating size="large" />
          </View>
        )}
      </>
    )
  })

const $root: ViewStyle = {
  flex: 1,
}

const $header: ViewStyle = {
  flexBasis: "10%",
}

const $formWrapper: ViewStyle = {
  paddingHorizontal: spacing.large,
}

const $buttons: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingBottom: spacing.large,
}

const $tab: ViewStyle = {
  flex: 1,
}

const $field: TextStyle = {
  marginBottom: spacing.small,
}

const $loaderWrapper: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}
