import { IThemes } from "../models/ITheme";

export const colors = {
  primary: "red-900", // Deep red
  secondary: "pink-100", // Soft pink
  accent: "yellow-500", // Gold
  text: {
    primary: "text-red-200", // Deep gray
    secondary: "text-gray-400", // Medium gray
  },
  background: {
    primary: "bg-blue-500", // Include the 'bg-' prefix
    secondary: "bg-red-500", // Light pink
  },
};

// Theme definitions
export const themes: IThemes = {
  primary: {
    background: colors.background.primary,
    text: colors.text.primary,
    button: "bg-blue-600 text-white p-3 rounded-4xl w-1/2",
  },
  secondary: {
    background: colors.background.secondary,
    text: colors.text.secondary,
    button: "bg-pink-500 text-white p-3 rounded-4xl w-1/2",
  },
};

export const styles = {
  nav: {
    container: "w-full p-4",
    holder: "flex justify-between items-center w-full",
    themeButtonContainer: "flex justify-end items-end",
    themeButton: "bg-transparent pr-1 rounded-full hover:opacity-90 transition-all cursor-pointer",
    brandLink: "hover:rounded-xl p-1 transition-all",
    menuButton: "text-2xl",
    dropdownMenu: "flex flex-col p-4 absolute gap-2 text-left left-0 w-full z-40 mt-4",
    dropdownItems: "flex flex-col px-5 w-full text-left",
    dropdownItem: "text-xs hover:rounded-xl p-1 hover:scale-105 w-full text-left",
    link: "hover:opacity-80 transition-all hover:scale-105 p-1 rounded-xl text-left w-full",
    mobileLinks: "flex flex-col gap-4 mt-4",
    sideMenu: "fixed top-0 left-0 h-full w-64 p-4 z-50 transition-transform transform -translate-x-full",
    closeButton: "absolute top-4 right-4 text-2xl",
  },
  
  footer: {
    container: "py-8 px-4",
    content: "max-w-7xl mx-auto flex flex-wrap justify-between",
    section: "w-full sm:w-1/3 mb-4",
    heading: "text-xl font-bold mb-2",
    text: "text-sm",
    socialIcons: "flex space-x-4",
    icon: "bg-gray-700 p-2 rounded-full",
    bottom: "mt-4 text-center",
  },
  user: {
    container: "text-center",
    section: "flex flex-col items-center gap-4",
    aside: "w-full max-w-md mx-auto p-4 shadow-md",
    button: "p-3 rounded-4xl",
    avatar: "rounded-circle w-32 h-32",
    infoContainer: "mt-3",
    name: "text-xl font-semibold",
    role: "text-secondary mb-1",
    location: "text-muted font-size-sm",
    buttonContainer: "flex gap-2 mt-4",
    followButton: "p-2  text-white rounded hover:bg-blue-600 transition-colors",
    messageButton: "p-2 text-white rounded hover:bg-gray-600 transition-colors",
  },
  userPage: {
    container: "container",
    mainBody: "main-body",
    breadcrumb: "main-breadcrumb",
    row: "row gutters-sm",
    col: "col-md-4 mb-3",
    card: "card",
    cardBody: "card-body",
    progress: "progress mb-3",
    progressBar: "progress-bar bg-primary",
  },
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
      "lg:flex lg:ml-2 sx:flex-col p-8 mb-6 justify-center items-center ",
    newsItem: "flex gap-2 p-0 lg:p-4 items-center",
    newsIcon: "flex items-center",
    newsLink:
      "text-black lg:text-lg text-xs no-underline hover:text-blue-500 hover:underline",
    imageContainer:
      "lg:flex xs:flex-col text-left justify-center items-center p-4 gap-4 ",
    image: "w-full h-64 object-cover",
    contentContainer: "flex flex-col gap-8 p-8 w-full bg-gray-500",
    heading1:
      "text-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold w-fit",
    heading2:
      "text-xl bg-gradient-to-r mt-2 from-blue-500 to-purple-500 text-white font-bold w-fit",
    paragraph: "text-sm font-medium",
    buttonContainer: "border-t p-3 border-green-600 hover:blu border-b w-max",
    button: "bg-red-800 hover:bg-red-600 p-1 my-1 no-underline text-white",
    newsTitleContainer: "lg:p-4 xs:p-2",
    newsTitle: "lg:text-lg xs:text-sm",
    imageWrapper: "lg:flex xs:flex-col text-left justify-center items-center p-4 gap-4",
    contentWrapper: "flex flex-col gap-4",
  },
  donation: {
    container: "lg:mb-32 p-4 relative",
    contentContainer: "lg:w-[29rem] rounded-2xl w-[100%] items-center lg:absolute z-20 top-4 left-0 justify-center w-[100%] px-2 py-4 lg:m-4 text-white shadow-lg lg:rounded-2xl",
    title: "text-2xl font-bol ml-3 p-1 semibold",
    formContainer: "flex flex-col p-4 w-full ",
    description: "text-md p-8 italic",
    radioGroup: "flex items-center gap-2",
    radioLabel: "text-xs ",
    image: "w-full lg:h-[40rem] h-[15rem] object-cover p-4 right-0 top-0",
  },
  privateDonationForm: {
    formContainer: "w-full lg:px-5 lg:pb-5",
    buttonContainer: "flex w-full",
    button: "p-2 border-1 w-full text-center text-sm cursor-pointer",
    activeButton: "bg-blue-700 border-none",
    donationMessageContainer: "mx-6 text-xs",
    customDonationInput: "w-full p-2 bg-transparent border-b-2 border-white placeholder-white",
    inputField: "w-full p-2 mt-1 bg-none border-b rounded",
    errorMessage: "error bg-red-400/60 p-2 rounded-full",
    checkboxContainer: "flex justify-between items-center space-x-2",
    checkboxLabel: "flex items-center space-x-2",
    infoIcon: "cursor-pointer text-white text-xl",
    personalNumberContainer: "w-full p-2 mt-1 border border-gray-300 text-gray-900 rounded",
    submitButton: "w-full p-2 mt-1 border-1 mt-7 bg-blue-500 text-white rounded cursor-pointer transition-colors duration-300 hover:bg-blue-700 flex items-center justify-center space-x-2",
    formWrapper: "w-full",
    formContent: "",
    donationOptionsContainer: "flex gap-1 mt-1 w-full",
    donationMessageWrapper: "mt-4",
    customDonationWrapper: "mt-4",
    taxReductionWrapper: "",
    taxReductionMessage: "",
    taxReductionInputWrapper: "",
  },
  companyDonationForm: {
    formContainer: "w-full px-5 shadow-md",
    buttonContainer: "flex w-full border-1",
    button: "w-full p-2 border-1 text-center cursor-pointer",
    activeButton: "bg-blue-700 border-none",
    donationMessageContainer: "mx-6 my-4 text-xs",
    customInputHolder: "flex flex-col gap-2 items-left",
    customDonationInput: "w-full p-2 bg-transparent border-b-1 border-white placeholder-white",
    inputField: "w-full p-2 mt-1 border-b-1 bg-none rounded",
    errorMessage: "error bg-red-400/60 p-2 rounded-full",
    label: "block",
    contactInfo: "space-y-5",
    submitButton: "w-full p-2 mt-7 border-1 bg-blue-500 text-white rounded cursor-pointer transition-colors duration-300 hover:bg-blue-700 flex items-center justify-center space-x-2",
    formWrapper: "w-full",
    formContent: "",
    donationOptionsContainer: "flex gap-1 mt-4 text-xs",
    donationMessageWrapper: "",
    customDonationWrapper: "mt-4",
    organizationNumberWrapper: "",
    organizationNumberInputContainer: "flex space-x-2",
    contactPersonWrapper: "",
    contactPersonLabel: "",
    contactPersonDescription: "text-xs",
    contactInfoWrapper: "space-y-5",
    inputHolder: "flex flex-col gap-2 items-left",
  },
  contactStyles: {
    pageWrapper: "w-full",
    section: "w-full",
    container: "mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8",
    grid: "grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5",
    infoSection: "lg:col-span-2 lg:py-12",
    description: "max-w-xl text-lg",
    phoneLink: "text-2xl font-bold text-pink-600",
    address: "mt-2 not-italic",
    formSection: "rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12",
    form: "space-y-4",
    input: "w-full rounded-lg border-gray-200 p-3 text-sm",
    inputGrid: "grid grid-cols-1 gap-4 sm:grid-cols-2",
    optionsGrid: "grid grid-cols-1 gap-4 text-center sm:grid-cols-3",
    radioLabel:
      "block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white",
    submitButton:
      "inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto",
    contactInfoWrapper: "mt-8",
    inputWrapper: "w-full",
    srOnly: "sr-only",
    optionWrapper: "w-full",
    optionText: "text-sm",
    buttonWrapper: "mt-4",
  },
  authStyles: {
    container: "flex min-h-screen items-center justify-center bg-gray-100 p-4",
    card: "w-full max-w-md rounded-xl bg-white p-8 shadow-lg",
    header: "mb-6 text-center",
    title: "text-2xl font-bold text-gray-900",
    subtitle: "mt-2 text-gray-600",
    tabContainer: "mb-6 flex border-b",
    tab: "flex-1 cursor-pointer border-b-2 py-2 text-center",
    activeTab: "border-blue-500 text-blue-500",
    inactiveTab: "border-transparent text-gray-500 hover:text-gray-700",
    form: "space-y-4",
    inputGroup: "space-y-1",
    label: "block text-sm font-medium text-gray-700",
    input:
      "w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none",
    button: {
      primary:
        "w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600",
      social:
        "mb-3 flex w-full items-center justify-center gap-2 rounded-lg border py-2 hover:bg-gray-50",
      forgotPassword: "text-sm text-blue-500 hover:text-blue-600",
    },
    divider: {
      container: "relative my-6",
      line: "absolute top-1/2 w-full border-t border-gray-300",
      text: "relative -top-3 text-center",
      span: "bg-white px-2 text-sm text-gray-500",
    },
  },
  aboutStyles: {
    container: "text-center lg:p-4 h-[100vh]",
    mainTitle: "text-2xl font-bold py-4",
    contentContainer: "container p-4 lg:grid-cols-2",
    goalsGrid: "lg:grid lg:grid-cols-2 flex flex-col gap-4",
    goalCard: "bg-transparent h-[20rem] rounded-md p-5",
    title: "text-xl font-bold mb-4",
    description: "text-sm font-semibold mb-4",
  },
  giftShoppingStyles: {
    container: "mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8",
    header: {
      title: "text-xl font-bold text-gray-900 sm:text-3xl",
      description: "mt-4 max-w-md text-gray-500",
    },
    itemsCount: "text-sm text-gray-500",
    grid: "mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
    itemCard:
      "relative flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md",
    image: "h-64 w-full object-cover",
    itemInfo: "mt-4 flex flex-col items-center justify-center",
    itemTitle: "text-lg font-semibold text-gray-900",
    itemPrice: "mt-1 text-sm text-gray-500",
    button: "mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg",
    pagination: "mt-8 flex justify-center gap-1 text-xs font-medium",
  },
  partnersStyles: {
    container: "py-12 bg-gray-100 h-screen",
    wrapper: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    title: "text-3xl font-extrabold text-gray-900 text-center mb-6",
    grid: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8",
    partnerCard:
      "flex items-center justify-center p-4 bg-white rounded-lg shadow-md",
    logo: "h-16",
  },
  paymentStyles: {
    container: "w-full max-w-md mx-auto mt-12 p-5 shadow-lg font-sans",
    summary: {
      container: "mb-6 space-y-2 p-2 bg-gray-100 rounded-md",
      title: "text-xl font-bold mb-4",
      text: "text-gray-700",
      privateInfo: "space-y-2",
      companyInfo: "space-y-2",
    },
    form: {
      form: "space-y-4",
      methodLabel: "flex justify-between items-center mb-2",
      radio: "mr-2",
      radioText: "flex items-center",
      logoContainer: "flex",
      logo: "w-8 mr-2",
      logoWrapper: "flex items-center",
      swishInput: "w-full p-2 border border-gray-300 rounded mt-2",
      cardContainer: "mb-5",
      button: "w-full p-2 bg-blue-500 text-white rounded mt-2 hover:bg-blue-700 transition-colors",
      qrCodeContainer: "mt-4 flex flex-col items-center",
      qrCodeText: "mt-2 text-sm text-gray-600",
      rememberCardContainer: "mt-2",
    },
  },
  projectsStyles: {
    container: "projects",
    wrapper: "container",
    title: "text-center text-2xl font-bold",
    grid: "flex flex-wrap justify-center gap-4",
    card: "w-[300px] p-4",
    image: "w-full",
    cardTitle: "text-xl font-semibold mt-2",
    cardDescription: "text-gray-600 mt-2",
    button: "inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors",
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
