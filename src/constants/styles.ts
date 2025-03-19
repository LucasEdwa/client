import { IThemes } from "../models/ITheme";

export const colors = {
  primary: "red-900", // Deep red
  secondary: "pink-100", // Soft pink
  accent: "yellow-500", // Gold
  text: {
    primary: "text-red-200", // Deep gray
    secondary: "text-gray-600", // Medium gray
  },
  background: {
    primary: "bg-gradient-to-b from-red-500 via-blue-500 to-green-500", // Include the 'bg-' prefix
    secondary: "bg-gradient-to-b from-green-500 via-blue-500 to-red-500", // Light pink
  },
};

// Theme definitions
export const themes: IThemes = {
  primary: {
    background: colors.background.primary, // Using "bg-pink-500/30"
    text: colors.text.primary, // Using text color from colors
    subText: colors.text.primary, // Using text color from colors
    button: `inline-block hover:scale-105 w-full text-start bg-transparent  px-2 py-1 rounded-full hover:opacity-90 transition-all cursor-pointer w-fit ${colors.text.primary}`,
    nav: {
      container: `w-full ${colors.background.primary} p-4`, // Updated background color and consistent padding
      holder: "flex justify-between items-center w-full", // Ensure title and menu icon are on the same level
      themeButtonContainer: "flex justify-end items-end", // Theme button container
      themeButton: `bg-transparent text-red-900 px-2 py-1 rounded-full hover:opacity-90 transition-all cursor-pointer`, // Theme button
      brandLink: `hover:rounded-xl p-1  transition-all ${colors.text.primary}`, // Brand link
      menuButton: `text-2xl ${colors.text.primary}`, // Menu button
      dropdownMenu: `flex flex-col p-4 absolute gap-2 left-0 w-full z-40 mt-4 ${colors.background.primary}`, // Updated dropdown menu style
      dropdownItems: "flex flex-col px-5 w-full text-left", // Updated dropdown items container style
      dropdownItem: `text-xs hover:rounded-xl p-1 hover:scale-105 w-full  ${colors.text.primary}`, // Using text color from colors
      link: `hover:opacity-80 transition-all hover:scale-105 p-1 rounded-xl ${colors.text.primary}`, // Using text color from colors
      mobileLinks: "flex flex-col gap-4 mt-4", // Mobile links style
      sideMenu: `fixed top-0 left-0 h-full w-64 ${colors.background.primary} p-4 z-50 transition-transform transform -translate-x-full`, // Slide in from left
      closeButton: `absolute top-4 right-4 text-2xl ${colors.text.primary}`,
    },
    donation: {
      container: "lg:flex items-center mb-32 justify-center p-4",
      contentContainer: "lg:w-[29rem] xs:w-[100%] px-2 py-4 lg:m-4 text-white shadow-lg lg:rounded-2xl z-10",
      title: "text-xl font-bold",
      description: "text-xs",
      radioGroup: "flex items-center gap-2",
      radioLabel: "text-sm",
      image: "lg:w-1/2 xs:w-full lg:h-[30rem] xs:h-[10rem] object-cover p-4 lg:absolute right-0",
      background: colors.background.primary,
    },
  },
  secondary: {
    background: colors.background.secondary, // Using "bg-pink-500/30"
    text: colors.text.secondary, // Using text color from colors
    subText: colors.text.secondary, // Using text color from colors
    button: `inline-block bg-pink-100 hover:bg-pink-400 w-full text-start bg-transparent  px-2 py-1 rounded-full hover:opacity-90 transition-all cursor-pointer w-fit ${colors.text.secondary}`,
    nav: {
      container: `w-full ${colors.background.secondary} p-4`, // Updated background color and consistent padding
      holder: "flex justify-between items-center w-full", // Ensure title and menu icon are on the same level
      themeButtonContainer: "flex justify-end items-end", // Theme button container
      themeButton: `bg-transparent text-red-900 px-2 py-1 rounded-full hover:opacity-90 transition-all cursor-pointer`, // Theme button
      brandLink: `hover:rounded-xl p-1  transition-all ${colors.text.secondary}`, // Brand link
      menuButton: `text-2xl ${colors.text.secondary}`, // Menu button
      dropdownMenu: `flex flex-col p-4 absolute gap-2 left-0 w-full z-40 mt-4 ${colors.background.secondary}`, // Updated dropdown menu style
      dropdownItems: "flex flex-col px-5 w-full text-left", // Updated dropdown items container style
      dropdownItem: `text-xs hover:rounded-xl p-1 hover:bg-pink-400 w-full  ${colors.text.secondary}`, // Using text color from colors
      link: `hover:opacity-80 transition-all hover:bg-pink-400 p-1 rounded-xl ${colors.text.secondary}`, // Using text color from colors
      mobileLinks: "flex flex-col gap-4 mt-4", // Mobile links style
      sideMenu: `fixed top-0 left-0 h-full w-64 ${colors.background.secondary} p-4 z-50 transition-transform transform -translate-x-full`, // Slide in from left
      closeButton: `absolute top-4 right-4 text-2xl ${colors.text.secondary}`,
    },
    donation: {
      container: "lg:flex items-center mb-32 justify-center p-4",
      contentContainer: "lg:w-[29rem] xs:w-[100%] px-2 py-4 text-white shadow-lg lg:rounded-2xl z-10",
      title: "text-xl font-bold",
      description: "text-xs",
      radioGroup: "flex items-center gap-2",
      radioLabel: "text-sm",
      image: "lg:w-1/2 xs:w-full lg:h-[30rem] xs:h-[10rem] object-cover p-4 lg:absolute right-0",
        background: colors.background.secondary
    },
  },

};

