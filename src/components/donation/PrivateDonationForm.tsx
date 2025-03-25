import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { TPrivateDonationFormData, TFormErrors } from "../../types/types";
import { styles } from "../../constants/styles";
import { donationMessages } from "../../constants/donationMessages";
import DonationAmountOptions from "../../hooks/DonationAmountOptions";

export default function PrivateDonationForm({
  formData,
  setFormData,
}: {
  formData: TPrivateDonationFormData;
  setFormData: React.Dispatch<React.SetStateAction<TPrivateDonationFormData>>;
}) {
  const [signatureType, setSignatureType] = useState("become-monthly-donor");
  const [donationAmount, setDonationAmount] = useState("100 KR");
  const [customDonationAmount, setCustomDonationAmount] = useState("");
  const [formErrors, setFormErrors] = useState<TFormErrors>({});
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      checkedForTaxReduction: event.target.checked,
    });
  };

  const validatePrivatePersonForm = () => {
    const errors: TFormErrors = {};
    if (!formData.email) errors.email = "Email is required";
    if (!formData.mobileNumber) errors.mobileNumber = "Mobile number is required";
    if (formData.checkedForTaxReduction && !formData.personalNumber) {
      errors.personalNumber = "Personal number is required for tax reduction";
    }
    return errors;
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validatePrivatePersonForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      const numericDonationAmount =
        donationAmount === "OPTIONAL"
          ? customDonationAmount || "0"
          : parseInt(donationAmount.replace(" KR", ""), 10);

      navigate("/payment", {
        state: {
          ...formData,
          donationAmount: numericDonationAmount,
          signatureType,
          donationType: "private",
        },
      });
    }
  };

  const handleButtonClick = (button: string) => {
    setSignatureType(button);
  };

  const handleDonationAmountClick = (amount: string) => {
    setDonationAmount(amount);
    if (amount === "OPTIONAL") {
      setCustomDonationAmount("");
    }
  };

  return (
    <div className={styles.privateDonationForm.formWrapper}>
      <form
        onSubmit={handleFormSubmit}
        className={styles.privateDonationForm.formContainer}
      >
        <div className={styles.privateDonationForm.formContent}>
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
          {donationMessages[donationAmount] && (
            <div className={styles.privateDonationForm.donationMessageContainer}>
              <p className={styles.privateDonationForm.donationMessageWrapper}>
                {donationMessages[donationAmount]}
              </p>
              {donationAmount === "OPTIONAL" && (
                <div className={styles.privateDonationForm.customDonationWrapper}>
                  <input
                    className={styles.privateDonationForm.customDonationInput}
                    type="number"
                    placeholder="Enter optional amount"
                    onChange={(e) => setCustomDonationAmount(e.target.value)}
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
            value={formData.mobileNumber}
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
                onChange={handleCheckboxChange}
              />
              <label className="text-xs">I want tax reduction (not required)</label>
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
            <div className={styles.privateDonationForm.taxReductionWrapper}>
              <p className={styles.privateDonationForm.taxReductionMessage}>
                Thank you for choosing to support us! To send you the tax reduction, we need your personal number.
              </p>
              <div className={styles.privateDonationForm.taxReductionInputWrapper}>
                <input
                  type="number"
                  name="personalNumber"
                  placeholder="Personal Number"
                  value={formData.personalNumber}
                  onChange={handleInputChange}
                  className={styles.privateDonationForm.personalNumberContainer}
                />
              </div>
            </div>
          )}
        </div>
        <button
          className={styles.privateDonationForm.submitButton}
          type="submit"
        >
          <FontAwesomeIcon icon={faHeart} />
          <span>To Payment ({donationAmount})</span>
        </button>
      </form>
    </div>
  );
}
