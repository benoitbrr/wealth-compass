import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useUserInitialization = () => {
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setLoading(false);
          return;
        }

        // Check if profile exists
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', user.id)
          .single();

        if (!profile) {
          // Create profile
          await supabase.from('profiles').insert({
            id: user.id,
            full_name: user.email?.split('@')[0] || 'Client BNP',
            segment: 'Private Banking',
          });

          // Create account with 60M EUR
          await supabase.from('accounts').insert({
            user_id: user.id,
            name: 'Compte courant BNP Paribas',
            type: 'CURRENT_ACCOUNT',
            currency: 'EUR',
            balance: 60000000.00,
          });

          // Create empty investment profile
          await supabase.from('investment_profile').insert({
            user_id: user.id,
          });

          console.log('User initialized with 60M EUR');
        } else {
          // Check if account exists
          const { data: accounts } = await supabase
            .from('accounts')
            .select('id')
            .eq('user_id', user.id);

          if (!accounts || accounts.length === 0) {
            // Create account with 60M EUR
            await supabase.from('accounts').insert({
              user_id: user.id,
              name: 'Compte courant BNP Paribas',
              type: 'CURRENT_ACCOUNT',
              currency: 'EUR',
              balance: 60000000.00,
            });
            console.log('Account created with 60M EUR');
          }

          // Check if investment profile exists
          const { data: investProfile } = await supabase
            .from('investment_profile')
            .select('id')
            .eq('user_id', user.id);

          if (!investProfile || investProfile.length === 0) {
            await supabase.from('investment_profile').insert({
              user_id: user.id,
            });
            console.log('Investment profile created');
          }
        }

        setInitialized(true);
      } catch (error) {
        console.error('Error initializing user:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  return { initialized, loading };
};
