import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { TUserPageContent, TDonation } from '../types/types';
import { userContent } from '../constants/contents';

type UserContextType = {
  user: TUserPageContent | null;
  setUser: (user: TUserPageContent) => void;
  addDonation: (donation: TDonation) => void;
  updateUser: (userData: Partial<TUserPageContent>) => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = 'user_data';

const validateUserData = (data: any): TUserPageContent => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid user data format');
  }

  const user = data.user || {};
  const donations = Array.isArray(data.donations) ? data.donations : [];

  return {
    user: {
      fullName: String(user.fullName || ''),
      email: String(user.email || ''),
      phone: String(user.phone || ''),
      mobile: String(user.mobile || ''),
      address: String(user.address || ''),
      profileImage: String(user.profileImage || ''),
    },
    donations
  };
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUserPageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = () => {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUser(validateUserData(parsedData));
        } else {
          setUser({
            user: {
              fullName: userContent.user.fullName,
              email: userContent.user.email,
              phone: userContent.user.phone,
              mobile: userContent.user.mobile,
              address: userContent.user.address,
              profileImage: userContent.user.profileImage,
            },
            donations: userContent.donations
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const saveUserData = (data: TUserPageContent) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving user data:', error);
      throw new Error('Failed to save user data');
    }
  };

  const addDonation = (donation: TDonation) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      donations: [...user.donations, donation]
    };

    setUser(updatedUser);
    saveUserData(updatedUser);
  };

  const updateUser = async (userData: Partial<TUserPageContent>) => {
    if (!user) {
      throw new Error('User data not available');
    }

    try {
      const updatedUser = {
        ...user,
        ...userData
      };

      setUser(updatedUser);
      saveUserData(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user data');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser, addDonation, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};