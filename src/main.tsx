import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { Provider } from 'react-redux';
import { UserProvider } from './contexts/UserContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CartProvider } from './contexts/CartContext'; // Import CartProvider
import router from './Router'
import './index.css'
import store from './redux/store'

const stripePromise = loadStripe('your-publishable-key-here');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <Provider store={store}>
        <UserProvider>
          <CartProvider>
            <Elements stripe={stripePromise}>
              <RouterProvider router={router} />
            </Elements>
          </CartProvider>
        </UserProvider>
    </Provider>
  </React.StrictMode>,
)
