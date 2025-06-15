'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import {useRouter} from 'next/navigation';

interface I_AuthCredentials {
    email: string;
    password: string;
}

interface I_UserSession {
    userId: string;
    email: string;
    name: string;
    permissions?: 'admin' | 'user';
}

interface I_AuthContextType {
    isAuthenticated: boolean;
    user: I_UserSession | null;
    signin: (credentials: I_AuthCredentials) => Promise <void>;
    signout: () => void;
}

const AuthContext = createContext<I_AuthContextType>({
    isAuthenticated: false,
    user: null,
    signin: async () => {},
    signout: () => {},
})

export const AuthProvider = ({ children}: { children: ReactNode }) =>{

    const [user, setUser] = useState <I_UserSession | null>(null);
    const [loading, setLoading] = useState<boolean>(true); 
    const router = useRouter();

    useEffect(()=>{
        const initializeAuth = async () => {
            const token: string | null = localStorage.getItem('token');
            if (token){
                try{
                    const response = await fetch('/api/auth/validate', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    })
                    if (response.ok) {
                        const userSession: I_UserSession = await response.json();
                        setUser(userSession);
                        console.log('User session restored:', userSession);
                    } else {
                        console.error('Failed to validate token');
                        localStorage.removeItem('token');
                    }
                } catch (error) {
                    console.error('Error validating token:', error);
                    localStorage.removeItem('token');
                }
            }
        };

        initializeAuth();
    }, []);

    const signin = async (credentials: I_AuthCredentials) => {
        console.log('Signing in with credentials:', credentials);

        if (credentials.email === 'gimorales@gmail.com' && credentials.password === '123456') {
            const userSession: I_UserSession = {
                userId: '1',
                email: credentials.email,
                name: 'Gimenez Morales',
                permissions: 'admin',
            };
            setUser(userSession);
            router.push('/dashboard');
        }else {
            console.error('Invalid credentials');
            throw new Error('Invalid credentials');
        }
    };

    const signout = () => {
        console.log('Signing out');
        setUser(null);
        router.push('/login');
    };

    useEffect(()=>{
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
