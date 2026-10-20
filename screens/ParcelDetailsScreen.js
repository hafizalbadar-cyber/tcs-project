import { View, Text, StyleSheet, ScrollView } from "react-native";

const statusColor = (status) => {
  if (status === "Delivered") return "#22c55e";
  if (status === "In Transit") return "#3b82f6";
  return "#f59e0b";
};

export default function ParcelDetailsScreen({ route }) {
  const { parcel } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Parcel Details</Text>
        <Text style={styles.headerSubtitle}>{parcel.awb}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Status</Text>
            <View style={[styles.badge, { backgroundColor: statusColor(parcel.status) }]}>
              <Text style={styles.badgeText}>{parcel.status}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Sender Info</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>{parcel.senderName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>{parcel.senderPhone}</Text>
          </View>

          <Text style={styles.sectionTitle}>Receiver Info</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>{parcel.receiverName}</Text>
          </View>
           <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Receiver Phone</Text>
            <Text style={styles.infoValue}>{parcel.receiverPhone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address</Text>
            <Text style={styles.infoValue}>{parcel.receiverAddress}</Text>
          </View>

          <Text style={styles.sectionTitle}>Parcel Info</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>AWB Number</Text>
            <Text style={styles.infoValue}>{parcel.awb}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Weight</Text>
            <Text style={styles.infoValue}>{parcel.weight} kg</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Price</Text>
            <Text style={styles.infoValue}>Rs. {parcel.price}</Text>
          </View>

             <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Service Type</Text>
            <Text style={styles.infoValue}> {parcel.service}</Text>
          </View>
        </View>
      </ScrollView>
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
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    marginBottom: 30,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 14,
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: "700",
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
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#E30613",
    marginTop: 10,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 13,
    color: "#888",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
    maxWidth: "60%",
    textAlign: "right",
  },
});
