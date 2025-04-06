import { useCart } from "../contexts/CartContext";
import { Link } from "react-router";

export const Cart = () => {
  const { cart } = useCart();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <>
          <p className="text-gray-600">Your cart is currently empty.</p>
          <Link to="/gift-shopping" className="mt-4 text-blue-500 hover:underline">
            Continue Shopping
          </Link>
        </>
      ) : (
        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-4">
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b py-2">
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p>
                    {item.price} {item.currency} x {item.quantity}
                  </p>
                </div>
                <p className="font-bold">
                  Total: {item.price * item.quantity} {item.currency}
                </p>
              </li>
            ))}
          </ul>
            <div className="mt-4">
                <h2 className="text-xl font-bold">Total Amount:</h2>
                <p className="text-lg">
                {cart.reduce((total, item) => total + item.price * item.quantity, 0)}{" "}
                {cart[0]?.currency}
                </p>
            </div>
          <Link to="/gift-shopping" className="mt-4 text-blue-500 hover:underline block text-center">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};