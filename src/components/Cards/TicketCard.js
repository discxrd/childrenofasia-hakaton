import { useTheme } from "@react-navigation/native";
import { Image, PixelRatio, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export const TicketCard = (props) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        elevation: 3,
        borderRadius: 16,
        gap: 3,
      }}
    >
      <Image
        style={{
          flex: 1,
          width: "100%",
          height: PixelRatio.getPixelSizeForLayoutSize(50),
          resizeMode: "stretch",
          backgroundColor: "white",
          borderRadius: 14,
        }}
        source={require("../../assets/images/barcode.png")}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10}}>
        <View style={{ flexDirection: "column", justifyContent: "center" }}>
          <Text variant="titleMedium" style={{ color: colors.onSurface }}>
            Соревнование
          </Text>
          <Text variant="titleMedium" style={{ color: colors.onSurface }}>
            {props.title}
          </Text>
          <Text variant="titleLarge" style={{ color: colors.onSurface }}>
            {props.place}
          </Text>
        </View>
        <Text
          variant="headlineLarge"
          style={{
            color: colors.onSurface,
            height: "100%",
            textAlignVertical: "center",
          }}
        >
          {props.time}
        </Text>
      </View>
    </View>
  );
};
