import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useParcels } from "../context/ParcelContext";

const statusColor = (status) => {
  if (status === "Delivered") return "#22c55e";
  if (status === "In Transit") return "#3b82f6";
  return "#f59e0b";
};

export default function DashboardScreen({ navigation }) {
  const { parcels } = useParcels();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome Back 👋</Text>
          <Text style={styles.subGreeting}>Here are your recent parcels</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: "#E30613" }]}
          onPress={() => navigation.navigate("Book Parcel")}
        >
          <Text style={styles.actionText}>+ Book Parcel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: "#1a1a1a" }]}
          onPress={() => navigation.navigate("Track Parcel")}
        >
          <Text style={styles.actionText}>Track Parcel</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Recent Parcels</Text>

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  subGreeting: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  quickActions: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  actionText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 12,
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
