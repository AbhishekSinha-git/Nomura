
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  fullName: string;
  userType: 'volunteer' | 'organizer';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, userType?: 'volunteer' | 'organizer') => Promise<boolean>;
  signup: (fullName: string, email: string, password: string, userType: 'volunteer' | 'organizer') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const storedUser = localStorage.getItem('cleanwave_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('cleanwave_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, userType: 'volunteer' | 'organizer' = 'volunteer'): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate authentication with basic validation
    if (email && password.length >= 6) {
      // Check if it's an organizer email (simple simulation)
      const isOrganizer = email.includes('organizer') || userType === 'organizer';
      
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        fullName: email.split('@')[0],
        userType: isOrganizer ? 'organizer' : 'volunteer'
      };
      
      setUser(userData);
      localStorage.setItem('cleanwave_user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (fullName: string, email: string, password: string, userType: 'volunteer' | 'organizer'): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate registration with validation
    if (fullName && email && password.length >= 6) {
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        fullName,
        userType
      };
      
      setUser(userData);
      localStorage.setItem('cleanwave_user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cleanwave_user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
