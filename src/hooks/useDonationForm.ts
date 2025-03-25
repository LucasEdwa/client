// import { useState, useCallback } from 'react';
// import { DonationFormData, DonationAmount, SignatureType } from '../types/donation';

// export const useDonationForm = (initialData: DonationFormData) => {
//   const [formState, setFormState] = useState({
//     signatureType: "ge-en-gava" as SignatureType,
//     donationAmount: "10000 KR" as DonationAmount,
//     customDonationAmount: "",
//     ...initialData
//   });

//   const updateField = useCallback((field: keyof DonationFormData, value: any) => {
//     setFormState(prev => ({ ...prev, [field]: value }));
//   }, []);

//   const updateDonationAmount = useCallback((amount: DonationAmount) => {
//     setFormState(prev => ({
//       ...prev,
//       donationAmount: amount,
//       customDonationAmount: amount === "OPTIONAL" ? "" : prev.customDonationAmount
//     }));
//   }, []);

//   const updateSignatureType = useCallback((type: SignatureType) => {
//     setFormState(prev => ({ ...prev, signatureType: type }));
//   }, []);

//   const updateCustomAmount = useCallback((value: string) => {
//     setFormState(prev => ({ ...prev, customDonationAmount: value }));
//   }, []);

//   return {
//     formState,
//     updateField,
//     updateDonationAmount,
//     updateSignatureType,
//     updateCustomAmount
//   };
// }; 