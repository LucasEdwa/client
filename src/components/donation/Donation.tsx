import React, { useState } from "react";
import PrivateDonationForm from "./PrivateDonationForm";
import CompanyDonationForm from "./CompanyDonationForm";
import hero1 from "/Users/lucaseduardo/gambia/client/src/assets/img_donation.jpeg";
import { TPrivateDonationFormData, TCompanyDonationFormData } from "../../types/types";
import { styles } from "../../constants/styles";
import { DonationContent } from "../../constants/contents";
type TDonationFormData = TPrivateDonationFormData & TCompanyDonationFormData;


export default function Donation() {
  const [donationType, setDonationType] = useState("privat-person");
  const [formData, setFormData] = useState<TDonationFormData>({
    fullName: "",
    email: "",
    mobileNumber: "",
    companyRegistrationNumber: "",
    companyEmail: "",
    companyFirstName: "",
    companyLastName: "",
    companyMobileNumber: "",
    checkedForTaxReduction: false,
    personalNumber: "",
    donationAmount: "",
    signatureType: "",
  });

  const handleDonationTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDonationType(event.target.value);
  };

  return (
    <div className={styles.donation.container}>
            <img src={hero1} alt="hero" className={styles.donation.image} />

      <div className={styles.donation.contentContainer}>
        <h1 className={styles.donation.title}>
          {DonationContent.title}
        </h1>
        <p className={styles.donation.description}>
          {DonationContent.description}
        </p>
        <div className={styles.donation.formContainer}>
          <div className={styles.donation.radioGroup}>
            <h1 className="text-xs p-2">Donate as:</h1>
            <input
              type="radio"
              id="privat-person"
              name="donation"
              value="privat-person"
              onChange={handleDonationTypeChange}
              defaultChecked
              className=""
            />
            <label htmlFor="privat-person" className={styles.donation.radioLabel}>
              {DonationContent.privatePersonLabel}
            </label>
            <input
              type="radio"
              id="foretag"
              name="donation"
              value="foretag"
              onChange={handleDonationTypeChange}
              className=""
            />
            <label htmlFor="foretag" className={styles.donation.radioLabel}>
              {DonationContent.companyLabel}
            </label>
          </div>
          {donationType === "privat-person" && (
            <PrivateDonationForm
              formData={formData as TPrivateDonationFormData}
              setFormData={setFormData as React.Dispatch<React.SetStateAction<TPrivateDonationFormData>>}
            />
          )}
          {donationType === "foretag" && (
            <CompanyDonationForm
              formData={formData as TCompanyDonationFormData}
              setFormData={setFormData as React.Dispatch<React.SetStateAction<TCompanyDonationFormData>>}
            />
          )}
        </div>
      </div>
    </div>
  );
}
