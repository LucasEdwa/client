import { contactContent } from "../constants/contents";
import { styles } from "../constants/styles";

export default function ContactPage() {
  return (
    <div className={styles.contactStyles.pageWrapper}>
      <section className={styles.contactStyles.section}>
        <div className={styles.contactStyles.container}>
          <div className={styles.contactStyles.grid}>
            <div className={styles.contactStyles.infoSection}>
              <p className={styles.contactStyles.description}>
                {contactContent.description}
              </p>

              <div className={styles.contactStyles.contactInfoWrapper}>
                <a href="#" className={styles.contactStyles.phoneLink}>
                  {contactContent.phone}
                </a>

                <address className={styles.contactStyles.address}>
                  {contactContent.address}
                </address>
              </div>
            </div>

            <div className={styles.contactStyles.formSection}>
              <form action="#" className={styles.contactStyles.form}>
                <div className={styles.contactStyles.inputWrapper}>
                  <label className={styles.contactStyles.srOnly} htmlFor="name">Name</label>
                  <input
                    className={styles.contactStyles.input}
                    placeholder="Name"
                    type="text"
                    id="name"
                  />
                </div>

                <div className={styles.contactStyles.inputGrid}>
                  <div className={styles.contactStyles.inputWrapper}>
                    <label className={styles.contactStyles.srOnly} htmlFor="email">Email</label>
                    <input
                      className={styles.contactStyles.input}
                      placeholder="Email address"
                      type="email"
                      id="email"
                    />
                  </div>

                  <div className={styles.contactStyles.inputWrapper}>
                    <label className={styles.contactStyles.srOnly} htmlFor="phone">Phone</label>
                    <input
                      className={styles.contactStyles.input}
                      placeholder="Phone Number"
                      type="tel"
                      id="phone"
                    />
                  </div>
                </div>

                <div className={styles.contactStyles.optionsGrid}>
                  {contactContent.options.map((option, index) => (
                    <div key={`Option${index + 1}`} className={styles.contactStyles.optionWrapper}>
                      <label
                        htmlFor={`Option${index + 1}`}
                        className={styles.contactStyles.radioLabel}
                        tabIndex={0}
                      >
                        <input
                          className={styles.contactStyles.srOnly}
                          id={`Option${index + 1}`}
                          type="radio"
                          tabIndex={-1}
                          name="option"
                        />
                        <span className={styles.contactStyles.optionText}>{option}</span>
                      </label>
                    </div>
                  ))}
                </div>

                <div className={styles.contactStyles.inputWrapper}>
                  <label className={styles.contactStyles.srOnly} htmlFor="message">Message</label>
                  <textarea
                    className={styles.contactStyles.input}
                    placeholder="Message"
                    rows={8}
                    id="message"
                  ></textarea>
                </div>

                <div className={styles.contactStyles.buttonWrapper}>
                  <button type="submit" className={styles.contactStyles.submitButton}>
                    Send Enquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
