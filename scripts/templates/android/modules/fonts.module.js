import { PixelRatio, Dimensions, Platform } from "react-native";
const { width } = Dimensions.get("window");

export const fonts = {
  size: {
    extraThin: 10,
    thin: 12,
    extraSmall: 14,
    small: 16,
    medium: 18,
    large: 20,
    extraLarge: 22 
  },
  family: {
    AVERTA_SEMI_BOLD: "AvertaSemibold",
    AVERTA_BOLD: "AvertaBold",
    AVERTA_EXTRA_BOLD: "AvertaExtraBold",
    AVERTA_THIN: "AvertaThin",
    AVERTA_LIGHT: "AvertaLight"
  }
}

const scale = width / 320;
export const normalize = fontSize => {

  const newFontSize = scale * fontSize;

  if(Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newFontSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newFontSize)) - 2;
  }
}