import { contactContent } from "../constants/contents";
import { styles } from "../constants/styles";

export default function ContactPage() {
  return (
    <>
      <section>
        <div className={styles.contactStyles.container}>
          <div className={styles.contactStyles.grid}>
            <div className={styles.contactStyles.infoSection}>
              <p className={styles.contactStyles.description}>
                {contactContent.description}
              </p>

              <div className="mt-8">
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
                <div>
                  <label className="sr-only" htmlFor="name">Name</label>
                  <input
                    className={styles.contactStyles.input}
                    placeholder="Name"
                    type="text"
                    id="name"
                  />
                </div>

                <div className={styles.contactStyles.inputGrid}>
                  <div>
                    <label className="sr-only" htmlFor="email">Email</label>
                    <input
                      className={styles.contactStyles.input}
                      placeholder="Email address"
                      type="email"
                      id="email"
                    />
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="phone">Phone</label>
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
                    <div key={`Option${index + 1}`}>
                      <label
                        htmlFor={`Option${index + 1}`}
                        className={styles.contactStyles.radioLabel}
                        tabIndex={0}
                      >
                        <input
                          className="sr-only"
                          id={`Option${index + 1}`}
                          type="radio"
                          tabIndex={-1}
                          name="option"
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="sr-only" htmlFor="message">Message</label>
                  <textarea
                    className={styles.contactStyles.input}
                    placeholder="Message"
                    rows={8}
                    id="message"
                  ></textarea>
                </div>

                <div className="mt-4">
                  <button type="submit" className={styles.contactStyles.submitButton}>
                    Send Enquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
