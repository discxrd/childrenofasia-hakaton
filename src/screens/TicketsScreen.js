import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { TicketCard } from "../components/Cards/TicketCard";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";

export function TicketsScreen() {
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getData = async () => {
    const value = await AsyncStorage.getItem("@store:tickets");
    if (value === null) {
      value = null;
    }
    setItems(JSON.parse(value));
    setRefreshing(false);
  };

  useEffect(() => {
    try {
      getData();
    } finally {
      setLoading(false);
    }
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
  });


  return (
    <SafeAreaView>
      <View style={{ padding: 16, paddingTop: 10, paddingBottom: 0 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{
            rowGap: 10,
          }}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            items.map((item, index) => (
              <TicketCard
                key={index}
                number={item.number}
                title={item.title}
                place={item.place}
                time={item.time}
              />
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
