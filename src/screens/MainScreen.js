import { useState, useCallback, useEffect } from "react";
import { RefreshControl, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

import { Timer } from "../components/Other/Timer";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { NewsCard } from "../components/Cards/NewsCard";
import YoutubePlayer from "react-native-youtube-iframe";
import moment from "moment";
import { cache } from "../helpers/cache";

const hashCode = function (s) {
  return s.split("").reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
};

export function MainScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [seconds, setSeconds] = useState("");
  const [minutes, setMinutes] = useState("");
  const [hours, setHours] = useState("");
  const [days, setDays] = useState("");
  const targetDate = moment("2024-06-26 00:00:00", "YYYY-MM-DD HH:mm:ss");
  const [refreshing, setRefreshing] = useState(false);

  const getNews = async () => {
    try {
      const response = await fetch(
        "https://demonstrationserverchildrenofasia.discxrd.repl.co/news"
      );
      const json = await response.json();

      await cache.set("news", json.data.data);

      setData(json.data.data);
    } catch {
      await cache.get("news").then((news) => {
        setData(news);
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const diff = moment.duration(targetDate.diff(now));

      setSeconds(diff.seconds());
      setMinutes(diff.minutes());
      setHours(diff.hours());
      setDays(Math.round(diff.asDays()));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [targetDate]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getNews();
  });

  useEffect(() => {
    getNews();
  }, []);

  const { colors } = useTheme();
  const [playing, setPlaying] = useState(false);
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ padding: 16, paddingTop: 10, height: "100%" }}
        contentContainerStyle={{ rowGap: 12 }}
        overScrollMode="never"
      >
        <View style={{ color: colors.background }}>
          <Text
            variant="headlineLarge"
            style={{
              color: colors.onBackground,
            }}
          >
            Международные спортивные игры "Дети Азии"
          </Text>
        </View>
        {days > 0 ? (
          <Timer
            seconds={seconds}
            minutes={minutes}
            hours={hours}
            days={days}
          />
        ) : (
          <Text variant="titleLarge" style={{ textAlign: "center" }}>
            Соревнования начались!
          </Text>
        )}
        <Text variant="headlineLarge" style={{ color: colors.onBackground }}>
          Прямые трансляции
        </Text>
        <YoutubePlayer
          play={playing}
          height={200}
          videoId={"6LPy4gEdAaA"}
          onChangeState={onStateChange}
        />
        <Text variant="headlineLarge" style={{ color: colors.onBackground }}>
          Новости
        </Text>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          data.map((item, index) => (
            <NewsCard
              hash={hashCode(item.title)}
              key={index}
              title={item.title}
              content={item.content}
              uri={item?.uri}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
