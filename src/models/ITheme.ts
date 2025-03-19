// Theme interfaces
export interface ITheme {
  background: string;
  text: string;
  subText: string;
  button: string;
  nav: {
    container: string;
    holder: string;
    themeButtonContainer: string;
    themeButton: string;
    brandLink: string;
    menuButton: string;
    dropdownMenu: string;
    dropdownItems: string;
    dropdownItem: string;
    link: string;
    mobileLinks: string;
    sideMenu: string;
    closeButton: string;
  };
  donation: {
    container: string;
    contentContainer: string;
    title: string;
    description: string;
    radioGroup: string;
    radioLabel: string;
    image: string;
    background: string;
  };
}

export interface IThemes {
  primary: ITheme;
  secondary: ITheme;
}