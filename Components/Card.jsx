import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  Platform,
  View,
} from "react-native"
import React from "react"

const { width, height } = Dimensions.get("window")
const CARD_HEIGHT = 190
const CARD_WIDTH = width * 0.6

const Card = ({ shop, idx }) => {
  const handleBG = () => {
    let color = "#efafa2"
    if (idx == 0 || idx == 12) {
      color = "#efafa2"
    } else if (idx == 1 || idx == 13) {
      color = "#f7cfa6"
    } else if (idx == 2 || idx == 14) {
      color = "#f8ecaa"
    } else if (idx == 4 || idx == 15) {
      color = "#b4cdaa"
    } else if (idx == 5 || idx == 16) {
      color = "#b4bee6"
    } else if (idx == 6 || idx == 17) {
      color = "##d0aec4"
    } else if (idx == 7 || idx == 18) {
      color = "#b4ada0"
    } else if (idx == 8 || idx == 19) {
      color = "#cbb9a5"
    } else if (idx == 9 || idx == 20) {
      color = "#cfe5e0"
    } else if (idx == 10 || idx == 21) {
      color = "##f7d9d5"
    } else if (idx == 11 || idx == 22) {
      color = "##f8f0e5"
    }

    return color
  }

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
    <View style={[styles.card, { backgroundColor: handleBG() }]} key={idx}>
      <Image
        source={{ uri: image }}
        style={styles.cardImage}
        resizeMode={"cover"}
      />
      <View style={styles.textContent}>
        <Text style={styles.cardtitle} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.cardDescription}>{address}</Text>
        <Text style={styles.cardDescription} numberOfLines={1}>
          {website}
        </Text>
      </View>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  card: {
    elevation: 2,
    backgroundColor: "#FFF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
    marginRight: 10,
  },
  cardImage: {
    flex: 2,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
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
