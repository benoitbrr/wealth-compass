import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { InvestmentProfile } from '@/types/database';

export const useInvestmentProfile = () => {
  const [investmentProfile, setInvestmentProfile] = useState<InvestmentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchInvestmentProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('No authenticated user');
      }

      const { data, error: fetchError } = await supabase
        .from('investment_profile')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (fetchError) throw fetchError;
      
      // Transform the data to match our interface
      if (data) {
        setInvestmentProfile({
          ...data,
          asset_categories: Array.isArray(data.asset_categories) ? data.asset_categories : []
        } as InvestmentProfile);
      }
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching investment profile:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInvestmentProfile();

    // Subscribe to investment profile changes
    const channel = supabase
      .channel('investment-profile-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'investment_profile',
        },
        () => {
          fetchInvestmentProfile();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchInvestmentProfile]);

  const updateInvestmentProfile = useCallback(async (updates: Partial<Omit<InvestmentProfile, 'id' | 'user_id' | 'created_at' | 'updated_at'>>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('No authenticated user');
      }

      const { error: updateError } = await supabase
        .from('investment_profile')
        .update(updates)
        .eq('user_id', user.id);

      if (updateError) throw updateError;
      
      // Refetch to get updated data
      await fetchInvestmentProfile();
    } catch (err) {
      console.error('Error updating investment profile:', err);
      throw err;
    }
  }, [fetchInvestmentProfile]);

  return { 
    investmentProfile, 
    updateInvestmentProfile, 
    refreshInvestmentProfile: fetchInvestmentProfile,
    loading, 
    error 
  };
};
