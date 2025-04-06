import { Link } from "react-router";
import { HeroMain } from "../constants/contents";
import { styles } from "../constants/styles";
import { useTheme } from "../contexts/ThemeContext";

export default function Hero1() {
  const { theme } = useTheme();
  return (
    <div className={styles.hero1.container}>
      <img
        src={HeroMain.image}
        alt="hero1"
        className={styles.hero1.image}
      />
      <div className={styles.hero1.contentContainer}>
        <div className={styles.hero1.textContainer}>
          <h2 className={styles.hero1.heading1}>
            {HeroMain.textContent.heading1}
          </h2>
          <h3 className={styles.hero1.heading2}>
            {HeroMain.textContent.heading2}
          </h3>
          <h5 className={styles.hero1.heading3}>
            {HeroMain.textContent.heading3}
          </h5>
          <div className={styles.hero1.buttonContainer}>
            <Link
              to={HeroMain.textContent.buttonLink}
              className={styles.hero1.button}
            >
              {HeroMain.textContent.buttonText}
            </Link>
          </div>
        </div>
        <div className={`${styles.hero1.articleContainer} ${theme.background}`}>
          <article className={styles.hero1.article}>
            <div className={styles.hero1.articleContent}>
              <img alt="" src={HeroMain.heroCard.image} className={styles.hero1.articleImage} />
              <p className={styles.hero1.articleText}>
                <span className="lg:text-primary">{HeroMain.textContent.article.description}</span>
              </p>
              <Link
                to={HeroMain.textContent.article.link}
                className={styles.hero1.articleLink}
              >
                {HeroMain.textContent.article.linkText}
                <span
                  aria-hidden="true"
                  className={styles.hero1.articleLinkIcon}
                >
                  &rarr;
                </span>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
