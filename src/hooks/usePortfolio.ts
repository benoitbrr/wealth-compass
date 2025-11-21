import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Account, Position, PortfolioData } from '@/types/database';

export const usePortfolio = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    accounts: [],
    positions: [],
    totalAssets: 0,
    cashBalance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPortfolio = useCallback(async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('No authenticated user');
      }

      // Fetch accounts
      const { data: accountsData, error: accountsError } = await supabase
        .from('accounts')
        .select('*')
        .eq('user_id', user.id);

      if (accountsError) throw accountsError;

      // Fetch positions
      const { data: positionsData, error: positionsError } = await supabase
        .from('positions')
        .select('*')
        .eq('user_id', user.id);

      if (positionsError) throw positionsError;

      const accounts = accountsData || [];
      const positions = positionsData || [];

      // Calculate totals
      const cashBalance = accounts.reduce((sum, acc) => sum + Number(acc.balance), 0);
      const investedValue = positions.reduce((sum, pos) => sum + Number(pos.current_value), 0);
      const totalAssets = cashBalance + investedValue;

      setPortfolioData({
        accounts,
        positions,
        totalAssets,
        cashBalance,
      });
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching portfolio:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolio();

    // Subscribe to accounts changes
    const accountsChannel = supabase
      .channel('accounts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'accounts',
        },
        () => {
          fetchPortfolio();
        }
      )
      .subscribe();

    // Subscribe to positions changes
    const positionsChannel = supabase
      .channel('positions-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'positions',
        },
        () => {
          fetchPortfolio();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(accountsChannel);
      supabase.removeChannel(positionsChannel);
    };
  }, [fetchPortfolio]);

  return { 
    ...portfolioData,
    refreshPortfolio: fetchPortfolio,
    loading, 
    error 
  };
};
