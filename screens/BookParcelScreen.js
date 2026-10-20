import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { useParcels } from "../context/ParcelContext";
import { Picker } from "@react-native-picker/picker";

export default function BookParcelScreen({ navigation }) {

  const { bookParcel, SERVICE_RATES } = useParcels();

  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [weight, setWeight] = useState("");
  const [service, setService] = useState("normal"); 

  const handleBook = () => {
    if (
      senderName === "" ||
      senderPhone === "" ||
      receiverName === "" ||
      receiverAddress === "" ||
      receiverPhone === "" ||
      weight === ""
    ) {
      alert( "Please fill all fields");
      return;
    }

    if (isNaN(weight)) {
      alert("Weight must be a number");
      return;
    }

    const newParcel = bookParcel({
      senderName,
      senderPhone,
      receiverName,
      receiverAddress,
      receiverPhone,
      weight: Number(weight),
      service, 
    });

  alert(
      "AWB: " + newParcel.awb + "\nService: " + service +
      "\nTotal Price: Rs. " + newParcel.price
    );

    // reset
    setSenderName("");
    setSenderPhone("");
    setReceiverName("");
    setReceiverAddress("");
    setReceiverPhone("");
    setWeight("");
    setService("normal");

    navigation.navigate("Dashboard");
  };

  // live price
  const rate = SERVICE_RATES[service] || 0;
  const livePrice = weight ? Number(weight) * rate : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Book a Parcel</Text>
        <Text style={styles.headerSubtitle}>Fill in the details below</Text>
      </View>

      <ScrollView style={styles.form} >
        <View style={styles.card}>

          <Text style={styles.label}>Sender Name</Text>
          <TextInput style={styles.input} value={senderName} onChangeText={setSenderName} />

          <Text style={styles.label}>Sender Phone</Text>
          <TextInput style={styles.input} value={senderPhone} onChangeText={setSenderPhone} keyboardType="phone-pad" />

          <Text style={styles.label}>Receiver Name</Text>
          <TextInput style={styles.input} value={receiverName} onChangeText={setReceiverName} />

          <Text style={styles.label}>Receiver Address</Text>
          <TextInput style={[styles.input, { height: 70 }]} value={receiverAddress} onChangeText={setReceiverAddress} multiline />

          <Text style={styles.label}>Receiver Phone</Text>
          <TextInput style={styles.input} value={receiverPhone} onChangeText={setReceiverPhone} keyboardType="phone-pad" />

          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput style={styles.input} value={weight} onChangeText={setWeight} keyboardType="numeric" />

          <Text style={styles.label}>Service Type</Text>
         <View style={styles.pickerWrap}>
  <Picker
    selectedValue={service}
    onValueChange={(itemValue) => setService(itemValue)}
  >
    <Picker.Item label="Normal" value="normal" />
    <Picker.Item label="Urgent" value="urgent" />
    <Picker.Item label="Special" value="special" />
  </Picker>
</View>

          <Text style={styles.priceHint}>
            Rate: Rs. {rate} per kg
          </Text>

          <Text style={styles.priceHint}>
            Total Price: Rs. {livePrice}
          </Text>

          <TouchableOpacity style={styles.btn} onPress={handleBook}>
            <Text style={styles.btnText}>Book Now</Text>
          </TouchableOpacity>

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
  pickerWrap: {
  borderWidth: 1.5,
  borderColor: "#e0e0e0",
  borderRadius: 10,
  marginBottom: 16,
  backgroundColor: "#fafafa",
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
  form: {
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
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#444",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: "#1a1a1a",
    marginBottom: 16,
    backgroundColor: "#fafafa",
  },
  priceHint: {
    fontSize: 12,
    color: "#888",
    marginTop: -10,
    marginBottom: 16,
  },
  btn: {
    backgroundColor: "#E30613",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
