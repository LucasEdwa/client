import { GiftShoppingContent } from "../constants/contents";
import { styles } from "../constants/styles";

export default function GiftShopping() {
  return (
    <section>
      <div className={styles.giftShoppingStyles.container}>
        <header>
          <h2 className={styles.giftShoppingStyles.header.title}>
            {GiftShoppingContent.title}
          </h2>
          <p className={styles.giftShoppingStyles.header.description}>
            {GiftShoppingContent.description}
          </p>
        </header>

        <div className="mt-8">
          <p className={styles.giftShoppingStyles.itemsCount}>
            Showing <span>{GiftShoppingContent.itemsPerPage}</span> of {GiftShoppingContent.totalItems}
          </p>
        </div>

        <ul className={styles.giftShoppingStyles.grid}>
          {GiftShoppingContent.items.map((item) => (
            <li key={item.id} className={styles.giftShoppingStyles.itemCard}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.giftShoppingStyles.image}
              />
              <div className={styles.giftShoppingStyles.itemInfo}>
                <h3 className={styles.giftShoppingStyles.itemTitle}>
                  {item.name}
                </h3>
                <p className={styles.giftShoppingStyles.itemPrice}>{item.price}</p>
              </div>
              <button className={styles.giftShoppingStyles.button}>
                Add to Cart
              </button>
            </li>
          ))}
        </ul>

        {/* Pagination component can be extracted to a separate component */}
        <ol className={styles.giftShoppingStyles.pagination}>
          {/* ... pagination content ... */}
        </ol>
      </div>
    </section>
  );
}
  