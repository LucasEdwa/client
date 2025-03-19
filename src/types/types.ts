export type TNavigation = {
  id: number;
  title: string;
  link: string;
  dropdownItems?: { id: number; title: string; link: string }[];
  
};

export type THeroMain = {
  title: string;
  description: string;
  image: string;
  link: string;
  heroCard: {
    title: string;
    description: string;
    image: string;
    link: string;
  };
  textContent: {
    heading1: string;
    heading2: string;
    heading3: string;
    buttonText: string;
    buttonLink: string;
    article: {
      description: string;
      linkText: string;
      link: string;
    };
  };
};

export type THero2 = {
  news: { text: string; link: string }[];
  image: string;
  content: {
    heading1: string;
    heading2: string;
    paragraphs: string[];
    buttonText: string;
    buttonLink: string;
  };
};
export type TProject = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
};

export type TPrivateDonationFormData = {
  fullName: string;
  email: string;
  mobileNumber: string;
  checkedForTaxReduction: boolean;
  personalNumber?: string;
  donationAmount?: number | string;
  signatureType: string;
};

export type TCompanyDonationFormData = {
  companyRegistrationNumber: string;
  companyEmail: string;
  companyFirstName: string;
  companyLastName: string;
  companyMobileNumber: string;
  donationAmount: number | string;
  signatureType: string;
};

export type TDonationMessages = {
  [key: string]: string;
};

export type TDonationMessageGenerator = (
  amount: string,
  amountMessage: string
) => string;

export type TDonationAmountOptionsProps = {
  donationAmount: string;
  handleDonationAmountClick: (amount: string) => void;
};

export type TFormErrors = {
  email?: string;
  mobileNumber?: string;
  personalNumber?: string;
  companyRegistrationNumber?: string;
  companyEmail?: string;
  companyFirstName?: string;
  companyLastName?: string;
  companyMobileNumber?: string;
  [key: string]: string | undefined;
};

export type TDonationContent = {
  title: string;
  description: string;
  privatePersonLabel: string;
  companyLabel: string;
};
