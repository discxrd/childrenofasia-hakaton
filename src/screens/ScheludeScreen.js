import { useCallback, useEffect, useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { ActivityIndicator, Button, Icon, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ScheludeCard } from "../components/Cards/ScheludeCard";
import { cache } from "../helpers/cache";

const BuyTickets = ({
  onIncrease,
  onDecrease,
  sum,
  ticketCount,
  confirmBuy,
}) => {
  return (
    <View style={{ flex: 1, gap: 8, padding: 20 }}>
      <Text variant="headlineMedium" style={{ color: "white" }}>
        {sum} р.
      </Text>
      <Text variant="headlineMedium" style={{ color: "white" }}>
        Количество билетов:
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Button
          style={{ flex: 1 }}
          mode="elevated"
          buttonColor="#2C2A32"
          onPress={onDecrease}
        >
          <Icon source="minus" color="white" size={24} />
        </Button>
        <Text
          style={{ flex: 3, textAlign: "center", color: "white" }}
          variant="headlineLarge"
        >
          {ticketCount} шт.
        </Text>
        <Button
          style={{ flex: 1 }}
          mode="elevated"
          buttonColor="#2C2A32"
          onPress={onIncrease}
        >
          <Icon source="plus" color="white" size={24} />
        </Button>
      </View>
      <Text style={{ color: "white" }} variant="titleLarge">
        Осталось 1000 шт.
      </Text>
      <Button mode="elevated" buttonColor={"#9747FF"} onPress={confirmBuy}>
        <Text
          variant="bodyLarge"
          style={{ color: "white", fontWeight: "bold" }}
        >
          Подтвердить
        </Text>
      </Button>
    </View>
  );
};

const addTicket = async (ticket) => {
  try {
    const existingTickets = await AsyncStorage.getItem("@store:tickets");
    let tickets = [];

    if (existingTickets) {
      tickets = JSON.parse(existingTickets);
    }

    tickets.push(ticket);

    await AsyncStorage.setItem("@store:tickets", JSON.stringify(tickets));
  } catch (error) {
    console.log(error);
  }
};

export function ScheludeScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [sum, setSum] = useState(740);
  const [ticketCount, setTicketCount] = useState(1);

  const [currentTicket, setCurrentTicket] = useState({});

  const [refreshing, setRefreshing] = useState(false);

  const getGraphic = async () => {
    try {
      const response = await fetch(
        "https://demonstrationserverchildrenofasia.discxrd.repl.co/calendar"
      );
      const json = await response.json();

      cache.set("calendar", json.data.data);

      setData(json.data.data);
    } catch {
      await cache.get("calendar").then((calendar) => {
        setData(calendar);
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getGraphic();
  });

  const confirmBuy = async () => {
    for (let x = 0; x < ticketCount; x++) {
      console.log("Adding ticket")
      await addTicket(currentTicket);
    }
    const existingTickets = await AsyncStorage.getItem("@store:tickets");
    toggleSheet();
  };

  useEffect(() => {
    getGraphic();
  }, []);

  const toggleSheet = () => {
    setOpen(!isOpen);
  };
  const increaseSum = () => {
    setSum(sum + 740);
  };
  const decreaseSum = () => {
    if (sum > 0) {
      setSum(sum - 740);
    }
  };
  const increaseTicketCount = () => {
    setTicketCount(ticketCount + 1);
    increaseSum();
  };
  const decreaseTicketCount = () => {
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
      decreaseSum();
    }
  };

  return (
    <SafeAreaView style={{}}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ padding: 16, paddingTop: 10 }}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          data.map((item, index) => (
            <ScheludeCard
              key={index}
              setCurrentTicket={setCurrentTicket}
              toggleSheet={toggleSheet}
              number={item.number}
              place={item.place}
              time={item.time}
              type={item.title}
            />
          ))
        )}
      </ScrollView>
      {isOpen && (
        <>
          <Pressable style={styles.backdrop} onPress={toggleSheet} />
          <Animated.View
            style={styles.sheet}
            entering={SlideInDown.springify().damping(150)}
            exiting={SlideOutDown.springify().damping(150)}
          >
            <BuyTickets
              onDecrease={decreaseTicketCount}
              onIncrease={increaseTicketCount}
              sum={sum}
              confirmBuy={confirmBuy}
              ticketCount={ticketCount}
            />
          </Animated.View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: "#2C2A32",
    height: 220,
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 1,
  },
});
