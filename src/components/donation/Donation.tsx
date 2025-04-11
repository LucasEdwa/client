import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { setDonationType, setPrivateFormData, setCompanyFormData } from "../../redux/donationSlice";
import PrivateDonationForm from "./PrivateDonationForm";
import CompanyDonationForm from "./CompanyDonationForm";
import hero1 from "../../assets/img_donation.jpeg";
import { DonationContent } from "../../constants/contents";
import { styles } from "../../constants/styles";
import { TPrivateDonationFormData, TCompanyDonationFormData } from "../../types/types";

export default function Donation() {
  const dispatch = useDispatch();
  const { donationType, privateFormData, companyFormData } = useSelector((state: RootState) => state.donation);
  const { theme } = useSelector((state: RootState) => state.theme);

  const handleDonationTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDonationType(event.target.value as "private" | "company"));
  };

  const handlePrivateFormDataChange = (updatedData: React.SetStateAction<TPrivateDonationFormData>) => {
    if (typeof updatedData === "function") {
      dispatch(setPrivateFormData(updatedData(privateFormData)));
    } else {
      dispatch(setPrivateFormData(updatedData));
    }
  };

  const handleCompanyFormDataChange = (updatedData: React.SetStateAction<TCompanyDonationFormData>) => {
    if (typeof updatedData === "function") {
      dispatch(setCompanyFormData(updatedData(companyFormData)));
    } else {
      dispatch(setCompanyFormData(updatedData));
    }
  };

  return (
    <div className={`${styles.donation.container} `}>
      <img src={hero1} alt="hero" className={styles.donation.image} />
      <div className={`${styles.donation.contentContainer} ${theme.text} ${theme.background}`}>
        <h1 className={`${styles.donation.title} ${theme.text}`}>{DonationContent.title}</h1>
        <p className={`${styles.donation.description} ${theme.text}`}>{DonationContent.description}</p>
        <div className={styles.donation.formContainer}>
          <div className={styles.donation.radioGroup}>
            <h1 className="text-xs p-2">Donate as:</h1>
            <input
              type="radio"
              id="private-person"
              name="donation"
              value="private"
              onChange={handleDonationTypeChange}
              checked={donationType === "private"}
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
              checked={donationType === "company"}
              className=""
            />
            <label htmlFor="company" className={styles.donation.radioLabel}>
              Company
            </label>
          </div>
          {donationType === "private" && (
            <PrivateDonationForm
              formData={privateFormData}
              setFormData={handlePrivateFormDataChange}
            />
          )}
          {donationType === "company" && (
            <CompanyDonationForm
              formData={companyFormData}
              setFormData={handleCompanyFormDataChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}