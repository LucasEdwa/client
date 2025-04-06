/**
 * PrivateDonationForm Component
 * 
 * Handles the donation form for private individuals, including:
 * - Monthly donor registration
 * - One-time gift donations
 * - Tax reduction processing
 * - Form validation and submission
 */

import React, { useState, useCallback, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { TPrivateDonationFormProps, TFormErrors, TSignatureType } from "../../types/types";
import { styles } from "../../constants/styles";
import { donationMessages } from "../../constants/donationMessages";
import DonationAmountOptions from "../../hooks/DonationAmountOptions";

// Validation patterns for form fields
const PHONE_PATTERN = /^\d{8,15}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PERSONAL_NUMBER_PATTERN = /^\d{12}$/;

export default function PrivateDonationForm({
  formData,
  setFormData,
}: TPrivateDonationFormProps) {
  // State management for form fields and UI
  const [signatureType, setSignatureType] = useState<TSignatureType>("become-monthly-donor");
  const [donationAmount, setDonationAmount] = useState("100 KR");
  const [customDonationAmount, setCustomDonationAmount] = useState("");
  const [formErrors, setFormErrors] = useState<TFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  /**
   * Sanitizes input by removing potentially dangerous characters
   * @param input - The string to sanitize
   * @returns Sanitized string
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
    if (name === 'mobileNumber') {
      const numericValue = sanitizedValue.replace(/[^0-9]/g, '');
      if (numericValue.length > 15) return;
    }

    setFormData({
      ...formData, // Merge existing form data
      [name]: sanitizedValue, // Update only the changed field
    });
  }, [sanitizeInput, setFormData, formData]);

  /**
   * Handles custom donation amount input
   * Validates and formats the amount, enforcing min/max limits
   * Automatically enables tax reduction for amounts over 10,000 KR
   */
  const handleCustomDonationAmountChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9.]/g, '');
    
    if ((value.match(/\./g) || []).length > 1) return;

    if (value === "") {
      setCustomDonationAmount("");
      setFormData({
        ...formData,
        donationAmount: 0,
      });
      return;
    }

    const numericValue = parseFloat(value);
    
    if (!isNaN(numericValue)) {
      const validatedAmount = Math.max(1, Math.min(numericValue, 1000000));
      const formattedAmount = validatedAmount.toFixed(2);
      
      setCustomDonationAmount(formattedAmount);
      setFormData({
        ...formData,
        donationAmount: validatedAmount,
        ...(validatedAmount > 10000 && { checkedForTaxReduction: true }),
      });
    }
  }, [setFormData, formData]);

  /**
   * Handles tax reduction checkbox changes
   * Shows warning if trying to disable tax reduction for amounts over 10,000 KR
   */
  const handleCheckboxChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setFormData(prev => ({
      ...prev,
      checkedForTaxReduction: isChecked
    }));

    if (!isChecked && typeof formData.donationAmount === 'number' && formData.donationAmount > 10000) {
      Swal.fire({
        title: "Warning",
        text: "Donations over 10,000 KR require tax declaration. You cannot proceed without it.",
        icon: "warning",
        confirmButtonText: "OK"
      }).then(() => {
        setFormData(prev => ({
          ...prev,
          checkedForTaxReduction: true
        }));
      });
    }
  }, [formData.donationAmount, setFormData]);

  /**
   * Validates all form fields according to business rules
   * @returns Object containing validation errors
   */
  const validatePrivatePersonForm = useCallback((): TFormErrors => {
    const errors: TFormErrors = {};
    
    // Email validation
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!EMAIL_PATTERN.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    // Mobile number validation (8-15 digits)
    if (!formData.mobileNumber) {
      errors.mobileNumber = "Mobile number is required";
    } else if (!PHONE_PATTERN.test(formData.mobileNumber)) {
      errors.mobileNumber = "Invalid mobile number format (8-15 digits)";
    }

    // Full name validation
    if (!formData.fullName) {
      errors.fullName = "Full name is required";
    } else if (formData.fullName.length < 2) {
      errors.fullName = "Full name must be at least 2 characters";
    }

    // Personal number validation for tax reduction (12 digits)
    if (formData.checkedForTaxReduction) {
      if (!formData.personalNumber) {
        errors.personalNumber = "Personal number is required for tax reduction";
      } else if (!PERSONAL_NUMBER_PATTERN.test(formData.personalNumber)) {
        errors.personalNumber = "Invalid personal number format (12 digits)";
      }
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
      const errors = validatePrivatePersonForm();
      
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      // Process donation amount
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

      // Prepare form data for submission
      const formDataToSubmit = {
        ...formData,
        donationAmount: numericDonationAmount,
        signatureType,
        donationType: "private",
      };

      // Sanitize all form data before submission
      const sanitizedFormData = {
        ...formDataToSubmit,
        fullName: sanitizeInput(formDataToSubmit.fullName),
        email: sanitizeInput(formDataToSubmit.email),
        mobileNumber: sanitizeInput(formDataToSubmit.mobileNumber),
        personalNumber: formDataToSubmit.personalNumber ? sanitizeInput(formDataToSubmit.personalNumber) : undefined
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
  }, [isSubmitting, validatePrivatePersonForm, donationAmount, customDonationAmount, formData, signatureType, sanitizeInput, navigate]);

  /**
   * Handles signature type selection (monthly donor or gift)
   */
  const handleButtonClick = useCallback((button: TSignatureType) => {
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
    }
  }, []);

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
        <span>Payment</span>
      </span>
    )
  ), [isSubmitting]);

  const showDonationOptions = useMemo(() => (
    signatureType === "become-monthly-donor" || signatureType === "give-a-gift"
  ), [signatureType]);

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
          {showDonationOptions && (
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
                    type="text"
                    placeholder="Enter optional amount"
                    onChange={handleCustomDonationAmountChange}
                    value={formatInputValue(customDonationAmount)}
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
            placeholder="name@example.com*"
            required
            value={formData.email}
            onChange={handleInputChange}
            className={styles.privateDonationForm.inputField}
          />
          <p>We would like to thank you!</p>
          <input
            type="number"
            name="mobileNumber"
            placeholder="0719045402*"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            required
            maxLength={15}
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
                checked={formData.checkedForTaxReduction}
                onChange={handleCheckboxChange}
                disabled={formData.donationAmount ? formData.donationAmount > 10000 : false}
              />
              <label className="text-xs">
                {formData.donationAmount && formData.donationAmount > 10000
                  ? "Tax declaration is required for donations over 10,000 KR"
                  : "I want tax reduction (not required)"}
              </label>
            </div>
            <FontAwesomeIcon
              icon={faInfoCircle}
              className={styles.privateDonationForm.infoIcon}
              onClick={() =>
                Swal.fire({
                  title: "Information",
                  text: "For donations over 10,000 KR, tax declaration is mandatory. This helps us provide you with the necessary documentation for your tax return.",
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
                  maxLength={12}
                  className={styles.privateDonationForm.personalNumberContainer}
                />
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${styles.privateDonationForm.submitButton} ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {submitButtonContent}
        </button>
      </form>
    </div>
  );
}
