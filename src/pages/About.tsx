import { AboutContent } from "../constants/contents";
import { styles }  from "../constants/styles";

export default function About() {
  return (
    <div className={styles.aboutStyles.container}>
      <h1 className="text-2xl font-bold py-4">{AboutContent.mainTitle}</h1>
      <div className="container p-4 sm:grid-cols-2">
        <div className="lg:grid lg:grid-cols-2 flex flex-col gap-4">
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
