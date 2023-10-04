import { useLayoutEffect } from "react"
export const hideBanner = (navigation) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])
}
import { Dimensions } from "react-native"
export const windowWidth = Dimensions.get("window").width
export const windowHeight = Dimensions.get("window").height
