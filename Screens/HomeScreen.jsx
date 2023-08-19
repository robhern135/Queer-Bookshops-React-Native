import { StyleSheet, Text, View } from "react-native"
import React, { useLayoutEffect } from "react"
import HomeMap from "../Components/HomeMap"

const HomeScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <>
      <HomeMap />
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
