import { useState, useEffect } from 'react';
import supabase from './supabase';

const useUser = () => {
  const [user, setUser] = useState(supabase.auth.user);

  useEffect(() => {
    const sessionChanged = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user);
    });

    return () => {
      sessionChanged.data.unsubscribe();
    };
  }, []);

  return user;
};

export default useUser;
