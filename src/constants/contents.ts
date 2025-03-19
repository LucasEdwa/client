import { THeroMain,THero2,TDonationContent,TProject } from "../types/types";

export const NavbarContent = [
    {
        id: 1,
        title: "Home",
        link: "/",
    },
    {
        id: 2,
        title: "About",    
        link: "/about",
    },
    {
        id: 3,
        title: "Our Projects",
        link: "/projects",
        dropdownItems: [
            { id: 1, title: "Action", link: "#" },
            { id: 2, title: "Another action", link: "#" },
            { id: 3, title: "Something else here", link: "#" },
        ],
    },
    {
        id: 4,
        title: "Contact",
        link: "/contact",
    },
    {
        id: 5,
        title: "Donate",
        link: "/blog",
    },
];

export type TNavigation = {
  id: number;
  title: string;
  link: string;
  dropdownItems?: { id: number; title: string; link: string }[];
};

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

export const HeroMain: THeroMain = {
  title: "For all in Gambia",
  description: "We are a non-profit organization that aims to help the people of Gambia.",
  image: "src/assets/hero1.jpeg",
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
  title: "Stötta Bio's Brick by Brick Internations arbete!",
  description: "By helping Brick by Brick International, you are helping to build a better future for the family in Uganda, show that there is still hope and you are capable to make a difference in the world.",
  privatePersonLabel: "Private person",
  companyLabel: "Company",
};