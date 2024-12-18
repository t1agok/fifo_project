"use client";

import { createContext, useContext, useState, useEffect, type Dispatch, type SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth } from '../../lib/api';

interface User {
    user_id: number;
    username: string;
    email: string;
}

interface AuthContextType {
    isAuthenticated: boolean; 
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    isLoading: boolean;
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false, 
    setIsAuthenticated: () => {},
    isLoading: true,
    user: null,
    setUser: () => {},
});

export const AuthProvider = ({ children }: {children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const authenticate = async () => {
            try {
                const authStatus = await checkAuth();
                console.log('checkAuth returned:', authStatus);
                setIsAuthenticated(authStatus.isAuthenticated);
                console.log('Setting User:', authStatus.user);
                setUser(authStatus.user);

                if (!authStatus) {
                    router.push('/auth/login');
                }
            } catch (error) {
                console.error('Error in authenticate:', error);
            } finally {
                setIsLoading(false);
            }
        };        
        authenticate();
    }, [router]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isLoading, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
