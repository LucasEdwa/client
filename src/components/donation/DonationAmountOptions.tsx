import React from "react";
import { TDonationAmountOptionsProps, TDonationAmount } from "../../types/types";
import { styles } from "../../constants/styles";

const DonationAmountOptions: React.FC<TDonationAmountOptionsProps> = ({
  donationAmount,
  handleDonationAmountClick,
}) => {
  const amounts: TDonationAmount[] = [
    { value: 100, display: "100 KR" },
    { value: 200, display: "200 KR" },
    { value: 400, display: "400 KR" },
    { value: "OPTIONAL", display: "OPTIONAL" }
  ];

  return (
    <div className={styles.privateDonationForm.donationOptionsContainer}>
      {amounts.map((amount) => (
        <input
          key={amount.display}
          type="button"
          className={`${styles.privateDonationForm.button} ${
            donationAmount.value === amount.value ? styles.privateDonationForm.activeButton : "bg-transparent"
          }`}
          value={amount.display}
          onClick={() => handleDonationAmountClick(amount)}
        />
      ))}
    </div>
  );
};

export default DonationAmountOptions; 