import React, { useState , FormEvent} from "react";
import Swal from "sweetalert2";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router";
import { QRCodeSVG } from 'qrcode.react';
import { TStripePaymentData, TCompanyDonationFormData, TPrivateDonationFormData } from "../types/types";
import swishLogo from "../assets/swish.png";
import visaLogo from "../assets/visa.jpg";
import masterLogo from "../assets/master.png";
import maestroLogo from "../assets/maestro.png";
import { styles } from "../constants/styles";

type LocationState = TPrivateDonationFormData | TCompanyDonationFormData;

function isPrivateDonation(data: LocationState): data is TPrivateDonationFormData {
  return data.donationType === "private";
}

function isCompanyDonation(data: LocationState): data is TCompanyDonationFormData {
  return data.donationType === "company";
}

function PaymentPage() {
  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();

  console.log("Payment Page State:", location.state);

  const locationState = location.state as LocationState;

  const [paymentMethod, setPaymentMethod] = useState<"swish" | "card">("swish");
  const [swishNumber, setSwishNumber] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value as "swish" | "card");
  };

  const handleSwishPayment = () => {
    const swishData = {
      version: 1,
      payee: { value: swishNumber.replace(/\D/g, '') },
      amount: { value: locationState.donationAmount },
      message: { value: `Donation from ${isPrivateDonation(locationState) ? locationState.fullName : locationState.companyFirstName + " " + locationState.companyLastName}` }
    };

    if (isMobile) {
      const swishUrl = `swish://payment?data=${encodeURIComponent(JSON.stringify(swishData))}`;
      window.location.href = swishUrl;

      setTimeout(() => {
        setShowQRCode(true);
      }, 2000);
    } else {
      setShowQRCode(true);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (paymentMethod === "swish") {
      if (!swishNumber) {
        Swal.fire({
          title: "Something went wrong!",
          text: "Please enter your Swish number",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
      handleSwishPayment();
      return;
    }

    let paymentMethodId: string | undefined;

    if (paymentMethod === "card" && stripe && elements) {
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        return;
      }

      const { error, paymentMethod: stripePaymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        Swal.fire({
          title: "Something went wrong!",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      if (stripePaymentMethod) {
        paymentMethodId = stripePaymentMethod.id;
      }
    }

    // Validate required fields
    if (
      !locationState.donationType ||
      !locationState.signatureType ||
      !locationState.donationAmount ||
      locationState.donationAmount <= 0 ||
      (isPrivateDonation(locationState) && (!locationState.fullName || !locationState.email)) ||
      (isCompanyDonation(locationState) && (!locationState.companyFirstName || !locationState.companyEmail)) ||
      (paymentMethod === "card" && !paymentMethodId)
    ) {
      Swal.fire({
        title: "Something went wrong!",
        text: "Please fill in all required fields correctly.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const paymentData: TStripePaymentData = {
      paymentMethod,
      swishNumber: (paymentMethod as "swish" | "card") === "swish" ? swishNumber : undefined,
      paymentMethodId,
      userId: "1",
      ...locationState
    };

    console.log(paymentData);
    // Here you would typically send the paymentData to your backend
  };

  return (
    <div className={styles.paymentStyles.container}>
      <div className={styles.paymentStyles.summary.container}>
        <h2 className={styles.paymentStyles.summary.title}>Donation Summary</h2>
        <p className={styles.paymentStyles.summary.text}>Donation as: {locationState.donationType}</p>
        <p className={styles.paymentStyles.summary.text}>Signature as: {locationState.signatureType}</p>
        <p className={styles.paymentStyles.summary.text}>Donation Amount: {locationState.donationAmount} kr</p>
        
        {isPrivateDonation(locationState) && (
          <div className={styles.paymentStyles.summary.privateInfo}>
            <p className={styles.paymentStyles.summary.text}>Fullname: {locationState.fullName}</p>
            <p className={styles.paymentStyles.summary.text}>Email: {locationState.email}</p>
            <p className={styles.paymentStyles.summary.text}>Mobile: {locationState.mobileNumber}</p>
            {locationState.personalNumber && (
              <p className={styles.paymentStyles.summary.text}>PersonalNumber: {locationState.personalNumber}</p>
            )}
          </div>
        )}

        {isCompanyDonation(locationState) && (
          <div className={styles.paymentStyles.summary.companyInfo}>
            <p className={styles.paymentStyles.summary.text}>Company Contact: {locationState.companyFirstName} {locationState.companyLastName}</p>
            <p className={styles.paymentStyles.summary.text}>Company Email: {locationState.companyEmail}</p>
            <p className={styles.paymentStyles.summary.text}>Company Phone: {locationState.companyMobileNumber}</p>
            <p className={styles.paymentStyles.summary.text}>Registration Number: {locationState.companyRegistrationNumber}</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className={styles.paymentStyles.form.form}>
        <div className={styles.paymentStyles.form.methodLabel}>
          <div className={styles.paymentStyles.form.radioText}>
            <input
              type="radio"
              value="swish"
              checked={paymentMethod === "swish"}
              onChange={handlePaymentMethodChange}
              className={styles.paymentStyles.form.radio}
            />
            <span>Swish</span>
          </div>
          <div className={styles.paymentStyles.form.logoWrapper}>
            <img src={swishLogo} alt="Swish logo" className={styles.paymentStyles.form.logo} />
          </div>
        </div>

        <div className={styles.paymentStyles.form.methodLabel}>
          <div className={styles.paymentStyles.form.radioText}>
            <input
              type="radio"
              value="card"
              checked={paymentMethod === "card"}
              onChange={handlePaymentMethodChange}
              className={styles.paymentStyles.form.radio}
            />
            <span>Card</span>
          </div>
          <div className={styles.paymentStyles.form.logoContainer}>
            <img src={visaLogo} alt="Visa logo" className={styles.paymentStyles.form.logo} />
            <img src={masterLogo} alt="Mastercard logo" className={styles.paymentStyles.form.logo} />
            <img src={maestroLogo} alt="Maestro logo" className={styles.paymentStyles.form.logo} />
          </div>
        </div>

        {paymentMethod === "swish" && (
          <div className={styles.paymentStyles.form.cardContainer}>
            <input
              type="text"
              placeholder="Phone number (+46) 723451234"
              className={styles.paymentStyles.form.swishInput}
              value={swishNumber}
              onChange={(e) => setSwishNumber(e.target.value)}
              pattern="[0-9+()-\s]*"
            />
            {showQRCode && (
              <div className={styles.paymentStyles.form.qrCodeContainer}>
                <QRCodeSVG 
                  value={`swish://payment?data=${encodeURIComponent(JSON.stringify({
                    version: 1,
                    payee: { value: swishNumber.replace(/\D/g, '') },
                    amount: { value: locationState.donationAmount },
                    message: { value: `Donation from ${isPrivateDonation(locationState) ? locationState.fullName : locationState.companyFirstName + " " + locationState.companyLastName}` }
                  }))}`}
                  size={256}
                />
                <p className={styles.paymentStyles.form.qrCodeText}>
                  Scan this QR code with your Swish app to complete the payment
                </p>
              </div>
            )}
          </div>
        )}

        {paymentMethod === "card" && (
          <div className={styles.paymentStyles.form.cardContainer}>
            <CardElement options={{ style: { base: { fontSize: "18px", backgroundColor: "white" } } }} />
            <div className={styles.paymentStyles.form.rememberCardContainer}>
              <label className={styles.paymentStyles.form.radioText}>
                <input type="checkbox" className={styles.paymentStyles.form.radio} /> Remember my card
              </label>
            </div>
          </div>
        )}

        <button type="submit" className={styles.paymentStyles.form.button}>
          Pay {locationState.donationAmount} KR
        </button>
      </form>
    </div>
  );
}

export default PaymentPage;
