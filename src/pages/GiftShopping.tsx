import { useState } from "react";
import { GiftShoppingContent } from "../constants/contents";
import { styles } from "../constants/styles";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router";

export default function GiftShopping() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(GiftShoppingContent.items.length / itemsPerPage);
  const { addToCart } = useCart();
  const { theme } = useSelector((state: RootState) => state.theme);
  const currentItems = GiftShoppingContent.items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
          <div className={styles.giftShoppingStyles.header.icon}>
            <Link to="/cart">
              <FontAwesomeIcon
                icon={faBasketShopping}
              />
            </Link>
          </div>
        </header>

        <div className="mt-8">
          <p className={styles.giftShoppingStyles.itemsCount}>
            Showing <span>{itemsPerPage}</span> of {GiftShoppingContent.items.length}
          </p>
        </div>

        <ul className={styles.giftShoppingStyles.grid}>
          {currentItems.map((item) => (
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
                <p className={styles.giftShoppingStyles.itemPrice}>{item.price} {item.currency} </p>
              </div>
              <button
                className={`${styles.giftShoppingStyles.button} ${theme.button}`}
                onClick={() =>
                  addToCart({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    currency: item.currency,
                    quantity: 1,
                  })
                }
              >
                Add to Cart
              </button>
            </li>
          ))}
        </ul>

        <ol className={styles.giftShoppingStyles.pagination}>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={`${styles.giftShoppingStyles.pageItem} ${currentPage === index + 1 ? styles.giftShoppingStyles.activePage : ""
                }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
