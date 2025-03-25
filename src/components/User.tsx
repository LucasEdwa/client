import { styles } from "../constants/styles";
import { useTheme } from "../contexts/ThemeContext";
import { userContent } from "../constants/contents";

export const User = () => {
  const { theme } = useTheme();
  return (
    <div className={styles.user.container}>
      <div className={styles.user.section}>
        <img
          src={userContent.avatar}
          alt="User"
          className={styles.user.avatar}
        />
        <div className={styles.user.infoContainer}>
          <h4 className={styles.user.name}>{userContent.name}</h4>
          <p className={styles.user.role}>{userContent.role}</p>
          <p className={styles.user.location}>{userContent.location}</p>
          <div className={styles.user.buttonContainer}>
            <button className={styles.user.followButton + " " + theme.button  }>{userContent.buttons.follow }</button>
            <button className={styles.user.messageButton + " " + theme.button}>{userContent.buttons.message}</button>
          </div>
        </div>
      </div>
    </div>
  );
};