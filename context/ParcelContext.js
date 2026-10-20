import React, { createContext, useState, useContext } from "react";

const ParcelContext = createContext();

//  Service-based rates
const SERVICE_RATES = {
  normal: 50,
  urgent: 80,
  special: 120,
};

//  Initial fake data
const initialParcels = [
  {
    awb: "TCS1001",
    senderName: "Ali Raza",
    senderPhone: "0300-1234567",
    receiverName: "Sara Khan",
    receiverPhone:"0300-12345678",
    receiverAddress: "DHA Phase 5, Karachi",
    weight: 2,
    service: "normal",
    price: 2 * SERVICE_RATES.normal,
    status: "In Transit",
  },
  {
    awb: "TCS1002",
    senderName: "Hira Malik",
    senderPhone: "0311-2233445",
    receiverName: "Usman Tariq",
        receiverPhone:"0300-12345678",

    receiverAddress: "Saddar, Rawalpindi",
    weight: 1,
    service: "urgent",
    price: 1 * SERVICE_RATES.urgent,
    status: "Delivered",
  },
  {
    awb: "TCS1003",
    senderName: "Ahmed Bilal",
    senderPhone: "0333-9988776",
    receiverName: "Zainab Fatima",
    receiverAddress: "Model Town, Lahore",
        receiverPhone :"0300-12345678",

    weight: 3,
    service: "special",
    price: 3 * SERVICE_RATES.special,
    status: "Booked",
  },
];

export const ParcelProvider = ({ children }) => {
  const [parcels, setParcels] = useState(initialParcels);
  const [nextId, setNextId] = useState(1004);

  //  Add new parcel
  const bookParcel = (form) => {
    const rate = SERVICE_RATES[form.service] || SERVICE_RATES.normal;

    const newParcel = {
      ...form,
      awb: "TCS" + nextId,
      price: form.weight * rate,
      status: "Booked",
    };

    setParcels([newParcel, ...parcels]);
    setNextId(nextId + 1);

    return newParcel;
  };

  // Find parcel by AWB
  const findParcel = (awb) => {
    return parcels.find((p) => p.awb === awb) || null;
  };

  return (
    <ParcelContext.Provider
      value={{
        parcels,
        bookParcel,
        findParcel,
        SERVICE_RATES, 
      }}
    >
      {children}
    </ParcelContext.Provider>
  );
};

export const useParcels = () => useContext(ParcelContext);