import { useState } from "react";
import { NavbarContent } from "../constants/contents";
import { Link } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { styles } from "../constants/styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleTheme } from "../redux/ThemaSlice";

export function Navigation() {

  const dispatch = useDispatch();
  const { theme, currentTheme } = useSelector((state: RootState) => state.theme);
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openProjectDropdown, setOpenProjectDropdown] = useState<number | null>(null);

  const handleProjectDropdownToggle = (id: number) => {
    setOpenProjectDropdown(openProjectDropdown === id ? null : id);
  };

  return (
    <nav className={`${styles.nav.container} ${theme.background} ${theme.text}`}>
      <div className={styles.nav.themeButtonContainer}>
        <button
          onClick={handleToggleTheme}
          className={styles.nav.themeButton}
        >
          <FontAwesomeIcon icon={currentTheme === 'primary' ? faSun : faMoon} />
        </button>
      </div>
      <div className={styles.nav.holder}>
        <Link to="/" className={styles.nav.brandLink}>For all in Gambia</Link>
        <button
          className={`${styles.nav.menuButton} ${isMenuOpen ? "hidden" : "block"}`}
          onClick={() => setIsMenuOpen(true)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <div className={`${isMenuOpen ? "translate-x-0" : "-translate-x-full"} ${styles.nav.sideMenu} ${theme.background}`}>
        <button
          className={styles.nav.closeButton}
          onClick={() => setIsMenuOpen(false)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h1 className={`${theme.text} text-2xl`}>For all Gambia</h1>
        <div className={styles.nav.mobileLinks}>
          {NavbarContent.map((item) => (
            item.dropdownItems ? (
              <div key={item.id} className={styles.nav.dropdownItems}>
                <button
                  className={styles.nav.link}
                  onClick={() => handleProjectDropdownToggle(item.id)}
                >
                  {item.title}
                </button>
                <div className={`${openProjectDropdown === item.id ? "block" : "hidden"} ${styles.nav.dropdownItems}`}>
                  {item.dropdownItems.map((dropdownItem) => (
                    <a key={dropdownItem.id} href={dropdownItem.link} className={styles.nav.dropdownItem}>
                      {dropdownItem.title}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={item.id} className={styles.nav.link} href={item.link}>
                {item.title}
              </a>
            )
          ))}
        </div>
      </div>
    </nav>
  );
}
