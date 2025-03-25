export type DonationAmount = "10000 KR" | "40000 KR" | "OPTIONAL";

export type SignatureType = "ge-en-gava" | "become-monthly-donor" | "give-a-gift";

export interface DonationFormData {
  registrationNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  checkedForTaxReduction?: boolean;
  personalNumber?: string;
}

export interface DonationFormProps {
  formData: DonationFormData;
  setFormData: React.Dispatch<React.SetStateAction<DonationFormData>>;
}

export interface ValidationSchema {
  [key: string]: {
    required?: boolean;
    pattern?: RegExp;
    message: string;
  };
}

export interface FormErrors {
  [key: string]: string;
} 