export const styles = {
  hero1: {
    container: "w-full relative",
    image: "h-[350px] lg:h-[680px] w-full object-cover",
    contentContainer:
      "flex flex-col xl:flex-row justify-center xl:absolute lg:justify-between items-center top-10 left-35 xl:top-40 xl:left-90 p-4 items-start xl:items-end",
    textContainer:
      "text-left hover:scale-101 w-fit  gap-2 flex flex-col absolute xl:relative top-30 xl:transform xl:-translate-x-1/2 xl:-translate-y-1/2",
    heading1:
      "text-black p-1 text-sm bg-green-600 xl:text-4xl font-semibold italic",
    heading2: "bg-green-600 text-black text-sm xl:text-4xl italic",
    heading3: "bg-yellow-400 text-black text-sm xl:text-4xl",
    buttonContainer: "py-2 px-4 bg-red-500 w-fit",
    button:
      "text-sm no-underline py-2 px-4 bg-red-700 transition-all ease-in-out duration-100 shine-effect",
    articleContainer:
      "lg:w-1/3 lg:p-4 flex justify-center xl:justify-end text-black bg-opacity-100 rounded-lg text-lg",
    article:
      "overflow-hidden rounded-lg border w-full xl:mt-0 mt-10 border-gray-100 bg-white shadow-sm",
    articleContent: "p-4 sm:p-6",
    articleImage: "w-full object-cover",
    articleText: "lg:text-sm text-xs mt-2",
    articleLink:
      "group inline-flex items-center gap-1 text-sm font-medium text-blue-600",
    articleLinkIcon: "block transition-all group-hover:ms-0.5 rtl:rotate-180",
  },
  hero2: {
    container:
      "lg:py-4 xl:py-8 w-full flex flex-col  items-center justify-center gap-4",
    shadowContainer: "w-full shadow-slate-200 shadow-inner ",
    textContainer:
      "items-center justify-center text-black text-lg font-medium text-center lg:gap-4 lg:my-5",
    newsContainer:
      "lg:flex lg:ml-2 sx:flex-col p-2 mb-6 justify-center items-center ",
    newsItem: "flex gap-2 p-0 lg:p-4 items-center",
    newsIcon: "flex items-center",
    newsLink:
      "text-black lg:text-lg text-xs no-underline hover:text-blue-500 hover:underline",
    imageContainer:
      "lg:flex xs:flex-col text-left justify-center items-center gap-4 ",
    image: "w-full h-64 object-cover",
    contentContainer: "flex flex-col gap-8 p-4 w-full",
    heading1:
      "text-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold w-fit",
    heading2:
      "text-xl bg-gradient-to-r mt-2 from-blue-500 to-purple-500 text-white font-bold w-fit",
    paragraph: "text-sm font-medium",
    buttonContainer: "border-t p-3 border-green-600 hover:blu border-b w-max",
    button: "bg-red-800 hover:bg-red-600 p-1 my-1 no-underline text-white",
  },
  donation: {
    container: "lg: mb-32  p-4 relative",
    contentContainer:
      "lg:w-[29rem] rounded-2xl  items-center lg:absolute z-20 top-4 left-0 justify-center xs:w-[100%] px-2 py-4 lg:m-4 bg-gradient-to-b from-red-500 via-blue-500 to-green-500 text-white shadow-lg lg:rounded-2xl ",
    title: "text-4xl font-bold",
    formContainer: "flex flex-col m-0",
    description: "text-xl",
    radioGroup: "flex items-center gap-2",
    radioLabel: "text-sm",
    image:
"w-full lg:h-[40rem] xs:h-[10rem] object-cover  p-4  right-0 top-0",  },
  privateDonationForm: {
    formContainer: "w-full max-w-md mx-auto xs:px-0 lg:px-5 lg:pb-5 shadow-md",
    buttonContainer: "flex w-full",
    button: "p-2 border-2 text-center cursor-pointer",
    activeButton: "bg-blue-700 border-none",
    donationMessageContainer: "mt-4",
    customDonationInput:
      "w-full p-2 bg-transparent border-b-2 border-white placeholder-white",
    inputField: "w-full p-2 mt-1 border bg-gray-700 border-gray-300 rounded",
    errorMessage: "error bg-red-400/60 p-2 rounded-full",
    checkboxContainer: "flex justify-between items-center space-x-2",
    checkboxLabel: "flex items-center space-x-2",
    infoIcon: "cursor-pointer text-white text-xl",
    personalNumberContainer:
      "w-full p-2 mt-1 border border-gray-300 text-gray-900 rounded",
    submitButton:
      "w-full p-2 mt-1 bg-blue-500 text-white rounded cursor-pointer transition-colors duration-300 hover:bg-blue-700 flex items-center justify-center space-x-2",
  },
  companyDonationForm: {
    formContainer: "w-full max-w-md mx-auto p-5 shadow-md font-sans",
    buttonContainer: "flex w-full",
    button: "w-full p-2 border-2 text-center cursor-pointer",
    activeButton: "bg-blue-700",
    donationMessageContainer: "mt-4",
    customInputHolder: "flex flex-col  gap-2 items-left",
    customDonationInput:
      "w-full p-2 bg-transparent border-b-2 border-white placeholder-white",
    inputField: "w-full p-2 mt-1 border bg-gray-700 border-gray-300 rounded",
    errorMessage: "error bg-red-400/60 p-2 rounded-full",
    label: "block",
    contactInfo: "space-y-5",
    submitButton:
      "w-full p-2 mt-1 bg-blue-500 text-white rounded cursor-pointer transition-colors duration-300 hover:bg-blue-700 flex items-center justify-center space-x-2",
  },
  footer: {
    container: "bg-gray-900 text-white py-8 px-4",
    content: "max-w-7xl mx-auto flex flex-wrap justify-between",
    section: "w-full sm:w-1/3 mb-4",
    heading: "text-xl font-bold mb-2",
    text: "text-sm",
    socialIcons: "flex space-x-4",
    icon: "bg-gray-700 p-2 rounded-full",
    bottom: "mt-4 text-center",
  },
};

// Media query breakpoints
export const breakpoints = {
  xs: "480px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};
