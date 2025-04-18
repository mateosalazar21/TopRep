import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
    user: User | null;
    onboardingCompleted: boolean;
    loading: boolean;
    checkingOnboarding: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [onboardingCompleted, setOnboardingCompleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [checkingOnboarding, setCheckingOnboarding] = useState(false);

    useEffect(() => {
        const getInitialSession = async () => {
            const { data } = await supabase.auth.getSession();
            const session = data.session;

            if (session?.user) {
                setUser(session.user);
                await checkOnboarding(session.user.id);
            }

            setLoading(false); // ✅ Esto se ejecuta después de checkOnboarding
        };

        getInitialSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session?.user) {
                setUser(session.user);
                await checkOnboarding(session.user.id);
            } else {
                setUser(null);
                setOnboardingCompleted(false);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const checkOnboarding = async (userId: string) => {
        setCheckingOnboarding(true);

        const { data } = await supabase
            .from('athletes')
            .select('onboarding_completed')
            .eq('athlete_id', userId)
            .single();

        if (data) {
            setOnboardingCompleted(data.onboarding_completed);
        } else {
            setOnboardingCompleted(false);
        }

        setCheckingOnboarding(false);
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setOnboardingCompleted(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                onboardingCompleted,
                loading,
                checkingOnboarding,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
