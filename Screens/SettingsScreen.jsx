import { StyleSheet, Text, View } from "react-native"
import { useLayoutEffect } from "react"

const SettingsScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])
  return (
    <View>
      <Text>SettingsScreen</Text>
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({})
