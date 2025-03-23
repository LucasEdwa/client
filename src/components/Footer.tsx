import { useTheme } from "../contexts/ThemeContext";
import { styles } from "../constants/styles";

export default function Footer() {
  const { theme } = useTheme();
  return (
    <footer className={`${styles.footer.container} ${theme.background} ${theme.text}`}>
      <div className={styles.footer.content}>
        <div className={styles.footer.section}>
          <h2 className={styles.footer.heading}>About Us</h2>
          <p className={styles.footer.text}>
            We are a non-profit organization dedicated to making the world a better place.
          </p>
        </div>
        <div className={styles.footer.section}>
          <h2 className={styles.footer.heading}>Contact</h2>
          <p className={styles.footer.text}>Email: info@nonprofit.org</p>
          <p className={styles.footer.text}>Phone: +123 456 7890</p>
        </div>
        <div className={styles.footer.section}>
          <h2 className={styles.footer.heading}>Follow Us</h2>
          <div className={styles.footer.socialIcons}>
            <a href="#" className={styles.footer.icon}>FB</a>
            <a href="#" className={styles.footer.icon}>TW</a>
            <a href="#" className={styles.footer.icon}>IG</a>
          </div>
        </div>
      </div>
      <div className={styles.footer.bottom}>
        <p className={styles.footer.text}>© 2023 Non-Profit Organization. All rights reserved.</p>
      </div>
    </footer>
  );
}
