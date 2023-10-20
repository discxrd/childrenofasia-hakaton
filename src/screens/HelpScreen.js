import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Dimensions,
  Image,
  Button,
  Linking,
  PixelRatio,
} from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";

export const HelpScreen = () => {
  const { colors } = useTheme();
  const width = Dimensions.get("window").width;
  const partners = [
    {
      name: "Международный комитет <Дети Азии>",
      image: "https://www.cagic.org/images/logo.jpg",
      uri: "https://www.cagic.org/",
    },
    {
      name: "Министерство по физической культуре и спорту Республики Саха (Якутия)",
      image:
        "https://yakutsk2024.org/uploads/partners/6b71564f205ea9155d102200500fee13_1686934924.png",
      uri: "https://minsport.sakha.gov.ru/",
    },
    {
      name: "Министерство спорта России",
      image:
        "https://yakutsk2024.org/uploads/partners/d6f39fccbecb62bf4576d094ffff3b2d_1686934965.png",
      uri: "https://www.minsport.gov.ru/",
    },
    {
      name: "Группа компаний <ДатаКарат>",
      image:
        "https://yakutsk2024.org/uploads/partners/15f1edf4a710335a9af346871d8a44b0_1687701900.png",
      uri: "https://www.datakrat.ru/",
    },
    {
      name: "Республика Саха (Якутия)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Coat_of_Arms_of_Sakha_%28Yakutia%29.svg/225px-Coat_of_Arms_of_Sakha_%28Yakutia%29.svg.png",
      uri: "https://agip.sakha.gov.ru/",
    },
  ];
  const images = {
    vk: require("../assets/images/social/vk.png"),
    telegram: require("../assets/images/social/telegram.png"),
    instagram: require("../assets/images/social/instagram.webp"),
  };
  const socialApps = [
    {
      image: images.vk,
      uri: "https://t.me/childrenofasia",
    },
    {
      image: images.telegram,
      uri: "https://vk.com/gamesasia",
    },
    {
      image: images.instagram,
      uri: "https://instagram.com/_u/@childrenofasia",
    },
  ];
  const documents = [
    {
      name: 'Положение VIII МСИ "Дети Азии" Якутск 2024',
      uri: "https://yakutsk2024.org/documents/pologenie-viii-msi-deti-azii-yakutsk-2024",
    },
    {
      name: "Документы комитета",
      uri: "https://yakutsk2024.org/documents/dokumenti-komiteta",
    },
  ];

  return (
    <SafeAreaView>
      <View style={{ padding: 16, paddingTop: 10, gap: 10 }}>
        <Text variant="headlineLarge" style={{ color: colors.onBackground }}>
          Документы
        </Text>
        <View style={{ gap: 12 }}>
          {documents.map((doc, index) => (
            <TouchableRipple
              key={index}
              rippleColor={"rgba(0, 0, 0, 0.5)"}
              style={{
                backgroundColor: colors.surface,
                elevation: 4,
                padding: 8,
                borderRadius: 12,
                minHeight: PixelRatio.getPixelSizeForLayoutSize(20),
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                Linking.openURL(doc.uri);
              }}
            >
              <Text
                variant="titleMedium"
                style={{ color: colors.onBackground }}
              >
                {doc.name}
              </Text>
            </TouchableRipple>
          ))}
        </View>
        <Text
          variant="headlineLarge"
          style={{
            color: colors.onBackground,
          }}
        >
          Партнеры
        </Text>
        <View>
          <Carousel
            loop
            width={width - 32}
            height={width / 2}
            autoPlay={true}
            data={partners}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => console.log("current index:", index)}
            renderItem={({ item, index }) => (
              <TouchableRipple
                rippleColor={"rgba(0, 0, 0, 0.5)"}
                style={{
                  elevation: 4,
                  backgroundColor: "#ECE6F0",
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  height: PixelRatio.getPixelSizeForLayoutSize(50),
                  margin: 10,
                }}
                onPress={() => {
                  Linking.openURL(item.uri);
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ width: "100%", height: "70%" }}
                  resizeMode="contain"
                />
              </TouchableRipple>
            )}
          />
        </View>

        <Text
          variant="headlineLarge"
          style={{
            color: colors.onBackground,
          }}
        >
          Контакты
        </Text>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {socialApps.map((item, index) => (
              <TouchableRipple
                key={index}
                onPress={() => Linking.openURL(item.uri)}
              >
                <Image
                  source={item.image}
                  style={{ width: 100, height: 50 }}
                  resizeMode="contain"
                />
              </TouchableRipple>
            ))}
          </View>
        </View>
        <TouchableRipple
          rippleColor={"rgba(0, 0, 0, 0.5)"}
          onPress={() => {
            Linking.openURL("mailto:childrenofasia-yakutsk2024@yandex.ru");
          }}
        >
          <Text
            variant="bodyLarge"
            style={{
              textAlign: "center",
              width: "100%",
              color: colors.onBackground,
            }}
          >
            childrenofasia-yakutsk2024@yandex.ru
          </Text>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};
