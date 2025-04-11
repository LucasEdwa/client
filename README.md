# 🌍 Gambia Donation Platform (Portfolio Project)

A demonstration web application showcasing my skills in building modern, type-safe React applications with complex state management. This is a portfolio project and not a real donation platform and is under construction.

![Project Screenshot](./src/assets/donationForm.png)

## 🎯 Project Purpose
This project was created to demonstrate:
- Advanced TypeScript implementation
- Complex state management with Redux
- Form handling and validation
- Payment system integration
- Responsive design patterns

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 🎯 Project Overview

This platform enables two types of donations:
1. **Private Donations**: For individual donors with tax reduction options
2. **Company Donations**: For corporate donors with specific business requirements

## 💻 Technical Architecture

### Core Technologies
- **React** with **TypeScript** for type-safe development
- **Redux Toolkit** for state management
- **Tailwind CSS** for responsive styling
- **Stripe** for secure payment processing
- **SweetAlert2** for enhanced user interactions

### Project Structure
```
src/
├── components/
│   ├── donation/
│   │   ├── CompanyDonationForm.tsx    # Company donation interface
│   │   ├── PrivateDonationForm.tsx    # Private donation interface
│   │   └── Donation.tsx               # Main donation component
├── constants/
│   ├── contents.ts                    # All text content
│   ├── donationMessages.ts           # Donation-related messages
│   └── styles.ts                     # Styling constants
├── context/
│   ├── ThemeContext.tsx              # Theme management
│   └── UserContext.tsx               # User state management
├── hooks/
│   ├── CompanyDonationAmountOptions.tsx
│   └── DonationAmountOptions.tsx
├── pages/                            # Application routes
└── types/
    └── types.ts                      # TypeScript type definitions
```

## 🔍 Type System

### Core Types
```typescript
// Private Donation Form Data
type TPrivateDonationFormData = {
  donationType: "private";
  fullName: string;
  email: string;
  mobileNumber: number;
  checkedForTaxReduction: boolean;
  personalNumber?: number;
  donationAmount?: number;
  signatureType: string;
};

// Company Donation Form Data
type TCompanyDonationFormData = {
  donationType: "company";
  companyRegistrationNumber: string;
  companyEmail: string;
  companyFirstName: string;
  companyLastName: string;
  companyMobileNumber: number;
  donationAmount: number;
  signatureType: string;
};

// Payment Data
type TStripePaymentData = {
  paymentMethod: "swish" | "card";
  swishNumber?: number;
  paymentMethodId?: string;
  userId?: number | string;
} & (TPrivateDonationFormData | TCompanyDonationFormData);
```

## 🧠 State Management

### Redux Implementation
The application uses Redux for managing complex form states and donation flows:

```typescript
// Redux Store Structure
type DonationState = {
  donationType: "private" | "company";
  privateFormData: TPrivateDonationFormData;
  companyFormData: TCompanyDonationFormData;
};

// Form Data Updates
const handlePrivateFormDataChange = (updatedData: React.SetStateAction<TPrivateDonationFormData>) => {
  if (typeof updatedData === "function") {
    dispatch(setPrivateFormData(updatedData(privateFormData)));
  } else {
    dispatch(setPrivateFormData(updatedData));
  }
};
```

### Key Features
- **Dynamic Form Switching**: Seamless transition between private and company donation forms
- **Real-time Validation**: Immediate feedback on form inputs
- **Tax Reduction**: Special handling for private donors seeking tax benefits
- **Payment Integration**: Secure payment processing through Stripe
- **Theme Support**: Dark/light mode with context-based theming

## 🛠️ Development Features

### Form Handling
- Type-safe form state management
- Dynamic validation rules
- Custom donation amount options
- Mobile-responsive design

### Payment Processing
- Multiple payment methods (Swish/Card)
- Secure transaction handling
- Payment method validation
- Error handling and user feedback

### User Experience
- Intuitive form navigation
- Clear error messages
- Progress indicators
- Responsive design

## 🔜 Future Enhancements
- [ ] Shopping cart functionality
- [ ] Backend API integration
- [ ] Enhanced payment processing
- [ ] Advanced form validation
- [ ] Unit testing suite
- [ ] Performance optimizations

## 🌐 Demo
Check out the live demo at: [Gambia Donation Platform Demo](https://main.d1nkv9r7zy7zdb.amplifyapp.com)

## 📝 Note
This is a portfolio project created to showcase my development skills. It is not affiliated with any real organization or charity. The payment processing is simulated and no real transactions are processed.

## 🤝 Contributing
While this is a portfolio project, I welcome feedback and suggestions for improvement!
