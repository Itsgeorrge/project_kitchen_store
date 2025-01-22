"use client";
import { useState, useEffect } from 'react';
import supabase from '@utils/supabase';
import Nav from './Nav';
import SignIn from './SignIn';

const Main = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
      } else {
        setSession(data.session);
      }
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Nav session={session} onSignOut={handleSignOut} />
      {!session && <SignIn onSignIn={setSession} />}
    </div>
  );
};

export default Main;
