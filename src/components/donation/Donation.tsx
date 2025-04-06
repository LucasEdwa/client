import React, { useReducer } from "react";
import PrivateDonationForm from "./PrivateDonationForm";
import CompanyDonationForm from "./CompanyDonationForm";
import hero1 from "../../assets/img_donation.jpeg";
import { DonationContent } from "../../constants/contents";
import { useTheme } from "../../contexts/ThemeContext";
import { styles } from "../../constants/styles";
import { DonetionReducer, initialState, DonationActionTypes } from "../../reducers/donationReducer";
import { TPrivateDonationFormData, TCompanyDonationFormData } from "../../types/types";

export default function Donation() {
  const [state, dispatch] = useReducer(DonetionReducer, initialState);
  const { theme } = useTheme();

  const handleDonationTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: DonationActionTypes.SET_DONATION_TYPE,
      payload: { donationType: event.target.value as "private" | "company" },
    });
  };

  const setPrivateFormData = (updatedData: Partial<TPrivateDonationFormData>) => {
    dispatch({
      type: DonationActionTypes.SET_PRIVATE_FORM_DATA,
      payload: updatedData,
    });
  };

  const setCompanyFormData = (updatedData: Partial<TCompanyDonationFormData>) => {
    dispatch({
      type: DonationActionTypes.SET_COMPANY_FORM_DATA,
      payload: updatedData,
    });
  };

  return (
    <div className={`${styles.donation.container}`}>
      <img src={hero1} alt="hero" className={styles.donation.image} />
      <div className={`${styles.donation.contentContainer} ${theme.background}`}>
        <h1 className={styles.donation.title}>{DonationContent.title}</h1>
        <p className={styles.donation.description}>{DonationContent.description}</p>
        <div className={styles.donation.formContainer}>
          <div className={styles.donation.radioGroup}>
            <h1 className="text-xs p-2">Donate as:</h1>
            <input
              type="radio"
              id="private-person"
              name="donation"
              value="private"
              onChange={handleDonationTypeChange}
              checked={state.donationType === "private"}
              className="text-xs"
            />
            <label htmlFor="private-person" className={styles.donation.radioLabel}>
              Private Person
            </label>
            <input
              type="radio"
              id="company"
              name="donation"
              value="company"
              onChange={handleDonationTypeChange}
              checked={state.donationType === "company"}
              className=""
            />
            <label htmlFor="company" className={styles.donation.radioLabel}>
              Company
            </label>
          </div>
          {state.donationType === "private" && (
            <PrivateDonationForm
              formData={state.privateFormData}
              setFormData={(value) =>
                typeof value === "function"
                  ? setPrivateFormData(value(state.privateFormData))
                  : setPrivateFormData(value)
              } // Wrap to match expected type
            />
          )}
          {state.donationType === "company" && (
            <CompanyDonationForm
              formData={state.companyFormData}
              setFormData={
                (value)=>
                  typeof value === "function"
                    ? setCompanyFormData(value(state.companyFormData))
                    : setCompanyFormData(value)

              } // Wrap to match expected type
            />
          )}
        </div>
      </div>
    </div>
  );
}