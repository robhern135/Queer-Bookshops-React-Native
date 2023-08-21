import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useEffect, useRef, useState } from "react"

import { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import MapView from "react-native-map-clustering"
import axios from "axios"
import { ENV_GOOGLE_MAPS_API } from "@env"
import { categories } from "../Data/Categories"
import Card from "./Card"

const { width, height } = Dimensions.get("window")
const CARD_WIDTH = width * 0.6
const SPACING_FOR_CARD_INSET = width * 0.1 - 10

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
      axios.get(API_URL).then((res) => {
        let data = res.data
        let sortedList = data.sort((a, b) =>
          a.title.rendered.localeCompare(b.title.rendered)
        )
        setBookshops(sortedList)
      })
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

  let mapAnimation = new Animated.Value(0)
  let mapIndex = 0

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      if (bookshops) {
        let index = Math.floor(value / CARD_WIDTH + 0.3) // animate 30% away from landing on the next item
        if (index >= bookshops.length) {
          index = bookshops.length - 1
        }
        if (index <= 0) {
          index = 0
        }

        clearTimeout(regionTimeout)

        const regionTimeout = setTimeout(() => {
          if (mapIndex !== index) {
            mapIndex = index
            let current_latitude = bookshops[index].acf.position.latitude
            let current_longitude = bookshops[index].acf.position.longitude

            mapRef.current.animateToRegion(
              {
                latitude: current_latitude,
                longitude: current_longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              },
              350
            )
          }
        }, 10)
      }
    })
  })

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key

    let x = markerID * CARD_WIDTH + markerID * 20
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET
    }
    scrollViewRef.current.scrollTo({ x: x, y: 0, animated: true })
  }

  const mapRef = useRef()
  const scrollViewRef = useRef()

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        {bookshops?.map((shop, idx) => {
          const {
            acf: {
              country,
              address,
              position: { latitude, longitude },
              website,
            },
          } = shop
          const title = shop.title.rendered
          const image = shop._embedded["wp:featuredmedia"]["0"].source_url

          return (
            <Marker
              onPress={(e) => onMarkerPress(e)}
              key={idx}
              coordinate={{ latitude: latitude, longitude: longitude }}
              title={title}
              description={address}
              image={require("../assets/marker.png")}
            />
          )
        })}
      </MapView>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
      >
        {categories?.map((cat, idx) => {
          const { name } = cat
          return (
            <TouchableOpacity
              key={name}
              style={[
                styles.chipsItem,
                { marginRight: categories.length - 1 == idx ? 20 : 0 },
              ]}
            >
              <Text>{name}</Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
      {/* cards */}
      <Animated.ScrollView
        ref={this.scrollViewRef}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={{
          paddingRight: CARD_WIDTH / 2,
        }}
        snapToAlignment="center"
        snapToInterval={CARD_WIDTH + 10}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {bookshops?.map((shop, idx) => {
          return <Card shop={shop} key={idx} idx={idx} />
        })}
      </Animated.ScrollView>
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
  chipsScrollView: {
    position: "absolute",
    top: Platform.OS === "ios" ? 30 : 40,
    paddingHorizontal: 10,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 70 : 70,
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
})
