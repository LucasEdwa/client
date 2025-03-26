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
const PHONE_PATTERN = /^\d{8,15}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REG_NUMBER_PATTERN = /^\d{6}-\d{4}$/;

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
   * Includes special handling for mobile number to enforce max length
   */
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const sanitizedValue = sanitizeInput(value);

    // Special handling for mobile number to enforce max length
    if (name === 'companyMobileNumber') {
      const numericValue = sanitizedValue.replace(/[^0-9]/g, '');
      if (numericValue.length > 15) return;
    }

    // Special handling for organization number format
    if (name === 'companyRegistrationNumber') {
      const numericValue = sanitizedValue.replace(/[^0-9]/g, '');
      if (numericValue.length > 10) return;
      
      // Format as xxxxxx-xxxx
      if (numericValue.length >= 6 && numericValue.length <= 10) {
        const formattedValue = `${numericValue.slice(0, 6)}-${numericValue.slice(6)}`;
        setFormData(prev => ({
          ...prev,
          [name]: formattedValue,
        }));
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  }, [sanitizeInput, setFormData]);

  /**
   * Handles custom donation amount input
   * Validates and formats the amount, enforcing min/max limits
   */
  const handleCustomDonationAmountChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9.]/g, '');
    
    if ((value.match(/\./g) || []).length > 1) return;

    if (value === "") {
      setCustomDonationAmount("");
      setFormData(prev => ({
        ...prev,
        donationAmount: 0
      }));
      return;
    }

    const numericValue = parseFloat(value);
    
    if (!isNaN(numericValue)) {
      const validatedAmount = Math.max(1, Math.min(numericValue, 1000000));
      const formattedAmount = validatedAmount.toFixed(2);
      
      setCustomDonationAmount(formattedAmount);
      setFormData(prev => ({
        ...prev,
        donationAmount: validatedAmount
      }));
    }
  }, [setFormData]);

  /**
   * Validates all form fields according to business rules
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

    // Name validations with max length
    if (!formData.companyFirstName) {
      errors.companyFirstName = "First name is required";
    } else if (formData.companyFirstName.length > 50) {
      errors.companyFirstName = "First name is too long (max 50 characters)";
    }

    if (!formData.companyLastName) {
      errors.companyLastName = "Last name is required";
    } else if (formData.companyLastName.length > 50) {
      errors.companyLastName = "Last name is too long (max 50 characters)";
    }

    // Mobile number validation
    if (!formData.companyMobileNumber) {
      errors.companyMobileNumber = "Mobile number is required";
    } else if (!PHONE_PATTERN.test(formData.companyMobileNumber)) {
      errors.companyMobileNumber = "Invalid mobile number format (8-15 digits)";
    }

    return errors;
  }, [formData]);

  /**
   * Handles form submission
   * Validates form data, processes donation amount, and navigates to payment
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
          donationAmount: "Please enter a valid donation amount greater than 0"
        }));
        return;
      }

      const formDataToSubmit = {
        ...formData,
        donationAmount: numericDonationAmount,
        signatureType,
        donationType: "company",
        email: formData.companyEmail,
        fullName: `${formData.companyFirstName.trim()} ${formData.companyLastName.trim()}`,
        mobileNumber: formData.companyMobileNumber
      };

      const sanitizedFormData = {
        ...formDataToSubmit,
        companyEmail: sanitizeInput(formDataToSubmit.companyEmail),
        companyFirstName: sanitizeInput(formDataToSubmit.companyFirstName),
        companyLastName: sanitizeInput(formDataToSubmit.companyLastName),
        companyMobileNumber: sanitizeInput(formDataToSubmit.companyMobileNumber),
        companyRegistrationNumber: sanitizeInput(formDataToSubmit.companyRegistrationNumber)
      };

      navigate("/payment", { state: sanitizedFormData });
    } catch (error) {
      setFormErrors(prev => ({
        ...prev,
        submission: "An error occurred while submitting the form. Please try again."
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
   * Resets custom amount when switching to optional amount
   */
  const handleDonationAmountClick = useCallback((amount: string) => {
    setDonationAmount(amount);
    if (amount === "OPTIONAL") {
      setCustomDonationAmount("");
      setFormData(prev => ({
        ...prev,
        donationAmount: 0
      }));
    }
  }, [setFormData]);

  /**
   * Formats numeric input values to 2 decimal places
   */
  const formatInputValue = useCallback((value: string): string => {
    if (!value) return '';
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return '';
    return numericValue.toFixed(2);
  }, []);


  // Memoized UI elements
  const submitButtonContent = useMemo(() => (
    isSubmitting ? 'Submitting...' : (
      <span className="flex items-center gap-2">
        <FontAwesomeIcon icon={faHeart} />
        <span>To Payment ({donationAmount})</span>
      </span>
    )
  ), [isSubmitting, donationAmount]);

  return (
    <div className={styles.companyDonationForm.formWrapper}>
      <form
        onSubmit={handleFormSubmit}
        className={styles.companyDonationForm.formContainer}
        role="form"
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
                    type="text"
                    placeholder="type your donation amount"
                    onChange={handleCustomDonationAmountChange}
                    value={formatInputValue(customDonationAmount)}
                  />
                 
                </div>
              )}
            </div>
          )}
          <div className={styles.companyDonationForm.organizationNumberWrapper}>
            <div className={styles.companyDonationForm.organizationNumberInputContainer}>
              <input
                type="text"
                name="companyRegistrationNumber"
                placeholder="xxxxxx-xxxx (Organization Number)"
                required
                onChange={handleInputChange}
                maxLength={11}
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
                maxLength={50}
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
                maxLength={50}
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
                maxLength={15}
                className={styles.companyDonationForm.inputField}
              />
            </div>
          </div>
          <div className={styles.companyDonationForm.errorContainer}>
            {Object.entries(formErrors).map(([key, error]) => (
              <p key={key} className={styles.companyDonationForm.errorMessage}>
                {error}
              </p>
            ))}
          </div>
          <button
            className={`${styles.companyDonationForm.submitButton} ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            type="submit"
            disabled={isSubmitting}
          >
            {submitButtonContent}
          </button>
        </div>
      </form>
    </div>
  );
}
