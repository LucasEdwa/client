import { RouterProvider } from 'react-router';
import router from './Router';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CartProvider } from "./contexts/CartContext";
import { Provider } from "react-redux";
import store from "./redux/store";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const App = () => {
  return (
    <Provider store={store}>
      <CartProvider>
        <Elements stripe={stripePromise}>
          <RouterProvider router={router} />
        </Elements>
      </CartProvider>
    </Provider>
  )
}

export default App