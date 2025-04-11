import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Donation from '../components/donation/Donation';
import { useNavigate } from 'react-router';
import { BrowserRouter } from 'react-router';

// Mock react-router
jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

// Mock the image import
jest.mock('../assets/img_donation.jpeg', () => 'mocked-image-path');

describe('Donation Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderDonation = () => {
    return render(
      <BrowserRouter>
          <Donation />
      </BrowserRouter>
    );
  };

  describe('Initial Render', () => {
    it('renders donation component with private form by default', () => {
      renderDonation();
      
      // Check if radio buttons are present and private is selected
      expect(screen.getByLabelText('Private Person')).toBeChecked();
      expect(screen.getByLabelText('Company')).not.toBeChecked();

      // Check if private form fields are present
      expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email Address*')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Mobile Number*')).toBeInTheDocument();
    });
  });

  describe('Form Type Switching', () => {
    it('switches between private and company forms', () => {
      renderDonation();
      
      // Switch to company form
      fireEvent.click(screen.getByLabelText('Company'));
      expect(screen.getByLabelText('Company')).toBeChecked();
      expect(screen.getByLabelText('Private Person')).not.toBeChecked();

      // Check if company form fields are present
      expect(screen.getByPlaceholderText('xxxxxx-xxxx (Organization Number)')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('company@example.com (Company Email)')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Mobile Number')).toBeInTheDocument();

      // Switch back to private form
      fireEvent.click(screen.getByLabelText('Private Person'));
      expect(screen.getByLabelText('Private Person')).toBeChecked();
      expect(screen.getByLabelText('Company')).not.toBeChecked();
    });
  });

  describe('Private Form Validation', () => {
    it('validates required fields in private form', async () => {
      renderDonation();
      
      // Try to submit empty form
      const submitButton = screen.getByText(/To Payment/);
      fireEvent.click(submitButton);

      // Check if form validation prevents submission
      await waitFor(() => {
        expect(mockNavigate).not.toHaveBeenCalled();
      });
    });

    it('validates email format in private form', async () => {
      renderDonation();
      
      // Fill in invalid email
      const emailInput = screen.getByPlaceholderText('Email Address*');
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

      const submitButton = screen.getByText(/To Payment/);
      fireEvent.click(submitButton);

      // Check if form validation prevents submission
      await waitFor(() => {
        expect(mockNavigate).not.toHaveBeenCalled();
      });
    });

    it('handles tax reduction checkbox in private form', () => {
      renderDonation();
      
      const taxReductionCheckbox = screen.getByRole('checkbox', { name: '' });
      fireEvent.click(taxReductionCheckbox);

      expect(screen.getByPlaceholderText('Personal Number')).toBeInTheDocument();
    });
  });

  describe('Company Form Validation', () => {
    it('validates required fields in company form', async () => {
      renderDonation();
      
      // Switch to company form
      fireEvent.click(screen.getByLabelText('Company'));

      // Try to submit empty form
      const submitButton = screen.getByText(/To Payment/);
      fireEvent.click(submitButton);

      // Check if form validation prevents submission
      await waitFor(() => {
        expect(mockNavigate).not.toHaveBeenCalled();
      });
    });

    it('validates email format in company form', async () => {
      renderDonation();
      
      // Switch to company form
      fireEvent.click(screen.getByLabelText('Company'));

      // Fill in invalid email
      const emailInput = screen.getByPlaceholderText('company@example.com (Company Email)');
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

      const submitButton = screen.getByText(/To Payment/);
      fireEvent.click(submitButton);

      // Check if form validation prevents submission
      await waitFor(() => {
        expect(mockNavigate).not.toHaveBeenCalled();
      });
    });
  });

  describe('Form Submission', () => {
    it('navigates to payment page with correct data for private form', async () => {
      renderDonation();
      
      // Fill in valid private form data
      fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByPlaceholderText('Email Address*'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByPlaceholderText('Mobile Number*'), { target: { value: '1234567890' } });

      // Submit form
      const submitButton = screen.getByRole('button', { name: /To Payment/ });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/payment', {
          state: expect.objectContaining({
            fullName: 'John Doe',
            email: 'john@example.com',
            mobileNumber: '1234567890',
            donationType: 'private',
            signatureType: 'become-monthly-donor',
            donationAmount: 100,
            checkedForTaxReduction: false
          })
        });
      });
    });

    it('navigates to payment page with correct data for company form', async () => {
      renderDonation();
      
      // Switch to company form
      const companyRadio = screen.getByLabelText('Company');
      fireEvent.click(companyRadio);

      // Click the Gift button first and wait for state update
      const giftButton = screen.getByRole('button', { name: 'Gift' });
      await act(async () => {
        fireEvent.click(giftButton);
      });

      // Wait for donation amount buttons to be visible
      await waitFor(() => {
        expect(screen.getByRole('button', { name: '10000 KR' })).toBeInTheDocument();
      });

      // Click donation amount
      const donationButton = screen.getByRole('button', { name: '10000 KR' });
      await act(async () => {
        fireEvent.click(donationButton);
      });

      // Fill out company form
      const registrationInput = screen.getByPlaceholderText('xxxxxx-xxxx (Organization Number)');
      const emailInput = screen.getByPlaceholderText('company@example.com (Company Email)');
      const firstNameInput = screen.getByPlaceholderText('First Name');
      const lastNameInput = screen.getByPlaceholderText('Last Name');
      const mobileInput = screen.getByPlaceholderText('Mobile Number');

      // Fill in form fields and wait for state updates
      await act(async () => {
        fireEvent.change(registrationInput, { target: { value: '123456-7890' } });
        fireEvent.change(emailInput, { target: { value: 'company@example.com' } });
        fireEvent.change(firstNameInput, { target: { value: 'John' } });
        fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
        fireEvent.change(mobileInput, { target: { value: '1234567890' } });
      });

      // Submit form by clicking the submit button
      const submitButton = screen.getByRole('button', { name: /To Payment/ });
      await act(async () => {
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/payment', {
          state: expect.objectContaining({
            companyRegistrationNumber: '123456-7890',
            companyEmail: 'company@example.com',
            companyFirstName: 'John',
            companyLastName: 'Doe',
            companyMobileNumber: '1234567890',
            donationAmount: 10000,
            donationType: 'company',
            signatureType: 'ge-en-gava',
            email: 'company@example.com',
            fullName: 'John Doe',
            mobileNumber: '1234567890'
          })
        });
      });
    });
  });

  describe('Private Form Edge Cases', () => {
    beforeEach(() => {
      renderDonation();
    });

    it('handles tax declaration requirements for donations over 10,000 KR', async () => {
      // Click Gift button
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Give a Gift' }));
      });

      // Select optional amount
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'OPTIONAL' }));
      });

      const customInput = screen.getByPlaceholderText('Enter optional amount') as HTMLInputElement;
      const taxCheckbox = screen.getByRole('checkbox', { name: /tax reduction/i });

      // Enter amount over 10,000
      await act(async () => {
        fireEvent.change(customInput, { target: { value: '15000' } });
      });

      // Verify tax checkbox is automatically checked and disabled
      expect(taxCheckbox).toBeChecked();
      expect(taxCheckbox).toBeDisabled();

      // Try to uncheck tax checkbox
      await act(async () => {
        fireEvent.click(taxCheckbox);
      });

      // Verify checkbox remains checked
      expect(taxCheckbox).toBeChecked();
    });

    it('formats money values correctly', async () => {
      // Click Gift button
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Give a Gift' }));
      });

      // Select optional amount
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'OPTIONAL' }));
      });

      const customInput = screen.getByPlaceholderText('Enter optional amount') as HTMLInputElement;

      // Test different amounts
      const testCases = [
        { input: '1000', expected: '1 000 kr' },
        { input: '10000', expected: '10 000 kr' },
        { input: '100000', expected: '100 000 kr' },
        { input: '1000000', expected: '1 000 000 kr' }
      ];

      for (const testCase of testCases) {
        await act(async () => {
          fireEvent.change(customInput, { target: { value: testCase.input } });
        });

        const formattedAmount = screen.getByText(testCase.expected);
        expect(formattedAmount).toBeInTheDocument();
      }
    });
  });

  describe('Company Form Edge Cases', () => {
    beforeEach(() => {
      renderDonation();
      fireEvent.click(screen.getByLabelText('Company'));
    });

    it('formats money values correctly', async () => {
      // Click Gift button
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Gift' }));
      });

      // Select optional amount
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'OPTIONAL' }));
      });

      const customInput = screen.getByPlaceholderText('type your donation amount') as HTMLInputElement;

      // Test different amounts
      const testCases = [
        { input: '1000', expected: '1 000 kr' },
        { input: '10000', expected: '10 000 kr' },
        { input: '100000', expected: '100 000 kr' },
        { input: '1000000', expected: '1 000 000 kr' }
      ];

      for (const testCase of testCases) {
        await act(async () => {
          fireEvent.change(customInput, { target: { value: testCase.input } });
        });

        const formattedAmount = screen.getByText(testCase.expected);
        expect(formattedAmount).toBeInTheDocument();
      }
    });

    it('validates company registration number format', async () => {
      const registrationInput = screen.getByPlaceholderText('xxxxxx-xxxx (Organization Number)');
      
      // Test invalid format
      fireEvent.change(registrationInput, { target: { value: '12345' } });
      fireEvent.click(screen.getByRole('button', { name: /To Payment/ }));
      
      await waitFor(() => {
        const errorMessages = screen.getAllByText(/Invalid format/i);
        expect(errorMessages.length).toBeGreaterThan(0);
      });

      // Test valid format
      fireEvent.change(registrationInput, { target: { value: '123456-7890' } });
      fireEvent.click(screen.getByRole('button', { name: /To Payment/ }));
      
      await waitFor(() => {
        const errorMessages = screen.queryAllByText(/Invalid format/i);
        expect(errorMessages.length).toBe(0);
      });
    });

    it('handles custom donation amount limits', async () => {
      // Click Gift button and wait for state update
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Gift' }));
      });
      
      // Select optional amount
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'OPTIONAL' }));
      });
      
      const customInput = screen.getByPlaceholderText('type your donation amount') as HTMLInputElement;
      
      // Test negative amount
      await act(async () => {
        fireEvent.change(customInput, { target: { value: '-100' } });
      });
      expect(customInput.value).toBe('0');
      
      // Test amount exceeding limit
      await act(async () => {
        fireEvent.change(customInput, { target: { value: '2000000' } });
      });
      expect(customInput.value).toBe('1000000');
      
      // Test valid amount
      await act(async () => {
        fireEvent.change(customInput, { target: { value: '5000' } });
      });
      expect(customInput.value).toBe('5000');
    });

    it('validates mobile number format', async () => {
      const mobileInput = screen.getByPlaceholderText('Mobile Number');
      
      // Test invalid format (too short)
      fireEvent.change(mobileInput, { target: { value: '123' } });
      fireEvent.click(screen.getByRole('button', { name: /To Payment/ }));
      
      await waitFor(() => {
        const errorMessages = screen.getAllByText(/Invalid.*number format/i);
        expect(errorMessages.length).toBeGreaterThan(0);
      });

      // Test valid format
      fireEvent.change(mobileInput, { target: { value: '12345678' } });
      fireEvent.click(screen.getByRole('button', { name: /To Payment/ }));
      
      await waitFor(() => {
        const errorMessages = screen.queryAllByText(/Invalid.*number format/i);
        expect(errorMessages.length).toBe(0);
      });
    });

    it('trims whitespace from names in form submission', async () => {
      // Fill required fields
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Gift' }));
        fireEvent.change(screen.getByPlaceholderText('xxxxxx-xxxx (Organization Number)'), 
          { target: { value: '123456-7890' } });
        fireEvent.change(screen.getByPlaceholderText('company@example.com (Company Email)'), 
          { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('First Name'), 
          { target: { value: '  John  ' } });
        fireEvent.change(screen.getByPlaceholderText('Last Name'), 
          { target: { value: '  Doe  ' } });
        fireEvent.change(screen.getByPlaceholderText('Mobile Number'), 
          { target: { value: '12345678' } });
      });

      // Submit form
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /To Payment/ }));
      });

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/payment', 
          expect.objectContaining({
            state: expect.objectContaining({
              fullName: 'John Doe'
            })
          })
        );
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle invalid email formats", async () => {
      render(<Donation />);
      
      // Fill form with invalid email
      const emailInput = screen.getByPlaceholderText("Email Address*");
      fireEvent.change(emailInput, { target: { value: "invalid-email" } });
      
      // Submit form
      const form = screen.getByRole("form");
      fireEvent.submit(form);
      
      // Check for error message
      expect(screen.getByText("Invalid email format")).toBeInTheDocument();
    });

    it("should handle invalid mobile number formats", async () => {
      render(<Donation />);
      
      // Fill form with invalid phone number
      const phoneInput = screen.getByPlaceholderText("Mobile Number*");
      fireEvent.change(phoneInput, { target: { value: "123" } });
      
      // Submit form
      const form = screen.getByRole("form");
      fireEvent.submit(form);
      
      // Check for error message
      expect(screen.getByText("Invalid mobile number format (8-15 digits)")).toBeInTheDocument();
    });

    it("should handle decimal donation amounts", async () => {
      render(<Donation />);
      
      // Click optional donation
      const optionalButton = screen.getByText("OPTIONAL");
      fireEvent.click(optionalButton);
      
      // Enter decimal amount
      const customInput = screen.getByPlaceholderText("Enter optional amount");
      fireEvent.change(customInput, { target: { value: "100.50" } });
      
      // Check if value is properly formatted
      expect(customInput).toHaveValue("100.50");
    });

    it("should prevent multiple decimal points", async () => {
      render(<Donation />);
      
      // Click optional donation
      const optionalButton = screen.getByText("OPTIONAL");
      fireEvent.click(optionalButton);
      
      // Try to enter multiple decimal points
      const customInput = screen.getByPlaceholderText("Enter optional amount");
      fireEvent.change(customInput, { target: { value: "100.50.25" } });
      
      // Check if only first decimal point is kept
      expect(customInput).toHaveValue("100.50");
    });

    it("should handle tax reduction checkbox for large amounts", async () => {
      render(<Donation />);
      
      // Click optional donation
      const optionalButton = screen.getByText("OPTIONAL");
      fireEvent.click(optionalButton);
      
      // Enter amount over 10,000
      const customInput = screen.getByPlaceholderText("Enter optional amount");
      fireEvent.change(customInput, { target: { value: "15000" } });
      
      // Check if tax reduction is automatically checked and disabled
      const taxCheckbox = screen.getByRole("checkbox");
      expect(taxCheckbox).toBeChecked();
      expect(taxCheckbox).toBeDisabled();
    });

    it("should handle form submission with network errors", async () => {
      // Mock navigate to throw error
      const mockNavigate = jest.fn().mockImplementation(() => {
        throw new Error("Network error");
      });
      jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useNavigate: () => mockNavigate
      }));

      render(<Donation />);
      
      // Fill form with valid data
      fireEvent.change(screen.getByPlaceholderText("Email Address*"), {
        target: { value: "test@example.com" }
      });
      fireEvent.change(screen.getByPlaceholderText("Mobile Number*"), {
        target: { value: "1234567890" }
      });
      
      // Submit form
      const form = screen.getByRole("form");
      fireEvent.submit(form);
      
      // Check for error message
      expect(screen.getByText("An error occurred while submitting the form. Please try again.")).toBeInTheDocument();
    });
  });
}); 