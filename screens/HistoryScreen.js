import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useParcels } from "../context/ParcelContext";

const statusColor = (status) => {
  if (status === "Delivered") return "#22c55e";
  if (status === "In Transit") return "#3b82f6";
  return "#f59e0b";
};

export default function HistoryScreen({ navigation }) {
  const { parcels } = useParcels();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Parcel History</Text>
        <Text style={styles.headerSubtitle}>All your booked parcels</Text>
      </View>

      <View style={styles.content}>
        <FlatList
          data={parcels}
          keyExtractor={(item) => item.awb}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("ParcelDetails", { parcel: item })}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.awb}>{item.awb}</Text>
                <View style={[styles.badge, { backgroundColor: statusColor(item.status) }]}>
                  <Text style={styles.badgeText}>{item.status}</Text>
                </View>
              </View>
              <Text style={styles.cardText}>To: {item.receiverName}</Text>
              <Text style={styles.cardSubText}>{item.receiverAddress}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#E30613",
    paddingTop: 24,
    paddingBottom: 28,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#fff",
    opacity: 0.85,
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: -16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  awb: {
    fontWeight: "700",
    fontSize: 15,
    color: "#1a1a1a",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  cardText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
  },
  cardSubText: {
    fontSize: 13,
    color: "#888",
  },
});
