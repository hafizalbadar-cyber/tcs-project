import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { useParcels } from "../context/ParcelContext";

const statusColor = (status) => {
  if (status === "Delivered") return "#22c55e";
  if (status === "In Transit") return "#3b82f6";
  return "#f59e0b";
};

export default function TrackParcelScreen({ route }) {
  const { findParcel } = useParcels();
  const [awb, setAwb] = useState("");
  const [parcel, setParcel] = useState(null);

  const handleTrack = (awbToFind) => {
    if (awbToFind === "") {
      alert( "Please enter a valid AWB number");
      return;
    }

    const result = findParcel(awbToFind);

    if (result) {
      setParcel(result);
    } else {
      setParcel(null);
      alert( "No parcel found with this AWB number");
    }
  };

  // If we came here from the Dashboard with an AWB, track it automatically
  useEffect(() => {
    if (route.params && route.params.awb) {
      setAwb(route.params.awb);
      handleTrack(route.params.awb);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Track Parcel</Text>
        <Text style={styles.headerSubtitle}>Enter your AWB number to view status</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchRow}>
          <TextInput
            style={styles.input}
            placeholder="e.g. TCS1001"
            placeholderTextColor="#999"
            value={awb}
            onChangeText={setAwb}
            autoCapitalize="characters"
          />
          <TouchableOpacity style={styles.searchBtn} onPress={() => handleTrack(awb)}>
            <Text style={styles.searchBtnText}>Track</Text>
          </TouchableOpacity>
        </View>

        {parcel && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.awb}>{parcel.awb}</Text>
              <View style={[styles.badge, { backgroundColor: statusColor(parcel.status) }]}>
                <Text style={styles.badgeText}>{parcel.status}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Sender</Text>
              <Text style={styles.infoValue}>{parcel.senderName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Receiver</Text>
              <Text style={styles.infoValue}>{parcel.receiverName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={styles.infoValue}>{parcel.receiverAddress}</Text>
            </View>
             <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Receiver Phone</Text>
              <Text style={styles.infoValue}>{parcel.receiverPhone}</Text>
            </View>
          </View>
        )}
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
  searchRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: "#1a1a1a",
    backgroundColor: "#fff",
    elevation: 2,
  },
  searchBtn: {
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 10,
    elevation: 2,
  },
  searchBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    marginBottom: 30,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  awb: {
    fontSize: 17,
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
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 13,
    color: "#888",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
    maxWidth: "65%",
    textAlign: "right",
  },
});
