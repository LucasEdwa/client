import { createContext, useState, ReactNode, useContext } from 'react';
import { themes } from '../constants/styles';
import type { IThemes } from '../models/ITheme';

type ThemeContextType = {
  theme: IThemes[keyof IThemes];
  toggleTheme: () => void;
  currentTheme: 'primary' | 'secondary';
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.primary,
  currentTheme: 'primary',
  toggleTheme: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<'primary' | 'secondary'>('primary');

  const toggleTheme = () => {
    setCurrentTheme(prev => prev === 'primary' ? 'secondary' : 'primary');
  };

  return (
    <ThemeContext.Provider value={{ 
      theme: themes[currentTheme], 
      currentTheme,
      toggleTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}; 