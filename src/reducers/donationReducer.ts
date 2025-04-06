import { TCompanyDonationFormData, TPrivateDonationFormData } from "../types/types";

export interface IDonationState {
  donationType: "private" | "company";
  privateFormData: TPrivateDonationFormData;
  companyFormData: TCompanyDonationFormData;
}

export enum DonationActionTypes {
  SET_DONATION_TYPE = "SET_DONATION_TYPE",
  SET_PRIVATE_FORM_DATA = "SET_PRIVATE_FORM_DATA",
  SET_COMPANY_FORM_DATA = "SET_COMPANY_FORM_DATA",
}

type IDonationAction =
  | {
      type: DonationActionTypes.SET_DONATION_TYPE;
      payload: { donationType: "private" | "company" };
    }
  | {
      type: DonationActionTypes.SET_PRIVATE_FORM_DATA;
      payload: Partial<TPrivateDonationFormData>;
    }
  | {
      type: DonationActionTypes.SET_COMPANY_FORM_DATA;
      payload: Partial<TCompanyDonationFormData>;
    };

export const initialState: IDonationState = {
  donationType: "private",
  privateFormData: {
    donationType: "private",
    fullName: "",
    email: "",
    mobileNumber: "",
    checkedForTaxReduction: false,
    signatureType: "",
  },
  companyFormData: {
    donationType: "company",
    companyRegistrationNumber: "",
    companyEmail: "",
    companyFirstName: "",
    companyLastName: "",
    companyMobileNumber: "",
    signatureType: "",
    donationAmount: 0,
  },
};

export const DonetionReducer = (
  state: IDonationState,
  action: IDonationAction
): IDonationState => {
  switch (action.type) {
    case DonationActionTypes.SET_DONATION_TYPE:
      return { ...state, donationType: action.payload.donationType };
    case DonationActionTypes.SET_PRIVATE_FORM_DATA:
      return {
        ...state,
        privateFormData: {
          ...state.privateFormData,
          ...action.payload,
        },
      };
    case DonationActionTypes.SET_COMPANY_FORM_DATA:
      return {
        ...state,
        companyFormData: {
          ...state.companyFormData,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
