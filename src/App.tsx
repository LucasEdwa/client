import { RouterProvider } from 'react-router';
import router from './Router';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  "pk_test_51PDscFAKfyGzdYwI9oddBx3Spo9KHO49E61e5OY1fHMKQeJZa9FfyFJZvxTVvS9NhCU4mGaX6eEW7RRqWhaoABqv00lk3TpXL7"
);
function App() {
  return (
    <Elements stripe={stripePromise}>
      <RouterProvider router={router} />
    </Elements>
  )
}

export default App