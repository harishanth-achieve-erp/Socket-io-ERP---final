import React from "react";
import { View, Text, StyleSheet } from "react-native";

const typeColors = {
  order: { bg: "#eff6ff", text: "#2563eb" },
  invoice: { bg: "#f0fdf4", text: "#16a34a" },
  shipment: { bg: "#fff7ed", text: "#ea580c" },
  alert: { bg: "#fef2f2", text: "#dc2626" },
  other: { bg: "#f5f3ff", text: "#7c3aed" },
};

export default function NotificationCard({ event }) {
  const color = typeColors[event.type] || typeColors.other;
  const time = new Date(event.created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{event.title}</Text>
        <View style={[styles.badge, { backgroundColor: color.bg }]}>
          <Text style={[styles.badgeText, { color: color.text }]}>
            {event.type}
          </Text>
        </View>
      </View>
      <Text style={styles.description}>{event.description}</Text>
      <View style={styles.footer}>
        <Text style={styles.source}>{event.source}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    flex: 1,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  description: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  source: {
    fontSize: 12,
    color: "#9ca3af",
  },
  time: {
    fontSize: 12,
    color: "#9ca3af",
  },
});
