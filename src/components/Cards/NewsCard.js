import { useTheme } from "@react-navigation/native";
import { Image, PixelRatio, StyleSheet, View } from "react-native";
import { Card, Text, TouchableRipple } from "react-native-paper";

export function NewsCard({ title, content, uri, hash }) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: 12,
        minHeight: PixelRatio.getPixelSizeForLayoutSize(80),
        padding: 12,
        flexDirection: "vertical",
        flex: 1,
        elevation: 3,
      }}
    >
      <Image
        style={{ flex: 1, minHeight: 100, width: "100%", borderRadius: 15 }}
        source={{
          uri: uri,
        }}
      />
      <View
        style={{
          flex: 1,
          minHeight: PixelRatio.getPixelSizeForLayoutSize(4),
        }}
      ></View>
      <Text
        variant="titleMedium"
        style={{
          flex: 1,
          color: colors.onSurface,
          fontWeight: "medium",
        }}
      >
        {title}
      </Text>
      <Text
        variant="bodyMedium"
        style={{
          flex: 1,
          color: colors.onSurface,
          fontWeight: "regular",
        }}
      >
        {content}
      </Text>
    </View>
  );
}
