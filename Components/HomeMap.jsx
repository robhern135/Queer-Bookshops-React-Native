import { Image, StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react"

import { Callout, Marker } from "react-native-maps"
import MapView from "react-native-map-clustering"

import axios from "axios"

import { ENV_GOOGLE_MAPS_API } from "@env"

const HomeMap = () => {
  //** STATE */
  const [API_KEY, setAPI_KEY] = useState(ENV_GOOGLE_MAPS_API)
  const [bookshops, setBookshops] = useState()
  const [region, setRegion] = useState({
    latitude: 53.94519,
    longitude: -2.52069,
    latitudeDelta: 7.5,
    longitudeDelta: 7.5,
  })

  //** VARS */
  const API_URL =
    "https://findrob.co.uk/queer-bookshops/wp/wp-json/wp/v2/bookshops?per_page=100&_embed"

  const getBookshops = () => {
    try {
      axios.get(API_URL).then((res) => setBookshops(res.data))
    } catch (err) {
      console.log(`error fetching books: ${err.message}`)
    }
  }

  useEffect(() => {
    if (bookshops == undefined) {
      getBookshops()
    }
    setTimeout(() => {
      console.log(bookshops)
    }, 500)
  }, [])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        {bookshops?.map((shop, idx) => {
          const {
            acf: {
              address,
              position: { latitude, longitude },
              website,
            },
          } = shop
          const title = shop.title.rendered
          const image = shop._embedded["wp:featuredmedia"]["0"].source_url
          return (
            <Marker
              key={idx}
              coordinate={{ latitude: latitude, longitude: longitude }}
              title={title}
              description={address}
              image={require("../assets/marker.png")}
            />
          )
        })}
      </MapView>
    </View>
  )
}

export default HomeMap

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
})
