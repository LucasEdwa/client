import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TPrivateDonationFormData, TCompanyDonationFormData } from "../types/types";

type DonationState = {
  donationType: "private" | "company";
  privateFormData: TPrivateDonationFormData;
  companyFormData: TCompanyDonationFormData;
};

const initialState: DonationState = {
  donationType: "private",
  privateFormData: {
    donationType: "private",
    fullName: "",
    email: "",
    mobileNumber: 0,
    checkedForTaxReduction: false,
    personalNumber: 0,
    donationAmount: 0,
    signatureType: "",
  },
  companyFormData: {
    donationType: "company",
    companyRegistrationNumber: "",
    companyEmail: "",
    companyFirstName: "",
    companyLastName: "",
    companyMobileNumber: 0,
    donationAmount: 0,
    signatureType: "",
  }
};

const donationSlice = createSlice({
  name: "donation",
  initialState,
  reducers: {
    setDonationType(state, action: PayloadAction<"private" | "company">) {
      state.donationType = action.payload;
    },
    setPrivateFormData(state, action: PayloadAction<TPrivateDonationFormData>) {
      state.privateFormData = action.payload;
    },
    setCompanyFormData(state, action: PayloadAction<TCompanyDonationFormData>) {
      state.companyFormData = action.payload;
    },
    setFormData(state, action: PayloadAction<Partial<TPrivateDonationFormData> | Partial<TCompanyDonationFormData>>) {
      const isPrivate = state.donationType === "private";
      const currentFormData = isPrivate 
        ? state.privateFormData 
        : state.companyFormData;
      
      state.privateFormData = {
        ...currentFormData,
        ...action.payload,
        donationType: state.donationType
      } as TPrivateDonationFormData;
      state.companyFormData = {
        ...currentFormData,
        ...action.payload,
        donationType: state.donationType
      } as TCompanyDonationFormData;
    },
  },
});

export const { setDonationType, setPrivateFormData, setCompanyFormData, setFormData } = donationSlice.actions;
export default donationSlice.reducer;
