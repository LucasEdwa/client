import React from "react";
import { TDonationAmountOptionsProps, TDonationAmount } from "../types/types";
import { styles } from "../constants/styles";

const CompanyDonationAmountOptions: React.FC<TDonationAmountOptionsProps> = ({
  donationAmount,
  handleDonationAmountClick,
}) => {
  const amounts: TDonationAmount[] = [
    { value: 10000, display: "10000 kr" },
    { value: 40000, display: "40000 kr" },
    { value: "OPTIONAL", display: "OPTIONAL" }
  ];
  return (
    <div className={styles.companyDonationForm.donationOptionsContainer}>
      {amounts.map((amount) => (
        <input
          key={amount.display}
          type="button"
          className={`${styles.companyDonationForm.button} ${donationAmount === amount ? styles.companyDonationForm.activeButton : "bg-transparent"
            }`}
          value={amount.display}
          onClick={() => handleDonationAmountClick(amount)}
        />
      ))}
    </div>
  );
};

export default CompanyDonationAmountOptions; 