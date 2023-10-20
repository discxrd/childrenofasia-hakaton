import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { PixelRatio } from "react-native";

const Card = ({ title, number }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
        backgroundColor: colors.surface,
        padding: 10,
        margin: 10,
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
      }}
    >
      <Text style={{ color: colors.onBackground }}>{title}.</Text>
      <View style={{ minHeight: PixelRatio.getPixelSizeForLayoutSize(3)}}></View>
      <Text style={{ color: colors.onBackground }}>{number}</Text>
    </View>
  );
};

export function Timer({seconds, minutes, hours, days}) {
  return (
    <View style={{ flexDirection: "row", spaceBetween: 10 }}>
      <Card title={"Д"} number={days} />
      <Card title={"Ч"} number={hours} />
      <Card title={"Мин"} number={minutes} />
      <Card title={"Сек"} number={seconds} />
    </View>
  );
}
