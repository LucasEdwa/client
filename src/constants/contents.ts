import { THeroMain,THero2,TDonationContent,TProject,TContact,TAuthPage, TAboutContent, TGiftShoppingContent, TPartnersContent, TUserPageContent } from "../types/types";

export const ProjectsContent: TProject[] = [
  {
    id: 1,
    title: "Organic farm",
    description: "We are building an organic farm in Gambia.",
    image: "src/assets/hero1.jpg",
    link: "/projects/1",
  },
  {
    id: 2,
    title: "School",
    description: "We are building a school in Gambia.",
    image: "src/assets/hero2.jpg",
    link: "/projects/2",
  },
  {
    id: 3,
    title: "Clinic",
    description: "We are building a clinic in Gambia.",
    image: "src/assets/hero3.jpg",
    link: "/projects/3",
  },
];

export const NavbarContent = [
    {
        id: 1,
        title: "Home",
        link: "/",
    },
    {
        id: 2,
        title: "Projects",    
        dropdownItems: ProjectsContent.map(project => ({
            id: project.id,
            title: project.title,
            link: project.link
        })),
    },
    {
        id: 3,
        title: "About",
        link: "/about",
    },
    {
        id: 4,
        title: "Contact",
        link: "/contact",
    },
    {
        id: 5,
        title: "Donate",
        link: "/donation",
    },
    {
        id: 6,
        title: "Login",
        link: "/auth",
    },
    {
        id: 7,
        title: "Partners",
        link: "/partners",
    },
    {
        id: 8,
        title: "Gift Shopping",
        link: "/gift-shopping",
    },
    {
        id: 9,
        title: "User",
        link: "/user",
    },
];

export type TNavigation = {
  id: number;
  title: string;
  link: string;
  dropdownItems?: { id: number; title: string; link: string }[];
};

export const HeroMain: THeroMain = {
  title: "For all in Gambia",
  description: "We are a non-profit organization that aims to help the people of Gambia.",
  image: "src/assets/carousel1.jpg",
  link: "/projects",
  heroCard: {
    title: "Our Projects",
    description: "We have a number of projects that are aimed at helping the people of Gambia.",
    image: "src/assets/hero1.jpg",
    link: "/projects",
  },
  textContent: {
    heading1: "Organic farm - sustainable - community",
    heading2: "Help our community grow,",
    heading3: "we are worth it!",
    buttonText: "GIVE A GIFT",
    buttonLink: "/donate",
    article: {
      description: "Welcome to Boraba, a dynamic hub nestled in the heart of The Gambia's Central River Region. Home to approximately 1500 residents, Boraba is more than just a community; it's a melting pot of cultures and traditions, where diverse ethnic groups thrive in perfect harmony, creating a tapestry of unity and resilience.",
      linkText: "Find out more",
      link: "/projects/2",
    },
  },
};

export const Hero2Content: THero2 = {
  news: [
    { text: "Read about what we do in Gambia", link: "/projects" },
    { text: "Become a world contributor!", link: "/donate" },
    { text: "Our partners", link: "/partners" },
  ],
  image: "src/assets/hero2.jpg",
  content: {
    heading1: "Purchase a craft tool directly from Gambia",
    heading2: "to build schools for children",
    paragraphs: [
      "When you buy a craft tool from our gift shop, you help us to purchase materials for building schools in Boraba.",
      "We are a non-profit organization that helps Gambias society to inclusion and education for all children.",
      "Come and join us in our mission to build a better future for the children.",
    ],
    buttonText: "Buy on our gift shop",
    buttonLink: "/gift-shopping",
  },
};

export const DonationContent: TDonationContent = {
  title: "Support Brick by Brick International work!",
  description: "By helping Brick by Brick International, you are helping to build a better future for the family in Uganda, show that there is still hope and you are capable to make a difference in the world.",
  privatePersonLabel: "Private person",
  companyLabel: "Company",
};

export const contactContent: TContact = {
  description: "At the same time, the fact that we are wholly owned and totally independent from manufacturer and other group control gives you confidence that we will only recommend what is right for you.",
  phone: "0151 475 4450",
  address: "282 Kevin Brook, Imogeneborough, CA 58517",
  options: ["I'm a donor", "I'm a volunteer", "I'm a partner"]
};

export const authContent: TAuthPage = {
  title: "Welcome Back",
  subtitle: "Please enter your details to sign in",
  loginTab: "Login",
  registerTab: "Register",
  forgotPasswordText: "Forgot your password?",
  socialLogin: {
    googleText: "Sign in with Google",
    facebookText: "Sign in with Facebook"
  },
  formLabels: {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    name: "Full Name"
  },
  buttons: {
    login: "Sign in",
    register: "Create Account",
    forgotPassword: "Reset Password"
  }
};

