import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StatsBar({ events }) {
  const sources = new Set(events.map((e) => e.source)).size;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Total Events</Text>
        <Text style={styles.value}>{events.length}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Sources</Text>
        <Text style={styles.value}>{sources}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  value: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
});
