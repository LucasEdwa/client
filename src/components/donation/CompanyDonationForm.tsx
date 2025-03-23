import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { TCompanyDonationFormData, TDonationMessages, TFormErrors } from "../../types/types";
import { styles } from "../../constants/styles";

const generateDonationMessage = (amount: string, amountMessage: string) =>
  `Every month your ${amount} kr ${amountMessage}. As donor you give hopp to Gambias communite to continue healing and growing to a better place on earth.`;

const donationMessages: TDonationMessages = {
  "10000 KR": generateDonationMessage("10000", "support mothers in Gambia by providing 10-15 reusable diapers, a sustainable option for low-income families"),
  "40000 KR": generateDonationMessage("40000", "supply a mother with approximately 800g of milk powder, along with a baby bottle to support infant nutrition"),
  "OPTIONAL": generateDonationMessage("optional", "donation could cover 4 to 10 basic school textbooks in Gambia, focusing on core subjects like math, language, and science"),
};

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
    <div>
      <form
        onSubmit={handleFormSubmit}
        className={styles.companyDonationForm.formContainer}
      >
        <div className="space-y-5">
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
          <div className="flex gap-1 mt-4">
            {["10000 KR", "40000 KR", "OPTIONAL"].map((amount) => (
              <input
                className={`${styles.companyDonationForm.button} ${
                  donationAmount === amount ? styles.companyDonationForm.activeButton : "bg-transparent"
                }`}
                key={amount}
                type="button"
                value={amount}
                onClick={() => handleDonationAmountClick(amount)}
              />
            ))}
          </div>
          {donationMessages[donationAmount] && (
            <div className={styles.companyDonationForm.donationMessageContainer}>
              <p className="mt-4">{donationMessages[donationAmount]}</p>
              {donationAmount === "OPTIONAL" && (
                <div className="mt-4">
                  <input
                    className={styles.companyDonationForm.customDonationInput}
                    type="text"
                    placeholder="type your donation amount"
                    onChange={handleCustomDonationAmountChange}
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
            <span>To Payment ({donationAmount})</span>
          </button>
        </div>
      </form>
    </div>
  );
}
