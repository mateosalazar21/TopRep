// src/context/AuthContext.tsx
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
    formCompleted: boolean;
    checkingForm: boolean;
    signOut: () => Promise<void>;
    checkFormStatus: (userId: string) => Promise<void>;
  }
  
  const AuthContext = createContext<AuthContextType | null>(null);
  
  interface Props {
    children: ReactNode;
  }
  
  export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [onboardingCompleted, setOnboardingCompleted] = useState(false);
    const [formCompleted, setFormCompleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [checkingOnboarding, setCheckingOnboarding] = useState(true);
    const [checkingForm, setCheckingForm] = useState(true);
  
    useEffect(() => {
      const getInitialSession = async () => {
        const { data } = await supabase.auth.getSession();
        const session = data.session;
        console.log('[AUTH] Sesión inicial:', session);
  
        if (session?.user) {
          setUser(session.user);
          await checkOnboarding(session.user.id);
          await checkFormStatus(session.user.id);
        } else {
          setUser(null);
          setOnboardingCompleted(false);
          setFormCompleted(false);
          setCheckingOnboarding(false); // ✅ previene splash infinito
          setCheckingForm(false);       // ✅ previene splash infinito
        }
  
        setLoading(false);
      };
  
      getInitialSession();
  
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          await checkOnboarding(session.user.id);
          await checkFormStatus(session.user.id);
        } else {
          setUser(null);
          setOnboardingCompleted(false);
          setFormCompleted(false);
          setCheckingOnboarding(false);
          setCheckingForm(false);
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
  
      setOnboardingCompleted(data?.onboarding_completed ?? false);
      setCheckingOnboarding(false);
    };
  
    const checkFormStatus = async (userId: string) => {
      setCheckingForm(true);
  
      const { data } = await supabase
        .from('athletes')
        .select('form_completed')
        .eq('athlete_id', userId)
        .single();
  
      setFormCompleted(data?.form_completed ?? false);
      setCheckingForm(false);
    };
  
    const signOut = async () => {
      await supabase.auth.signOut();
      setUser(null);
      setOnboardingCompleted(false);
      setFormCompleted(false); // ✅ importante para limpieza
    };
  
    return (
      <AuthContext.Provider
        value={{
          user,
          onboardingCompleted,
          loading,
          checkingOnboarding,
          formCompleted,
          checkingForm,
          signOut,
          checkFormStatus,
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
  