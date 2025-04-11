import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { TCompanyDonationFormData, TDonationMessages, TFormErrors, TDonationAmount } from "../../types/types";
import { styles } from "../../constants/styles";
import CompanyDonationAmountOptions from "../../hooks/CompanyDonationAmountOptions";
import { useNavigate } from "react-router";

const generateDonationMessage = (amount: number, amountMessage: string) =>
  `Every month your ${amount} kr ${amountMessage}. As donor you give hope to Gambia's community to continue healing and growing to a better place on earth.`;

const donationMessages: TDonationMessages = {
  10000: generateDonationMessage(10000, "support mothers in Gambia by providing 10-15 reusable diapers, a sustainable option for low-income families"),
  40000: generateDonationMessage(40000, "supply a mother with approximately 800g of milk powder, along with a baby bottle to support infant nutrition"),
  OPTIONAL: generateDonationMessage(0, "donation could cover 4 to 10 basic school textbooks in Gambia, focusing on core subjects like math, language, and science"),
};

const validateCompanyForm = (formData: TCompanyDonationFormData) => {
  const errors: TFormErrors = {};
  if (!formData.companyRegistrationNumber)
    errors.companyRegistrationNumber = "Organization number is required";
  if (!formData.companyEmail)
    errors.companyEmail = "Company email is required";
  if (!formData.companyFirstName)
    errors.companyFirstName = "First name is required";
  if (!formData.companyLastName)
    errors.companyLastName = "Last name is required";
  if (!formData.companyMobileNumber)
    errors.companyMobileNumber = "Mobile number is required";
  return errors;
};

export default function CompanyDonationForm({
  formData,
  setFormData,
}: {
  formData: TCompanyDonationFormData;
  setFormData: React.Dispatch<React.SetStateAction<TCompanyDonationFormData>>;
}) {
  const navigate = useNavigate();
  const [signatureType, setSignatureType] = useState("ge-en-gava");
  const [donationAmount, setDonationAmount] = useState<TDonationAmount>({
    value: 10000,
    display: "10000"
  });
  const [customDonationAmount, setCustomDonationAmount] = useState<number | "">("");
  const [formErrors, setFormErrors] = useState<TFormErrors>({});

  const handleButtonClick = (button: string) => {
    setSignatureType(button);
  };

  const handleDonationAmountClick = useCallback((amount: TDonationAmount) => {
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
  }, [setFormData]);

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
      [name]: name === "companyMobileNumber" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateCompanyForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const updatedFormData = {
      ...formData,
      signatureType,
      donationAmount: donationAmount.display === "OPTIONAL" ? customDonationAmount || 0 : donationAmount.value,
    };

    navigate("/payment", { state: updatedFormData });
  };

  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        className={styles.companyDonationForm.formContainer}
      >
        <div className="">
          <div className={styles.companyDonationForm.buttonContainer}>
            <input
              type="button"
              className={`${styles.companyDonationForm.button} ${
                signatureType === "ge-en-gava"
                  ? styles.companyDonationForm.activeButton
                  : "bg-transparent"
              }`}
              value="Gift"
              onClick={() => handleButtonClick("ge-en-gava")}
            />
          </div>
          <CompanyDonationAmountOptions
            donationAmount={donationAmount}
            handleDonationAmountClick={handleDonationAmountClick}
          />
          {donationMessages[donationAmount.value] && (
            <div className={styles.companyDonationForm.donationMessageContainer}>
              <p className="">{donationMessages[donationAmount.value]}</p>
              {donationAmount.display === "OPTIONAL" && (
                <div className="mt-4">
                  <input
                    className={styles.companyDonationForm.customDonationInput}
                    type="number"
                    placeholder="type your donation amount"
                    onChange={handleCustomDonationAmountChange}
                    value={customDonationAmount}
                  />
                </div>
              )}
            </div>
          )}
          <div >
            <label htmlFor="companyRegistrationNumber">
              Organization Number*
            </label>
            <div className="flex space-x-2">
              <input
                type="search"
                name="companyRegistrationNumber"
                placeholder="xxxxxx-xxxx"
                required
                value={formData.companyRegistrationNumber}
                onChange={handleInputChange}
                className={styles.companyDonationForm.inputField}
              />
            </div>
          </div>
          <div className={styles.companyDonationForm.customInputHolder}>
            <label htmlFor="companyEmail">Company Email*</label>
            <input
              type="email"
              name="companyEmail"
              required
              value={formData.companyEmail}
              onChange={handleInputChange}
              className={styles.companyDonationForm.inputField}
            />
          </div>
          <div>
            <label>Person to contact</label>
            <p>
              Your contact information in case we need to reach you regarding
              your order.
            </p>
          </div>
          <div className={styles.companyDonationForm.contactInfo}>
            <div className={styles.companyDonationForm.customInputHolder}>
              <label htmlFor="companyFirstName">First Name*</label>
              <input
                type="text"
                name="companyFirstName"
                required
                value={formData.companyFirstName}
                onChange={handleInputChange}
                className={styles.companyDonationForm.inputField}
              />
            </div>
            <div className={styles.companyDonationForm.customInputHolder}>
              <label htmlFor="companyLastName">Last Name*</label>
              <input
                type="text"
                name="companyLastName"
                required
                value={formData.companyLastName}
                onChange={handleInputChange}
                className={styles.companyDonationForm.inputField}
              />
            </div>
            <div className={styles.companyDonationForm.customInputHolder}>
              <label htmlFor="companyMobileNumber">Mobile*</label>
              <input
                type="text"
                name="companyMobileNumber"
                required
                value={formData.companyMobileNumber}
                onChange={handleInputChange}
                className={styles.companyDonationForm.inputField}
              />
            </div>
          </div>
          {Object.keys(formErrors).map((key) => (
            <p key={key} className={styles.companyDonationForm.errorMessage}>
              {formErrors[key]}
            </p>
          ))}
          <button
            className={styles.companyDonationForm.submitButton}
            type="submit"
          >
            <FontAwesomeIcon icon={faHeart} />
            <span>To Payment ({donationAmount.display})</span>
          </button>
        </div>
      </form>
    </div>
  );
}
