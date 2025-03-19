import React from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Hero2Content } from "../constants/contents";
import { styles } from "../constants/styles";

export default function Hero2() {
  return (
    <div className={styles.hero2.container}>
      <div className={styles.hero2.shadowContainer}>
        <div className={styles.hero2.textContainer}>
          <div className={styles.hero2.newsContainer}>
            <div className="lg:p-4 xs:p-2">
              <h1 className="lg:text-lg xs:text-sm">News: </h1>
            </div>
            {Hero2Content.news.map((item, index) => (
              <div key={index} className={styles.hero2.newsItem}>
                <div className={styles.hero2.newsIcon}>
                  <FontAwesomeIcon icon={faAngleRight} />
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
                <Link className={styles.hero2.newsLink} to={item.link}>
                  {item.text}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.hero2.imageContainer}>
        <div>
          <img
            className={styles.hero2.image}
            src={Hero2Content.image}
            alt="donation"
          />
        </div>
        <div className={styles.hero2.contentContainer}>
          <div>
            <h1 className={styles.hero2.heading1}>
              {Hero2Content.content.heading1}
            </h1>
            <h1 className={styles.hero2.heading2}>
              {Hero2Content.content.heading2}
            </h1>
            {Hero2Content.content.paragraphs.map((paragraph, index) => (
              <p key={index} className={styles.hero2.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className={styles.hero2.buttonContainer}>
            <Link to={Hero2Content.content.buttonLink} className={styles.hero2.button}>
              {Hero2Content.content.buttonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
