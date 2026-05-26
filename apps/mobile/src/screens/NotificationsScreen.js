import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useSocket } from "../hooks/useSocket";
import NotificationCard from "../components/NotificationCard";
import StatsBar from "../components/StatsBar";
import EmptyState from "../components/EmptyState";

export default function NotificationsScreen() {
  const { isConnected, events } = useSocket();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7fb" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>ERP Notifications</Text>
            <Text style={styles.subtitle}>Live ERP event tracking</Text>
          </View>
          <View style={styles.statusDot}>
            <View
              style={[
                styles.dot,
                { backgroundColor: isConnected ? "#22c55e" : "#ef4444" },
              ]}
            />
            <Text style={styles.statusText}>
              {isConnected ? "Live" : "Offline"}
            </Text>
          </View>
        </View>

        <StatsBar events={events} />

        <Text style={styles.sectionTitle}>Live Notifications</Text>
        <FlatList
          data={events}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <NotificationCard event={item} />}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  statusDot: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    color: "#6b7280",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
});
