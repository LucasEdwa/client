/**
 * CompanyDonationForm Component
 * 
 * Handles the donation form for companies, including:
 * - Company gift donations
 * - Form validation and submission
 * - Organization number validation
 * - Contact person information
 */

import React, { useState, useCallback, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { TCompanyDonationFormData, TFormErrors } from "../../types/types";
import { styles } from "../../constants/styles";
import { companyDonationMessages } from "../../constants/donationMessages";
import CompanyDonationAmountOptions from "../../hooks/CompanyDonationAmountOptions";

// Validation patterns for form fields
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REG_NUMBER_PATTERN = /^\d{6}-\d{4}$/;

export default function CompanyDonationForm({
  formData,
  setFormData,
}: {
  formData: TCompanyDonationFormData;
  setFormData: React.Dispatch<React.SetStateAction<TCompanyDonationFormData>>;
}) {
  const [signatureType, setSignatureType] = useState("gift-donation");
  const [donationAmount, setDonationAmount] = useState("10000 KR");
  const [customDonationAmount, setCustomDonationAmount] = useState("");
  const [formErrors, setFormErrors] = useState<TFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  /**
   * Sanitizes input by removing potentially dangerous characters
   */
  const sanitizeInput = useCallback((input: string): string => {
    return input.replace(/[<>]/g, '');
  }, []);

  /**
   * Handles input changes for all form fields
   */
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const sanitizedValue = sanitizeInput(value);

    setFormData({
      ...formData,
      [name]: sanitizedValue,
    });
  }, [sanitizeInput, setFormData, formData]);

  /**
   * Handles custom donation amount input
   */
  const handleCustomDonationAmountChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, '');

    if (value === "") {
      setCustomDonationAmount("");
      setFormData({
        ...formData,
        donationAmount: 0,
      });
      return;
    }

    const numericValue = parseInt(value, 10);

    if (!isNaN(numericValue)) {
      const validatedAmount = Math.max(1, Math.min(numericValue, 1000000));
      setCustomDonationAmount(validatedAmount.toString());
      setFormData({
        ...formData,
        donationAmount: validatedAmount,
      });
    }
  }, [setFormData, formData]);

  /**
   * Validates all form fields
   */
  const validateCompanyForm = useCallback((): TFormErrors => {
    const errors: TFormErrors = {};

    // Organization number validation
    if (!formData.companyRegistrationNumber) {
      errors.companyRegistrationNumber = "Organization number is required";
    } else if (!REG_NUMBER_PATTERN.test(formData.companyRegistrationNumber)) {
      errors.companyRegistrationNumber = "Invalid format. Use xxxxxx-xxxx";
    }

    // Email validation
    if (!formData.companyEmail) {
      errors.companyEmail = "Company email is required";
    } else if (!EMAIL_PATTERN.test(formData.companyEmail)) {
      errors.companyEmail = "Invalid email format";
    }

    // Contact person name validation
    if (!formData.companyFirstName || !formData.companyLastName) {
      errors.contactPerson = "Contact person name is required";
    }

    return errors;
  }, [formData]);

  /**
   * Handles form submission
   */
  const handleFormSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const errors = validateCompanyForm();

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      const numericDonationAmount =
        donationAmount === "OPTIONAL"
          ? parseFloat(customDonationAmount || "0")
          : parseFloat(donationAmount.replace(" KR", ""));

      if (isNaN(numericDonationAmount) || numericDonationAmount <= 0) {
        setFormErrors(prev => ({
          ...prev,
          donationAmount: "Please enter a valid donation amount greater than 0",
        }));
        return;
      }

      const formDataToSubmit = {
        ...formData,
        donationAmount: numericDonationAmount,
        signatureType,
        donationType: "company",
      };

      const sanitizedFormData = {
        ...formDataToSubmit,
        companyEmail: sanitizeInput(formDataToSubmit.companyEmail),
        companyFirstName: sanitizeInput(formDataToSubmit.companyFirstName),
        companyLastName: sanitizeInput(formDataToSubmit.companyLastName),
        companyRegistrationNumber: sanitizeInput(formDataToSubmit.companyRegistrationNumber),
      };

      navigate("/payment", { state: sanitizedFormData });
    } catch (error) {
      setFormErrors(prev => ({
        ...prev,
        submission: "An error occurred while submitting the form. Please try again.",
      }));
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, validateCompanyForm, donationAmount, customDonationAmount, formData, signatureType, sanitizeInput, navigate]);

  /**
   * Handles signature type selection
   */
  const handleButtonClick = useCallback((button: string) => {
    setSignatureType(button);
  }, []);

  /**
   * Handles donation amount selection
   */
  const handleDonationAmountClick = useCallback((amount: string) => {
    setDonationAmount(amount);
    if (amount === "OPTIONAL") {
      setCustomDonationAmount("");
    }
  }, []);

  // Memoized UI elements
  const submitButtonContent = useMemo(() => (
    isSubmitting ? 'Submitting...' : (
      <span className="flex items-center gap-2">
        <FontAwesomeIcon icon={faHeart} />
        <span>Payment</span>
      </span>
    )
  ), [isSubmitting]);

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
                signatureType === "gift-donation"
                  ? styles.companyDonationForm.activeButton
                  : "bg-transparent"
              }`}
              value="Gift Donation"
              onClick={() => handleButtonClick("gift-donation")}
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
            name="companyFirstName"
            placeholder="Contact Person First Name"
            required
            value={formData.companyFirstName}
            onChange={handleInputChange}
            className={styles.companyDonationForm.inputField}
          />
          <input
            type="text"
            name="companyLastName"
            placeholder="Contact Person Last Name"
            required
            value={formData.companyLastName}
            onChange={handleInputChange}
            className={styles.companyDonationForm.inputField}
          />
          <input
            type="email"
            name="companyEmail"
            placeholder="Company Email"
            required
            value={formData.companyEmail}
            onChange={handleInputChange}
            className={styles.companyDonationForm.inputField}
          />
          <input
            type="text"
            name="companyRegistrationNumber"
            placeholder="Organization Number (xxxxxx-xxxx)"
            required
            value={formData.companyRegistrationNumber}
            onChange={handleInputChange}
            className={styles.companyDonationForm.inputField}
          />
          {Object.entries(formErrors).map(([key, error]) => (
            <p key={key} className={styles.companyDonationForm.errorMessage}>
              {error}
            </p>
          ))}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${styles.companyDonationForm.submitButton} ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {submitButtonContent}
        </button>
      </form>
    </div>
  );
}
