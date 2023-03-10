import React from "react"
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"
import { TextStyle } from "react-native"
import { TextField } from "./TextField"
import { spacing } from "../theme"

type FieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  secure?: boolean
}

const Field = <TFieldValues extends Record<string, any>>({
  control,
  name,
  secure = false,
}: FieldProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextField
          placeholder={name}
          containerStyle={$field}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          secureTextEntry={secure}
        />
      )}
      name={name}
    />
  )
}

export default Field

const $field: TextStyle = {
  marginBottom: spacing.large,
  textAlign: "center",
}