export const AboutContent: TAboutContent = {
  mainTitle: "Our Goals",
  goals: {
    natureConservation: {
      title: "Nature Conservation and Economic Sustainability",
      description: "Our goal is for Gambia and Africa to maintain sustainable development through the wise use of natural resources. We strive to live in harmony with nature and improve both humanity and our ecosystems. By utilizing environmentally friendly materials such as bamboo, an alternative to wood, we reduce deforestation and promote sustainable industrial development.",
      type: "nature"
    },
    affordableHousing: {
      title: "Affordable Housing for All",
      description: "We promote housing that is affordable for families with varying economic conditions, including housing for very low, low, and middle-income households. Making housing affordable is crucial to ensuring that everyone has access to safe and stable housing.",
      type: "housing"
    },
    communityWelfare: {
      title: "Housing Stress and Community Welfare",
      description: "Economic stress from housing costs affects access to other necessities of life. Our goals include not only affordability but also creating an inclusive, fair, and sustainable community development. With government support, we can use bamboo to combat climate change, protect biodiversity, and promote sustainable building practices.",
      type: "welfare"
    },
    context: {
      title: "Context and Collaboration",
      description: "Stable, affordable, and accessible housing linked to health, justice, and community support services is crucial for enabling independent living. It improves life opportunities related to family, work, education, and leisure. Our housing goals are seen in this broader context.",
      type: "context"
    }
  },
};

export const GiftShoppingContent: TGiftShoppingContent = {
  title: "Product Collection",
  description: "Support our cause by purchasing handcrafted items directly from Gambia. Each purchase helps fund our community projects.",
  itemsPerPage: 4,
  totalItems: 40,
  items: [
    {
      id: 1,
      name: "Traditional Craft",
      price: "£24.00 GBP",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80",
      description: "Handmade by local artisans"
    },
    // ... add more items
  ]
};

export const PartnersContent: TPartnersContent = {
  title: "Our Partners",
  description: "Working together to make a difference in Gambia",
  partners: [
    { name: "Partner 1", logo: "https://via.placeholder.com/150" },
    { name: "Partner 2", logo: "https://via.placeholder.com/150" },
    { name: "Partner 3", logo: "https://via.placeholder.com/150" },
    { name: "Partner 4", logo: "https://via.placeholder.com/150" },
    { name: "Partner 5", logo: "https://via.placeholder.com/150" },
  ]
};

export const userContent: TUserPageContent = {
  user: {
    fullName: "Kenneth Valdez",
    email: "fip@jukmuh.al",
    phone: "(239) 816-9029",
    mobile: "(320) 380-4539",
    address: "Bay Area, San Francisco, CA",
    profileImage:    "https://bootdey.com/img/Content/avatar/avatar7.png",

  },
  donations: [
    {
      id: 1,
      amount: 1000,
      date: "2024-03-20",
      paymentMethod: "card",
      signatureType: "public",
      isCompanyDonation: false,
      project: "Nature Conservation",
      status: "completed",
      fullName: "Kenneth Valdez",
      email: "fip@jukmuh.al",
      mobileNumber: "(320) 380-4539"
    },
    {
      id: 2,
      amount: 500,
      date: "2024-03-15",
      paymentMethod: "swish",
      signatureType: "anonymous",
      isCompanyDonation: true,
      project: "Affordable Housing",
      status: "completed",
      companyRegistrationNumber: "123456",
      companyEmail: "contact@acme.com",
      companyFirstName: "John",
      companyLastName: "Doe",
      companyMobileNumber: "(555) 123-4567"
    },
    {
      id: 3,
      amount: 750,
      date: "2024-03-10",
      paymentMethod: "card",
      signatureType: "public",
      isCompanyDonation: false,
      project: "Community Welfare",
      status: "completed",
      fullName: "Kenneth Valdez",
      email: "fip@jukmuh.al",
      mobileNumber: "(320) 380-4539"
    },
    {
      id: 4,
      amount: 2000,
      date: "2024-03-25",
      paymentMethod: "card",
      signatureType: "public",
      isCompanyDonation: false,
      project: "Context Development",
      status: "pending",
      fullName: "Kenneth Valdez",
      email: "fip@jukmuh.al",
      mobileNumber: "(320) 380-4539"
    }
  ]
}; 