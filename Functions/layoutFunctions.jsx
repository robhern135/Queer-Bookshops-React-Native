import { useLayoutEffect } from "react"
export const hideBanner = (navigation) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])
}
