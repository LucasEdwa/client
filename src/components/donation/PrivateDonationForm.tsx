import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { TPrivateDonationFormData, TFormErrors, TDonationMessages, TDonationMessageGenerator, TDonationAmount } from "../../types/types";
import { styles } from "../../constants/styles";
import DonationAmountOptions from "../../hooks/PrivateDonationAmountOptions";
import { useNavigate } from "react-router";

const generateDonationMessage: TDonationMessageGenerator = (amount: string, amountMessage: string) =>
  `Every month your ${amount} kr ${amountMessage}. As a World Parent, you are helping to give everyone in Gambia hope to continue.`;

const donationMessages: TDonationMessages = {
  "100": generateDonationMessage(
    "100",
    "support mothers in Gambia by providing 10-15 reusable diapers, a sustainable option for low-income families"
  ),
  "200": generateDonationMessage(
    "200",
    "supply a mother with approximately 800g of milk powder, along with a baby bottle to support infant nutrition"
  ),
  "400": generateDonationMessage(
    "400",
    "donation could cover 4 to 10 basic school textbooks in Gambia, focusing on core subjects like math, language, and science"
  ),
  "OPTIONAL": generateDonationMessage("optional", "donation could cover 4 to 10 basic school textbooks in Gambia, focusing on core subjects like math, language, and science"),
};

const validatePrivatePersonForm = (formData: TPrivateDonationFormData) => {
  const errors: TFormErrors = {};
  if (!formData.email) errors.email = "Email is required";
  if (!formData.mobileNumber) errors.mobileNumber = "Mobile number is required";
  if (formData.checkedForTaxReduction && !formData.personalNumber) {
    errors.personalNumber = "Personal number is required for tax reduction";
  }
  return errors;
};

export default function PrivateDonationForm({
  formData,
  setFormData,
}: {
  formData: TPrivateDonationFormData;
  setFormData: React.Dispatch<React.SetStateAction<TPrivateDonationFormData>>;
}) {
  const navigate = useNavigate();
  const [signatureType, setSignatureType] = useState("become-monthly-donor");
  const [donationAmount, setDonationAmount] = useState<TDonationAmount>({
    value: 100,
    display: "100 kr"
  });
  const [customDonationAmount, setCustomDonationAmount] = useState<number | "">("");
  const [formErrors, setFormErrors] = useState<TFormErrors>({});

  const handleButtonClick = (button: string) => {
    setSignatureType(button);
  };

  const handleDonationAmountClick = (amount: TDonationAmount) => {
    setDonationAmount(amount);
    if (amount.value === "OPTIONAL") {
      setCustomDonationAmount("");
      setFormData(prev => ({
        ...prev,
        donationAmount: 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        donationAmount: typeof amount.value === "number" ? amount.value : 0
      }));
    }
  };

  const handleCustomDonationAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCustomDonationAmount(value === "" ? "" : Number(value));
    setFormData(prev => ({
      ...prev,
      donationAmount: value === "" ? 0 : Number(value)
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === "mobileNumber" ? (value === "" ? "" : Number(value)) : value 
    }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validatePrivatePersonForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const updatedFormData = {
      ...formData,
      signatureType,
      donationAmount: donationAmount.value === "OPTIONAL" ? customDonationAmount || 0 : donationAmount.value,
      mobileNumber: Number(formData.mobileNumber),
    };

    navigate("/payment", { state: updatedFormData });
  };

  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        className={styles.privateDonationForm.formContainer}
      >
        <div className="">
          <div className={styles.privateDonationForm.buttonContainer}>
            <input
              type="button"
              className={`${styles.privateDonationForm.button} ${
                signatureType === "become-monthly-donor"
                  ? styles.privateDonationForm.activeButton
                  : "bg-transparent"
              }`}
              value="BECOME A MONTHLY DONOR"
              onClick={() => handleButtonClick("become-monthly-donor")}
            />
            <input
              type="button"
              className={`${styles.privateDonationForm.button} w-full ${
                signatureType === "give-a-gift"
                  ? styles.privateDonationForm.activeButton
                  : "bg-transparent"
              }`}
              value="Give a Gift"
              onClick={() => handleButtonClick("give-a-gift")}
            />
          </div>
          {(signatureType === "become-monthly-donor" ||
            signatureType === "give-a-gift") && (
            <DonationAmountOptions
              donationAmount={donationAmount}
              handleDonationAmountClick={handleDonationAmountClick}
            />
          )}
          {donationMessages[donationAmount.value] && (
            <div className={styles.privateDonationForm.donationMessageContainer}>
              <p className="mt-4">{donationMessages[donationAmount.value]}</p>
              {donationAmount.value === "OPTIONAL" && (
                <div className="mt-4">
                  <input
                    className={styles.privateDonationForm.customDonationInput}
                    type="text"
                    placeholder="Enter optional amount"
                    onChange={handleCustomDonationAmountChange}
                    value={customDonationAmount}
                  />
                </div>
              )}
            </div>
          )}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
            value={formData.fullName}
            onChange={handleInputChange}
            className={styles.privateDonationForm.inputField}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address*"
            required
            value={formData.email}
            onChange={handleInputChange}
            className={styles.privateDonationForm.inputField}
          />
          <p>We would like to thank you!</p>
          <input
            type="number"
            name="mobileNumber"
            placeholder="Mobile Number*"
            // value={formData.mobileNumber}
            onChange={handleInputChange}
            required
            className={styles.privateDonationForm.inputField}
          />
          {formErrors.email && (
            <p className={styles.privateDonationForm.errorMessage}>
              {formErrors.email}
            </p>
          )}
          {formErrors.mobileNumber && (
            <p className={styles.privateDonationForm.errorMessage}>
              {formErrors.mobileNumber}
            </p>
          )}
          {formErrors.personalNumber && (
            <p className={styles.privateDonationForm.errorMessage}>
              {formErrors.personalNumber}
            </p>
          )}
          <div className={styles.privateDonationForm.checkboxContainer}>
            <div className={styles.privateDonationForm.checkboxLabel}>
              <input
                type="checkbox"
                name="checkedForTaxReduction"
                id="tax-reduction"
                onChange={(event) => setFormData({
                  ...formData,
                  checkedForTaxReduction: event.target.checked,
                })}
                checked={formData.checkedForTaxReduction}
              />
              <label>I want tax reduction (not required)</label>
            </div>
            <FontAwesomeIcon
              icon={faInfoCircle}
              className={styles.privateDonationForm.infoIcon}
              onClick={() =>
                Swal.fire({
                  title: "Information",
                  text: "Information about tax reduction",
                  icon: "info",
                  confirmButtonText: "Close",
                })
              }
            />
          </div>
          {formData.checkedForTaxReduction && (
            <div>
              <p>
                Thank you for choosing to support us! To send you the tax reduction, we need your personal number.
              </p>
              <input
                type="number"
                name="personalNumber"
                placeholder="Personal Number"
                value={formData.personalNumber}
                onChange={handleInputChange}
                className={styles.privateDonationForm.personalNumberContainer}
              />
            </div>
          )}
        </div>
        <button
          className={styles.privateDonationForm.submitButton}
          type="submit"
        >
          <FontAwesomeIcon icon={faHeart} />
          <span>To Payment ({donationAmount.display})</span>
        </button>
      </form>
    </div>
  );
}
