import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

// 1. Tipamos lo que va a tener el contexto
interface AuthContextType {
    user: User | null;
    onboardingCompleted: boolean;
    loading: boolean;
    signOut: () => Promise<void>;
}

// 2. Creamos el contexto con ese tipo
const AuthContext = createContext<AuthContextType | null>(null);

// 3. Tipamos el AuthProvider para aceptar children
interface Props {
    children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [onboardingCompleted, setOnboardingCompleted] = useState(false);
    const [loading, setLoading] = useState(true);

    // Al montar, revisamos si hay una sesión activa y si el onboarding está completo
    useEffect(() => {
        const init = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session?.user) {
                setUser(data.session.user);
                await checkOnboarding(data.session.user.id);
            }
            setLoading(false);
        };
        init();
        
        // Escuchamos cambios de sesión (login, logout, refresh)
        const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                setUser(session.user);
                await checkOnboarding(session.user.id);
            } else {
                setUser(null);
                setOnboardingCompleted(false);
            }
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    // Verificamos si el usuario ya completó el onboarding
    const checkOnboarding = async (userId: string) => {
        const { data } = await supabase
            .from('athletes')
            .select('onboarding_completed')
            .eq('athlete_id', userId)
            .single();
        if (data?.onboarding_completed) setOnboardingCompleted(true);
    };

    // Cierre de sesión
    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setOnboardingCompleted(false);
    };

    return (
        <AuthContext.Provider
            value={{ user, onboardingCompleted, signOut, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Hook para consumir el contexto desde cualquier parte
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
