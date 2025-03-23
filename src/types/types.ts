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
export type TContact = {
  description: string;
  phone: string;
  address: string;
  options: Array<string>;
};

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

export type TPartner = {
  name: string;
  logo: string;
};

export type TPartnersContent = {
  title: string;
  description: string;
  partners: TPartner[];
};

export type TGoal = {
  title: string;
  description: string;
  type: 'nature' | 'housing' | 'welfare' | 'context';
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

export type TShopItem = {
  id: number;
  name: string;
  price: string;
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
export type TUser = {
  id: number;
  fullname?: string;
  email: string;
  password: string;
  mobileNumber?: string;
  checkedForTaxReduction?: boolean;
  personalNumber?: string;
  companyRegistrationNumber?: string;
  companyEmail?: string;
  companyFirstName?: string;
  companyLastName?: string;
  companyMobileNumber?: string;
  donationAmount?: number | string;
  signatureType?: string;
};
