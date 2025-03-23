import { PartnersContent } from "../constants/contents";
import { styles } from "../constants/styles";

export default function PartnersSection() {
  return (
    <div className={styles.partnersStyles.container}>
      <div className={styles.partnersStyles.wrapper}>
        <h2 className={styles.partnersStyles.title}>
          {PartnersContent.title}
        </h2>
        <div className={styles.partnersStyles.grid}>
          {PartnersContent.partners.map((partner) => (
            <div
              key={partner.name}
              className={styles.partnersStyles.partnerCard}
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className={styles.partnersStyles.logo} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
