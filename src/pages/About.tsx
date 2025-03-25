import { AboutContent } from "../constants/contents";
import { styles } from "../constants/styles";

export default function About() {
  return (
    <div className={styles.aboutStyles.container}>
      <h1 className={styles.aboutStyles.mainTitle}>{AboutContent.mainTitle}</h1>
      <div className={styles.aboutStyles.contentContainer}>
        <div className={styles.aboutStyles.goalsGrid}>
          {Object.entries(AboutContent.goals).map(([key, goal]) => (
            <div key={key} className={styles.aboutStyles.goalCard}>
              <h2 className={styles.aboutStyles.title}>{goal.title}</h2>
              <p className={styles.aboutStyles.description}>{goal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
