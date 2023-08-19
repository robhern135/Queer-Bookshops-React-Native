import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()

import SettingsScreen from "../Screens/SettingsScreen"
import { useLayoutEffect } from "react"

const SettingsStack = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  )
}

export default SettingsStack
