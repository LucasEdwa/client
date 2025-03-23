import React, { useState } from "react";
import PrivateDonationForm from "./PrivateDonationForm";
import CompanyDonationForm from "./CompanyDonationForm";
import hero1 from "/Users/lucaseduardo/gambia/client/src/assets/img_donation.jpeg";
import { TPrivateDonationFormData, TCompanyDonationFormData } from "../../types/types";
import { DonationContent } from "../../constants/contents";
import { useTheme } from "../../contexts/ThemeContext";
import { styles } from "../../constants/styles";

type TDonationFormData = TPrivateDonationFormData & TCompanyDonationFormData;

export default function Donation() {
  const [donationType, setDonationType] = useState("private");
  const { theme } = useTheme();
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
    <div className={` ${styles.donation.container}`}>
      <img src={hero1} alt="hero" className={styles.donation.image} />

      <div className={  `${styles.donation.contentContainer} ${theme.background}`}>
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
              id="private-person"
              name="donation"
              value="private"
              onChange={handleDonationTypeChange}
              defaultChecked
              className=""
            />
            <label htmlFor="private-person" className={styles.donation.radioLabel}>
              Private Person
            </label>
            <input
              type="radio"
              id="company"
              name="donation"
              value="company"
              onChange={handleDonationTypeChange}
              className=""
            />
            <label htmlFor="company" className={styles.donation.radioLabel}>
              Company
            </label>
          </div>
          {donationType === "private" && (
            <PrivateDonationForm
              formData={formData as TPrivateDonationFormData}
              setFormData={setFormData as React.Dispatch<React.SetStateAction<TPrivateDonationFormData>>}
            />
          )}
          {donationType === "company" && (
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
