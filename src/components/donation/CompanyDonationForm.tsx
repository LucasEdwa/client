import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { TCompanyDonationFormData, TFormErrors } from "../../types/types";
import { styles } from "../../constants/styles";
import { companyDonationMessages } from "../../constants/donationMessages";
import CompanyDonationAmountOptions from "../../hooks/CompanyDonationAmountOptions";

export default function CompanyDonationForm({
  formData,
  setFormData,
}: {
  formData: TCompanyDonationFormData;
  setFormData: React.Dispatch<React.SetStateAction<TCompanyDonationFormData>>;
}) {
  const [signatureType, setSignatureType] = useState("ge-en-gava");
  const [donationAmount, setDonationAmount] = useState("10000 KR");
  const [customDonationAmount, setCustomDonationAmount] = useState("");
  const [formErrors, setFormErrors] = useState<TFormErrors>({});
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validateCompanyForm = () => {
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

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateCompanyForm();
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
          donationType: "company",
          email: formData.companyEmail,
          fullName: `${formData.companyFirstName} ${formData.companyLastName}`,
          mobileNumber: formData.companyMobileNumber
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

  const handleCustomDonationAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomDonationAmount(event.target.value);
  };

  return (
    <div className={styles.companyDonationForm.formWrapper}>
      <form
        onSubmit={handleFormSubmit}
        className={styles.companyDonationForm.formContainer}
      >
        <div className={styles.companyDonationForm.formContent}>
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
          {companyDonationMessages[donationAmount] && (
            <div className={styles.companyDonationForm.donationMessageContainer}>
              <p className={styles.companyDonationForm.donationMessageWrapper}>
                {companyDonationMessages[donationAmount]}
              </p>
              {donationAmount === "OPTIONAL" && (
                <div className={styles.companyDonationForm.customDonationWrapper}>
                  <input
                    className={styles.companyDonationForm.customDonationInput}
                    type="number"
                    placeholder="type your donation amount"
                    onChange={handleCustomDonationAmountChange}
                  />
                </div>
              )}
            </div>
          )}
          <div className={styles.companyDonationForm.organizationNumberWrapper}>
            <div className={styles.companyDonationForm.organizationNumberInputContainer}>
              <input
                type="number"
                name="companyRegistrationNumber"
                placeholder="xxxxxx-xxxx (Organization Number)"
                required
                onChange={handleInputChange}
                className={styles.companyDonationForm.inputField}
              />
            </div>
          </div>
          <div className={styles.companyDonationForm.inputHolder}>
            <input
              type="email"
              name="companyEmail"
              required
              onChange={handleInputChange}
              placeholder="company@example.com (Company Email)"
              className={styles.companyDonationForm.inputField}
            />
          </div>
          <div className={styles.companyDonationForm.contactPersonWrapper}>
            <label className={styles.companyDonationForm.contactPersonLabel}>
              Person to contact
            </label>
            <p className={styles.companyDonationForm.contactPersonDescription}>
              Your contact information in case we need to reach you regarding
              your order.
            </p>
          </div>
          <div className={styles.companyDonationForm.contactInfoWrapper}>
            <div className={styles.companyDonationForm.inputHolder}>
              <input
                type="text"
                name="companyFirstName"
                required
                onChange={handleInputChange}
                placeholder="First Name"
                className={styles.companyDonationForm.inputField}
              />
            </div>
            <div className={styles.companyDonationForm.inputHolder}>
              <input
                type="text"
                name="companyLastName"
                required
                onChange={handleInputChange}
                placeholder="Last Name"
                className={styles.companyDonationForm.inputField}
              />
            </div>
            <div className={styles.companyDonationForm.inputHolder}>
              <input
                type="number"
                name="companyMobileNumber"
                required
                onChange={handleInputChange}
                placeholder="Mobile Number"
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
            <span>To Payment ({donationAmount})</span>
          </button>
        </div>
      </form>
    </div>
  );
}
