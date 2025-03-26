/**
 * Test suite for the User component
 * Tests user profile display, form validation, and update functionality
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { User } from '../components/User';
import { UserProvider } from '../contexts/UserContext';
import Swal from 'sweetalert2';

declare const global: typeof globalThis;

// Mock SweetAlert2 to handle form dialogs and validation messages
jest.mock('sweetalert2');

/**
 * Mock user data structure matching the UserContext shape
 * Used across all tests to simulate user profile data
 */
const mockUser = {
  user: {
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    mobile: '+1987654321',
    address: '123 Main St',
    profileImage: 'https://example.com/avatar.jpg'
  },
  donations: []
};

/**
 * Mock UserContext to provide test data and mock update function
 * Preserves original UserProvider component while mocking useUser hook
 */
jest.mock('../contexts/UserContext', () => ({
  ...jest.requireActual('../contexts/UserContext'),
  useUser: () => ({
    user: mockUser,
    updateUser: jest.fn().mockResolvedValue(undefined)
  })
}));

const mockShowValidationMessage = jest.fn();

describe('User Component', () => {
  /**
   * Setup before each test:
   * - Clears all mocks
   * - Configures SweetAlert2 mock to handle form inputs and validation
   * - Sets up DOM elements needed for form validation
   */
  beforeEach(() => {
    jest.clearAllMocks();
    (Swal.fire as jest.Mock).mockImplementation(async (config) => {
      if (typeof config === 'object' && config.preConfirm) {
        document.body.innerHTML = `
          <input id="fullName" value="${mockUser.user.fullName}" />
          <input id="email" value="${mockUser.user.email}" />
          <input id="phone" value="${mockUser.user.phone}" />
          <input id="mobile" value="${mockUser.user.mobile}" />
          <input id="address" value="${mockUser.user.address}" />
        `;
        
        try {
          const result = await config.preConfirm();
          if (result === false) {
            return { isConfirmed: false };
          }
          return { isConfirmed: true, value: result };
        } catch (error) {
          return { isConfirmed: false };
        }
      }
      return { isConfirmed: true };
    });
    (Swal.showValidationMessage as jest.Mock) = mockShowValidationMessage;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  /**
   * Helper function to render the User component with required context
   * Used across all tests to maintain consistent component setup
   */
  const renderUser = () => {
    return render(
      <UserProvider>
        <User />
      </UserProvider>
    );
  };

  /**
   * Tests basic user information display
   * Verifies that user's name, email, and phone are rendered correctly
   */
  it('renders user information correctly', () => {
    renderUser();
    expect(screen.getByText(mockUser.user.fullName)).toBeInTheDocument();
    expect(screen.getByText(mockUser.user.email)).toBeInTheDocument();
    expect(screen.getByText(mockUser.user.phone)).toBeInTheDocument();
  });

  /**
   * Tests fallback avatar behavior
   * Verifies that default avatar is shown when profile image fails to load
   */
  it('shows default avatar when profile image fails to load', () => {
    renderUser();
    const avatar = screen.getByAltText('User') as HTMLImageElement;
    fireEvent.error(avatar);
    expect(avatar.src).toContain('default-avatar.png');
  });

  /**
   * Tests email validation in edit form
   * Verifies that invalid email format triggers appropriate error message
   */
  it('validates email format in edit form', async () => {
    renderUser();
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    const emailInput = document.getElementById('email') as HTMLInputElement;
    emailInput.value = 'invalid-email';

    // Trigger the preConfirm function
    const preConfirm = (Swal.fire as jest.Mock).mock.calls[0][0].preConfirm;
    await preConfirm();

    await waitFor(() => {
      expect(mockShowValidationMessage).toHaveBeenCalledWith('Please enter a valid email address');
    });
  });

  /**
   * Tests phone number validation in edit form
   * Verifies that invalid phone format triggers appropriate error message
   */
  it('validates phone format in edit form', async () => {
    renderUser();
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    const phoneInput = document.getElementById('phone') as HTMLInputElement;
    phoneInput.value = 'invalid-phone';

    // Trigger the preConfirm function
    const preConfirm = (Swal.fire as jest.Mock).mock.calls[0][0].preConfirm;
    await preConfirm();

    await waitFor(() => {
      expect(mockShowValidationMessage).toHaveBeenCalledWith('Please enter valid phone numbers');
    });
  });

  /**
   * Tests required fields validation in edit form
   * Verifies that empty required fields trigger appropriate error message
   */
  it('validates required fields in edit form', async () => {
    renderUser();
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    const fullNameInput = document.getElementById('fullName') as HTMLInputElement;
    fullNameInput.value = '';

    // Trigger the preConfirm function
    const preConfirm = (Swal.fire as jest.Mock).mock.calls[0][0].preConfirm;
    await preConfirm();

    await waitFor(() => {
      expect(mockShowValidationMessage).toHaveBeenCalledWith('All fields are required');
    });
  });

  /**
   * Tests successful user information update
   * Verifies that valid form submission shows success message
   */
  it('successfully updates user information', async () => {
    renderUser();
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    const fullNameInput = document.getElementById('fullName') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    fullNameInput.value = 'Jane Doe';
    emailInput.value = 'jane@example.com';

    // Trigger the preConfirm function
    const preConfirm = (Swal.fire as jest.Mock).mock.calls[0][0].preConfirm;
    await preConfirm();

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        'Updated!',
        'Your profile has been updated.',
        'success'
      );
    });
  });

  /**
   * Tests error handling during profile update
   * Verifies that update failures show appropriate error message
   */
  it('handles errors during update', async () => {
    (Swal.fire as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Update failed');
    });

    renderUser();
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        'Error',
        'Failed to update profile. Please try again.',
        'error'
      );
    });
  });
}); 