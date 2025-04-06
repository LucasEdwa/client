import {
  THeroMain,
  THero2,
  TDonationContent,
  TProject,
  TContact,
  TAuthPage,
  TAboutContent,
  TGiftShoppingContent,
  TPartnersContent,
  TUserPageContent,
} from "../types/types";
export const ProjectsContent: TProject[] = [
  {
    id: 1,
    title: "Organic Farm",
    description:
      "In the heart of Gambia, we are cultivating more than just crops — we are sowing the seeds of resilience, dignity, and self-sufficiency. Our organic farm project is a vibrant effort to reconnect communities with the land, using sustainable and eco-friendly farming practices that protect the environment while nourishing families. This initiative not only addresses food insecurity by providing fresh, chemical-free produce, but also creates local jobs, supports women and youth empowerment, and serves as a learning center for regenerative agriculture. It’s a place where hope grows alongside every plant, and where the soil becomes a source of strength for future generations.",
    image: "src/assets/hero1.jpg",
    link: "/projects/1",
  },
  {
    id: 2,
    title: "Education for All",
    description:
      "Education is the key to unlocking a brighter future, and our school project in Gambia is built on that belief. We are constructing a safe, inclusive, and inspiring learning environment where every child has the opportunity to dream, discover, and develop their full potential. With a focus on quality education, equal access, and creative learning, the school will provide not just academic knowledge, but also life skills and emotional support. We aim to empower young minds, uplift families, and foster a culture of lifelong learning. This is more than a school—it’s a beacon of hope where futures are written, one lesson at a time.",
    image: "src/assets/hero2.jpg",
    link: "/projects/2",
  },
  {
    id: 3,
    title: "Community Health Clinic",
    description:
      "Health is the foundation of a thriving community, and our mission is to ensure that no one in Gambia is left behind when it comes to essential care. We are building a welcoming, fully equipped community health clinic that will offer compassionate, life-saving services to people of all ages. From maternal care and childhood vaccinations to disease prevention and health education, the clinic is designed to meet the urgent and ongoing needs of the region. Staffed by dedicated professionals and supported by local partnerships, it will stand as a symbol of care, dignity, and unity. Here, every patient will be seen, heard, and treated with the respect they deserve—because everyone deserves the chance to live a healthy, fulfilling life.",
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
    dropdownItems: ProjectsContent.map((project) => ({
      id: project.id,
      title: project.title,
      link: project.link,
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
  description:
    "We are a non-profit organization that aims to help the people of Gambia.",
  image: "src/assets/carousel1.jpg",
  link: "/projects",
  heroCard: {
    title: "Our Projects",
    description:
      "We have a number of projects that are aimed at helping the people of Gambia.",
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
      description:
        "Welcome to Boraba, a dynamic hub nestled in the heart of The Gambia's Central River Region. Home to approximately 1500 residents, Boraba is more than just a community; it's a melting pot of cultures and traditions, where diverse ethnic groups thrive in perfect harmony, creating a tapestry of unity and resilience.",
      linkText: "Find out more",
      link: "/project/1",
    },
  },
};

export const Hero2Content: THero2 = {
  news: [
    { text: "Read about what we do in Gambia", link: "/about" },
    { text: "Become a world contributor!", link: "/donation" },
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
  description:
    "By helping Brick by Brick International, you are helping to build a better future for the family in Uganda, show that there is still hope and you are capable to make a difference in the world.",
  privatePersonLabel: "Private person",
  companyLabel: "Company",
};

export const contactContent: TContact = {
  description:
    "At the same time, the fact that we are wholly owned and totally independent from manufacturer and other group control gives you confidence that we will only recommend what is right for you.",
  phone: "0151 475 4450",
  address: "282 Kevin Brook, Imogeneborough, CA 58517",
  options: ["I'm a donor", "I'm a volunteer", "I'm a partner"],
};

export const authContent: TAuthPage = {
  title: "Welcome Back",
  subtitle: "Please enter your details to sign in",
  loginTab: "Login",
  registerTab: "Register",
  forgotPasswordText: "Forgot your password?",
  socialLogin: {
    googleText: "Sign in with Google",
    facebookText: "Sign in with Facebook",
  },
  formLabels: {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    name: "Full Name",
  },
  buttons: {
    login: "Sign in",
    register: "Create Account",
    forgotPassword: "Reset Password",
  },
};

export const AboutContent: TAboutContent = {
  mainTitle: "Our Goals",
  goals: {
    natureConservation: {
      title: "Nature Conservation and Economic Sustainability",
      description:
        "Our goal is for Gambia and Africa to maintain sustainable development through the wise use of natural resources. We strive to live in harmony with nature and improve both humanity and our ecosystems. By utilizing environmentally friendly materials such as bamboo, an alternative to wood, we reduce deforestation and promote sustainable industrial development.",
      type: "nature",
    },
    affordableHousing: {
      title: "Affordable Housing for All",
      description:
        "We promote housing that is affordable for families with varying economic conditions, including housing for very low, low, and middle-income households. Making housing affordable is crucial to ensuring that everyone has access to safe and stable housing.",
      type: "housing",
    },
    communityWelfare: {
      title: "Housing Stress and Community Welfare",
      description:
        "Economic stress from housing costs affects access to other necessities of life. Our goals include not only affordability but also creating an inclusive, fair, and sustainable community development. With government support, we can use bamboo to combat climate change, protect biodiversity, and promote sustainable building practices.",
      type: "welfare",
    },
    context: {
      title: "Context and Collaboration",
      description:
        "Stable, affordable, and accessible housing linked to health, justice, and community support services is crucial for enabling independent living. It improves life opportunities related to family, work, education, and leisure. Our housing goals are seen in this broader context.",
      type: "context",
    },
  },
};

export const GiftShoppingContent: TGiftShoppingContent = {
  title: "Product Collection",
  description:
    "Support our cause by purchasing handcrafted items directly from Gambia. Each purchase helps fund our community projects.",
  itemsPerPage: 4,
  totalItems: 40,
  items: [
    {
      id: 1,
      name: "Traditional Craft",
      price: 24.0,
      currency: "kr",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80",
      description: "Handmade by local artisans",
    },
    {
      id: 2,
      name: "Traditional Craft",
      price: 24.0,
      currency: "kr",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80",
      description: "Handmade by local artisans",
    },
    {
      id: 3,
      name: "Traditional Craft",
      price: 24.0,
      currency: "kr",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80",
      description: "Handmade by local artisans",
    },
    {
      id: 4,
      name: "Traditional Craft",
      price: 24.0,
      currency: "kr",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80",
      description: "Handmade by local artisans",
    },
    {
      id: 5,
      name: "Traditional Craft",
      price: 24.0,
      currency: "kr",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80",
      description: "Handmade by local artisans",
    },
    {
      id: 6,
      name: "Traditional Craft",
      price: 24.0,
      currency: "kr",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80",
      description: "Handmade by local artisans",
    },
    {
      id: 7,
      name: "Traditional Craft",
      price: 24.0,
      currency: "kr",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80",
      description: "Handmade by local artisans",
    },
    {
      id: 8,
      name: "Traditional Craft",
      price: 24.0,
      currency: "kr",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80",
      description: "Handmade by local artisans",
    },
    {
      id: 9,
      name: "Traditional Craft",
      price: 24.0,
      currency: "kr",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80",
      description: "Handmade by local artisans",
    },
    {
      id: 10,
      name: "Traditional Craft",
      price: 24.0,
      currency: "kr",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80",
      description: "Handmade by local artisans",
    },
    {
      id: 11,
      name: "Traditional Craft",
      price: 24.0,
      currency: "kr",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80",
      description: "Handmade by local artisans",
    },
    {
      id: 12,
      name: "Traditional Craft",
      price: 24.0,
      currency: "kr",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80",
      description: "Handmade by local artisans",
    },
  ],
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
  ],
};

export const userContent: TUserPageContent = {
  user: {
    fullName: "Kenneth Valdez",
    email: "fip@jukmuh.al",
    phone: "(239) 816-9029",
    mobile: "(320) 380-4539",
    address: "Bay Area, San Francisco, CA",
    profileImage: "https://bootdey.com/img/Content/avatar/avatar7.png",
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
      mobileNumber: "(320) 380-4539",
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
      companyMobileNumber: "(555) 123-4567",
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
      mobileNumber: "(320) 380-4539",
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
      mobileNumber: "(320) 380-4539",
    },
  ],
};
