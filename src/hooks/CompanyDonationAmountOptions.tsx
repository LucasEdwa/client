import React from "react";
import { TDonationAmountOptionsProps } from "../types/types";
import { styles } from "../constants/styles";

const CompanyDonationAmountOptions: React.FC<TDonationAmountOptionsProps> = ({
  donationAmount,
  handleDonationAmountClick,
}) => (
  <div className={styles.companyDonationForm.donationOptionsContainer}>
    {["10000 KR", "40000 KR", "OPTIONAL"].map((amount) => (
      <input
        key={amount}
        type="button"
        className={`${styles.companyDonationForm.button} ${
          donationAmount === amount ? styles.companyDonationForm.activeButton : "bg-transparent"
        }`}
        value={amount}
        onClick={() => handleDonationAmountClick(amount)}
      />
    ))}
  </div>
);

export default CompanyDonationAmountOptions; 