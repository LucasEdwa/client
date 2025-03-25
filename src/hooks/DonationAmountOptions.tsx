import React from "react";
import { TDonationAmountOptionsProps } from "../types/types";
import { styles } from "../constants/styles";

const DonationAmountOptions: React.FC<TDonationAmountOptionsProps> = ({
  donationAmount,
  handleDonationAmountClick,
}) => (
  <div className={styles.privateDonationForm.donationOptionsContainer}>
    {["100 KR", "200 KR", "400 KR", "OPTIONAL"].map((amount) => (
      <input
        key={amount}
        type="button"
        className={`${styles.privateDonationForm.button} ${
          donationAmount === amount ? styles.privateDonationForm.activeButton : "bg-transparent"
        }`}
        value={amount}
        onClick={() => handleDonationAmountClick(amount)}
      />
    ))}
  </div>
);

export default DonationAmountOptions; 