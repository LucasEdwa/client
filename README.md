# Frontend Web application

#### Run project vite with :

    - npm run dev

## Description

    - this webpage is under construction. It is based in another project I had and it main goal is the stripe payment and paymentform.
    - I create the donation component with two forms types (Private and companyForms).

## Screenshots
![Project Screenshot](./src/assets/donationForm.png)

```typescript
export type TPrivateDonationFormData = {
  fullName: string;
  email: string;
  mobileNumber: string;
  checkedForTaxReduction: boolean;
  personalNumber?: string;
  donationAmount: number;
  signatureType: string;
};

export type TCompanyDonationFormData = {
  companyRegistrationNumber: string;
  companyEmail: string;
  companyFirstName: string;
  companyLastName: string;
  companyMobileNumber: string;
  donationAmount: number;
  signatureType: string;
};

export type TStripePaymentData = {
  paymentMethod: "swish" | "card";
  swishNumber?: string;
  paymentMethodId?: string;
  userId?: string;
} & (TPrivateDonationFormData | TCompanyDonationFormData);
```

    - And it has two components to each form

```typescript
return (
  <div className={` ${styles.donation.container}`}>
    <img src={hero1} alt="hero" className={styles.donation.image} />

    <div className={`${styles.donation.contentContainer} ${theme.background}`}>
      <h1 className={styles.donation.title}>{DonationContent.title}</h1>
      <p className={styles.donation.description}>
        {DonationContent.description}
      </p>
      <div className={styles.donation.formContainer}>
        <div className={styles.donation.radioGroup}>
          <h1 className="text-xs p-2">Donate as:</h1>
          <input
            type="radio"
            id="private-person"
            name="donation"
            value="private"
            onChange={handleDonationTypeChange}
            defaultChecked
            className="text-xs"
          />
          <label
            htmlFor="private-person"
            className={styles.donation.radioLabel}
          >
            Private Person
          </label>
          <input
            type="radio"
            id="company"
            name="donation"
            value="company"
            onChange={handleDonationTypeChange}
            className=""
          />
          <label htmlFor="company" className={styles.donation.radioLabel}>
            Company
          </label>
        </div>
        {donationType === "private" && (
          <PrivateDonationForm
            formData={formData as TPrivateDonationFormData}
            setFormData={
              setFormData as React.Dispatch<
                React.SetStateAction<TPrivateDonationFormData>
              >
            }
          />
        )}
        {donationType === "company" && (
          <CompanyDonationForm
            formData={formData as TCompanyDonationFormData}
            setFormData={
              setFormData as React.Dispatch<
                React.SetStateAction<TCompanyDonationFormData>
              >
            }
          />
        )}
      </div>
    </div>
  </div>
);
```

  - Then the payment Page has the submit to payment 

``` typescript

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
    // Here you would typically send the paymentData to  backend
  };
```
![Project Screenshot](./src/assets/payment.png)


## TODO:
  - Finish user page
  -Create another