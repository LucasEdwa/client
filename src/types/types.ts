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

export type TNavigation = {
  id: number;
  title: string;
  link: string;
  dropdownItems?: { id: number; title: string; link: string }[];
};
//Hero 1
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
//Hero 2
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
//Project Page
export type TProject = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
};
//Donation Page
export type TPrivateDonationFormData = {
  donationType: "private";
  fullName: string;
  email: string;
  mobileNumber: number;
  checkedForTaxReduction: boolean;
  personalNumber?: number;
  donationAmount?: number;
  signatureType: string;
};

export type TCompanyDonationFormData = {
  donationType: "company";
  companyRegistrationNumber: string;
  companyEmail: string;
  companyFirstName: string;
  companyLastName: string;
  companyMobileNumber: number;
  donationAmount: number;
  signatureType: string;
};

export type TStripePaymentData = {
  paymentMethod: "swish" | "card";
  swishNumber?: number;
  paymentMethodId?: string;
  userId?: number|string;
} & (TPrivateDonationFormData | TCompanyDonationFormData);

export type TDonationMessages = {
  [key: string]: string;
};

export type TDonationMessageGenerator = (
  amount: string,
  amountMessage: string
) => string;

export type TDonationAmount = {
  value: number | "OPTIONAL";
  display: string;
};

export type TDonationAmountOptionsProps = {
  donationAmount: TDonationAmount;
  handleDonationAmountClick: (amount: TDonationAmount) => void;
};
//Donation Page
export type TDonationContent = {
  title: string;
  description: string;
  privatePersonLabel: string;
  companyLabel: string;
};
//Contact Page
export type TContact = {
  description: string;
  phone: string;
  address: string;
  options: Array<string>;
};
//Partners Page
export type TPartner = {
  name: string;
  logo: string;
};

export type TPartnersContent = {
  title: string;
  description: string;
  partners: TPartner[];
};
//About Page
export type TGoal = {
  title: string;
  description: string;
  type: "nature" | "housing" | "welfare" | "context";
};

export type TAboutContent = {
  mainTitle: string;
  goals: {
    natureConservation: TGoal;
    affordableHousing: TGoal;
    communityWelfare: TGoal;
    context: TGoal;
  };
};
//Gift Shopping Page
export type TShopItem = {
  id: number;
  name: string;
  price: number;
  currency: string;
  image: string;
  description?: string;
};

export type TGiftShoppingContent = {
  title: string;
  description: string;
  itemsPerPage: number;
  totalItems: number;
  items: TShopItem[];
};

//Auth Page
export type TAuthPage = {
  title: string;
  subtitle: string;
  loginTab: string;
  registerTab: string;
  forgotPasswordText: string;
  socialLogin: {
    googleText: string;
    facebookText: string;
  };
  formLabels: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
  };
  buttons: {
    login: string;
    register: string;
    forgotPassword: string;
  };
};
//User Page
export type TDonation = {
  id: number;
  amount: number;
  date: string;
  paymentMethod: "swish" | "card";
  signatureType: string;
  isCompanyDonation: boolean;
  project: string;
  status: "completed" | "pending" | "failed";
  // Company specific fields
  companyRegistrationNumber?: string;
  companyEmail?: string;
  companyFirstName?: string;
  companyLastName?: string;
  companyMobileNumber?: string;
  // Private person specific fields
  fullName?: string;
  email?: string;
  mobileNumber?: string;
  checkedForTaxReduction?: boolean;
  personalNumber?: string;
};

export type TUserPageContent = {
  user: {
    fullName: string;
    email: string;
    phone: string;
    mobile: string;
    address: string;
    profileImage?: string;
  };  donations: TDonation[];

};
export type TPayment = {
  donationType: "private" | "company";
  signatureType: string;
  donationAmount: number;
  paymentMethod: "swish" | "card";
  swishNumber?: number;
  paymentMethodId?: string;
  userId?: string;
  // Private donation specific fields
  fullName?: string;
  email?: string;
  mobileNumber?: string;
  personalNumber?: number;
  checkedForTaxReduction?: boolean;
  // Company donation specific fields
  companyRegistrationNumber?: number;
  companyEmail?: string;
  companyFirstName?: string;
  companyLastName?: string;
  companyMobileNumber?: number;
  // Additional fields for QR code and mobile detection
  showQRCode?: boolean;
  isMobile?: boolean;
};

export type TSignatureType = "become-monthly-donor" | "give-a-gift";

export type TPrivateDonationFormProps = {
  formData: TPrivateDonationFormData;
  setFormData: React.Dispatch<React.SetStateAction<TPrivateDonationFormData>>;
}
