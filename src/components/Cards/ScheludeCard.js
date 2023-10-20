import { useTheme } from "@react-navigation/native";
import { PixelRatio, View } from "react-native";
import { Button, Text } from "react-native-paper";

export const ScheludeCard = ({ type, place, time, toggleSheet, setCurrentTicket }) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        borderRadius: 12,
        elevation: 3,
        backgroundColor: colors.surface,
        flex: 1,
        padding: 10,
        marginBottom: 10,
        gap: 5,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "column", gap: 5 }}>
          <Text variant="titleMedium" style={{ color: colors.onSurface }}>
            Соревнование
          </Text>
          <Text variant="bodyLarge" style={{ color: colors.onSurface }}>
            {type}
          </Text>
          <Text variant="bodyLarge" style={{ color: colors.onSurface }}>
            {place}
          </Text>
        </View>
        <Text
          variant="titleLarge"
          style={{
            color: colors.onSurface,
            height: "100%",
            textAlignVertical: "center",
          }}
        >
          {time}
        </Text>
      </View>

      <Button
        buttonColor={colors.primary}
        onPress={() => {
          toggleSheet();
          setCurrentTicket({
            time: time,
            place: place,
            title: type,
          });
        }}
        mode="elevated"
        style={{
          minHeight: PixelRatio.getPixelSizeForLayoutSize(14),
          fontWeight: 600,
          textAlignVertical: "center",
          borderRadius: 12,
          elevation: 4,
        }}
      >
        <Text
          variant="bodyLarge"
          style={{ color: colors.onPrimary, fontWeight: "bold" }}
        >
          Купить билет
        </Text>
      </Button>
    </View>
  );
};
