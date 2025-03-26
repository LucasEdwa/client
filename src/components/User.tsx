import { styles } from "../constants/styles";
import { useUser } from "../contexts/UserContext";
import Swal from 'sweetalert2';

export const User = () => {
  const { user, updateUser } = useUser();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
  };

  const handleEdit = async () => {
    if (!user?.user) {
      Swal.fire('Error', 'User data not available', 'error');
      return;
    }

    try {
      const { value: formValues } = await Swal.fire({
        title: 'Edit Profile',
        html: `
          <input id="fullName" class="swal2-input" placeholder="Full Name" value="${user.user.fullName}" maxlength="100">
          <input id="email" class="swal2-input" placeholder="Email" value="${user.user.email}" maxlength="100">
          <input id="phone" class="swal2-input" placeholder="Phone" value="${user.user.phone}" maxlength="20">
          <input id="mobile" class="swal2-input" placeholder="Mobile" value="${user.user.mobile}" maxlength="20">
          <input id="address" class="swal2-input" placeholder="Address" value="${user.user.address}" maxlength="200">
        `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
          const fullName = (document.getElementById('fullName') as HTMLInputElement).value.trim();
          const email = (document.getElementById('email') as HTMLInputElement).value.trim();
          const phone = (document.getElementById('phone') as HTMLInputElement).value.trim();
          const mobile = (document.getElementById('mobile') as HTMLInputElement).value.trim();
          const address = (document.getElementById('address') as HTMLInputElement).value.trim();

          if (!fullName || !email || !phone || !mobile || !address) {
            Swal.showValidationMessage('All fields are required');
            return false;
          }

          if (!validateEmail(email)) {
            Swal.showValidationMessage('Please enter a valid email address');
            return false;
          }

          if (!validatePhone(phone) || !validatePhone(mobile)) {
            Swal.showValidationMessage('Please enter valid phone numbers');
            return false;
          }

          return { fullName, email, phone, mobile, address };
        }
      });

      if (formValues) {
        await updateUser(formValues);
        Swal.fire('Updated!', 'Your profile has been updated.', 'success');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to update profile. Please try again.', 'error');
      console.error('Profile update error:', error);
    }
  };

  if (!user?.user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.user.container}>
      <div className={styles.user.section}>
        <img
          src={user.user.profileImage || '/default-avatar.png'}
          alt="User"
          className={styles.user.avatar}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/default-avatar.png';
          }}
        />
        <div className={styles.user.infoContainer}>
          <h4 className={styles.user.name}>{user.user.fullName || 'Not specified'}</h4>
          <p className={styles.user.role}>{user.user.email || 'No email provided'}</p>
          <p className={styles.user.location}>{user.user.phone || 'No phone provided'}</p>
          <div className={styles.user.buttonContainer}>
            <button 
              className={styles.user.button}
              onClick={handleEdit}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};