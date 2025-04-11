import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TPayment } from "../types/types";
import { RootState } from "./store";

interface PaymentState {
  paymentData: TPayment;
  swishNumber: string;
  showQRCode: boolean;
}

const initialState: PaymentState = {
  paymentData: {
    donationType: "private",
    signatureType: "",
    donationAmount: 0,
    paymentMethod: "swish",
    swishNumber: "",
    showQRCode: false,
  },
  swishNumber: "",
  showQRCode: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentData: (state, action: PayloadAction<TPayment>) => {
      state.paymentData = action.payload;
    },
    setSwishNumber: (state, action: PayloadAction<string>) => {
      state.swishNumber = action.payload;
    },
    setShowQRCode: (state, action: PayloadAction<boolean>) => {
      state.showQRCode = action.payload;
    },
  },
});

export const { setPaymentData, setSwishNumber, setShowQRCode } = paymentSlice.actions;
export const selectPayment = (state: RootState) => state.payment;
export default paymentSlice.reducer;
