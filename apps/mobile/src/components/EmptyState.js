import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No events yet</Text>
      <Text style={styles.sub}>Events from the ERP will appear here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  icon: {
    fontSize: 40,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  sub: {
    fontSize: 13,
    color: '#9ca3af',
    marginTop: 4,
  },
});