import { User } from "../components/User";
import { useUser } from "../contexts/UserContext";
import Swal from 'sweetalert2';

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const formatDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
};

export const UserPage = () => {
    const { user } = useUser();

    const handleDonationClick = (donation: any) => {
        if (!donation) {
            Swal.fire('Error', 'Invalid donation data', 'error');
            return;
        }

        const donationDetails = `
            <div class="text-left">
                <p><strong>Project:</strong> ${donation.project || 'Not specified'}</p>
                <p><strong>Amount:</strong> ${formatCurrency(Number(donation.amount) || 0)}</p>
                <p><strong>Date:</strong> ${formatDate(donation.date)}</p>
                <p><strong>Payment Method:</strong> ${donation.paymentMethod || 'Not specified'}</p>
                <p><strong>Signature Type:</strong> ${donation.signatureType || 'Not specified'}</p>
                <p><strong>Status:</strong> <span class="text-${donation.status === 'completed' ? 'green' : donation.status === 'pending' ? 'yellow' : 'red'}">${donation.status || 'unknown'}</span></p>
                ${donation.isCompanyDonation ? `
                    <p><strong>Company Name:</strong> ${donation.companyFirstName || ''} ${donation.companyLastName || ''}</p>
                    <p><strong>Company Email:</strong> ${donation.companyEmail || 'Not specified'}</p>
                    <p><strong>Company Registration:</strong> ${donation.companyRegistrationNumber || 'Not specified'}</p>
                    <p><strong>Company Phone:</strong> ${donation.companyMobileNumber || 'Not specified'}</p>
                ` : `
                    <p><strong>Full Name:</strong> ${donation.fullName || 'Not specified'}</p>
                    <p><strong>Email:</strong> ${donation.email || 'Not specified'}</p>
                    <p><strong>Phone:</strong> ${donation.mobileNumber || 'Not specified'}</p>
                    <p><strong>Tax Reduction:</strong> ${donation.checkedForTaxReduction ? 'Yes' : 'No'}</p>
                    ${donation.personalNumber ? `<p><strong>Personal Number:</strong> ${donation.personalNumber}</p>` : ''}
                `}
            </div>
        `;

        Swal.fire({
            title: 'Donation Details',
            html: donationDetails,
            icon: 'info',
            confirmButtonText: 'Close',
            customClass: {
                container: 'donation-modal'
            }
        });
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading user data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="main-body">
                <div className="lg:flex lg:justify-around lg:items-start">
                    <div className="col-md-4 mb-3 lg:items-start">
                        <div className="card shadow-lg">
                            <div className="p-6">
                                <User />
                            </div>
                        </div>
                    </div>
                    <div className="lg:items-start lg:flex lg:flex-col lg:mt-0 lg:ml-8">
                        <div className="card shadow-lg mb-6">
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <h6 className="text-gray-600 mb-2">Full Name</h6>
                                        <p className="text-gray-800">{user.user.fullName || 'Not specified'}</p>
                                    </div>
                                    <div className="col-span-1">
                                        <h6 className="text-gray-600 mb-2">Email</h6>
                                        <p className="text-gray-800">{user.user.email || 'Not specified'}</p>
                                    </div>
                                    <div className="col-span-1">
                                        <h6 className="text-gray-600 mb-2">Phone</h6>
                                        <p className="text-gray-800">{user.user.phone || 'Not specified'}</p>
                                    </div>
                                    <div className="col-span-1">
                                        <h6 className="text-gray-600 mb-2">Mobile</h6>
                                        <p className="text-gray-800">{user.user.mobile || 'Not specified'}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <h6 className="text-gray-600 mb-2">Address</h6>
                                        <p className="text-gray-800">{user.user.address || 'Not specified'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="bg-amber-700 p-4 rounded-lg shadow-lg">
                                <div className="card h-full">
                                    <div className="bg-amber-400 p-4 rounded-lg">
                                        <h6 className="flex items-center mb-4 text-lg font-semibold">
                                            <i className="material-icons text-info mr-2">Donation History</i>
                                            Donation History
                                        </h6>
                                        {user.donations.length === 0 ? (
                                            <p className="text-gray-700 text-center py-4">No donations found</p>
                                        ) : (
                                            user.donations.map((donation) => (
                                                <div 
                                                    key={donation.id}
                                                    onClick={() => handleDonationClick(donation)}
                                                    className="cursor-pointer hover:bg-amber-300 p-3 rounded-lg transition-colors mb-3"
                                                >
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="font-medium">{donation.project || 'Unnamed Project'}</span>
                                                        <span className="font-semibold">{formatCurrency(Number(donation.amount) || 0)}</span>
                                                    </div>
                                                    <div className="text-sm text-gray-600 mb-2">{formatDate(donation.date)}</div>
                                                    <div className="progress" style={{ height: "4px" }}>
                                                        <div 
                                                            className={`progress-bar ${
                                                                donation.status === "completed" ? "bg-green-500" :
                                                                donation.status === "pending" ? "bg-yellow-500" : "bg-red-500"
                                                            }`} 
                                                            role="progressbar" 
                                                            style={{ width: "100%" }} 
                                                            aria-valuenow={100} 
                                                            aria-valuemin={0} 
                                                            aria-valuemax={100}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
