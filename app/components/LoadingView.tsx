import React, { FC } from "react"
import { ActivityIndicator, StyleSheet, View, ViewStyle } from "react-native"

export const LoadingView: FC<{ loading: boolean }> = ({ loading = false }) => {
  return loading ? (
    <View style={[$loaderWrapper, StyleSheet.absoluteFill]}>
      <ActivityIndicator animating size="large" />
    </View>
  ) : null
}

const $loaderWrapper: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}
