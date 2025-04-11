import { styles } from "../constants/styles";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function Footer() {
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <footer className={`${styles.footer.container} ${theme.background}`}>
      <div className={`${styles.footer.content}`}>
        <div className={styles.footer.section}>
          <h2 className={`${styles.footer.heading} ${theme.text}`}>About Us</h2>
          <p className={`${styles.footer.text} ${theme.text}`}>
            We are a non-profit organization dedicated to making the world a better place.
          </p>
        </div>
        <div className={styles.footer.section}>
          <h2 className={`${styles.footer.heading} ${theme.text}`}>Contact</h2>
          <p className={`${styles.footer.text} ${theme.text}`}>Email: info@nonprofit.org</p>
          <p className={`${styles.footer.text} ${theme.text}`}>Phone: +123 456 7890</p>
        </div>
        <div className={styles.footer.section}>
          <h2 className={`${styles.footer.heading} ${theme.text}`}>Follow Us</h2>
          <div className={styles.footer.socialIcons}>
            <a href="#" className={`${styles.footer.icon} ${theme.text}`}>FB</a>
            <a href="#" className={`${styles.footer.icon} ${theme.text}`}>TW</a>
            <a href="#" className={`${styles.footer.icon} ${theme.text}`}>IG</a>
          </div>
        </div>
      </div>
      <div className={styles.footer.bottom}>
        <p className={`${styles.footer.text} ${theme.text}`}>© 2023 Non-Profit Organization. All rights reserved.</p>
      </div>
    </footer>
  );
}
