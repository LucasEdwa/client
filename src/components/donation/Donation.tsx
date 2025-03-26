import React, { useState } from "react";
import PrivateDonationForm from "./PrivateDonationForm";
import CompanyDonationForm from "./CompanyDonationForm";
import hero1 from "../../assets/img_donation.jpeg"; // Ensure the path is correct
import { TPrivateDonationFormData, TCompanyDonationFormData } from "../../types/types";
import { DonationContent } from "../../constants/contents";
import { useTheme } from "../../contexts/ThemeContext";
import { styles } from "../../constants/styles";

export default function Donation() {
  const [donationType, setDonationType] = useState<"private" | "company">("private");
  const { theme } = useTheme();
  const [privateFormData, setPrivateFormData] = useState<TPrivateDonationFormData>({
    donationType: "private",
    fullName: "",
    email: "",
    mobileNumber: "",
    checkedForTaxReduction: false,
    signatureType: "",
  });
  const [companyFormData, setCompanyFormData] = useState<TCompanyDonationFormData>({
    donationType: "company",
    companyRegistrationNumber: "",
    companyEmail: "",
    companyFirstName: "",
    companyLastName: "",
    companyMobileNumber: "",
    signatureType: "",
    donationAmount: 0
  });

  const handleDonationTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDonationType(event.target.value as "private" | "company");
  };

  return (
    <div className={`${styles.donation.container}`}>
      <img src={hero1} alt="hero" className={styles.donation.image} />
      <div className={`${styles.donation.contentContainer} ${theme.background}`}>
        <h1 className={styles.donation.title}>{DonationContent.title}</h1>
        <p className={styles.donation.description}>{DonationContent.description}</p>
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
              className="text-xs"
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
              formData={privateFormData}
              setFormData={setPrivateFormData}
            />
          )}
          {donationType === "company" && (
            <CompanyDonationForm
              formData={companyFormData}
              setFormData={setCompanyFormData}
            />
          )}
        </div>
      </div>
    </div>
  );
}