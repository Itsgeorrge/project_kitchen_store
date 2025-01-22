"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import supabase from '@utils/supabase';
import CartIcon from './CartIcon';

const Nav = () => {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showSideNav, setShowSideNav] = useState(false);
  const [showSignInForm, setShowSignInForm] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error(error);
        } else {
          setSession(data.session);
        }
      } catch (error) {
        if (error.message === 'Auth session missing!') {
          console.error('Authentication session is missing');
        } else {
          console.error(error);
        }
      }
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        setShowSignInForm(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="lg:hidden">
        <nav className="bg-white py-2 sticky top-0 z-10">
          <div className="container mx-auto flex justify-between items-center">
            <h2 className="text-lg font-bold font-absans">Kitchen Store</h2>
            <div className="flex items-center">
              <button className="bg-white text-teal-500 hover:bg-teal-500 hover:text-white py-2 px-4 rounded-md" onClick={() => setShowSideNav(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <CartIcon />
            </div>
          </div>
        </nav>
        {showSideNav && (
          <div className="fixed top-0 left-0 w-64 h-screen bg-white shadow-md p-4 z-40">
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={() => setShowSideNav(false)}>
              X
            </button>
            <h2 className="text-lg font-bold mb-4">Navigation</h2>
            <ul>
              <li className="font-absans mb-4">
                <Link href="/" className="text-gray-700 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/how-to" className="text-gray-700 hover:text-gray-900">
                  How To
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/about-us" className="text-gray-700 hover:text-gray-900">
                  About us
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/contact" className="text-gray-700 hover:text-gray-900">
                  Contact
                </Link>
              </li>
              {session ? (
                <>
                  <li className="mb-4">
                    <Link href="create-post" className="text-gray-700 hover:text-gray-900">
                      Create Post
                    </Link>
                  </li>
                  <li className="mb-4">
                    <button type="button" onClick={handleSignOut} className="text-gray-700 hover:text-gray-900">
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li className="mb-4">
                  <button onClick={() => setShowSignInForm(true)} className="text-lg font-bold mb-4">
                    Sign In
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
      <div className="hidden lg:block">
        <nav className="bg-white py-4 sticky top-0 z-10">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex-1 text-center overflow-x-auto">
              <Link href="/" className="white_btn text-lg text-black hover:text-orange-700 mx-4 inline-block">
                Home
              </Link>
              <Link href="/how-to" className="black_btn text-lg text-black hover:text-blue-700 mx-4 inline-block">
                How To
              </Link>
              <Link href="/about-us" className="black_btn text-lg text-black hover:text-pink-700 mx-4 inline-block">
                About us
              </Link>
              <Link href="/contact" className="black_btn text-lg text-black hover:text-purple-700 mx-4 inline-block">
                Contact
              </Link>
              {session ? (
                <>
                  <Link href="create-post" className="bg-white text-teal-500 hover:bg-teal-500 hover:text-white py-2 px-4 rounded-md mx-2 inline-block">
                    Create Post
                  </Link>
                  <button type="button" onClick={handleSignOut} className="bg-white text-teal-500 hover:bg-teal-500 hover:text-white py-2 px-4 rounded-md mx-2 inline-block">
                    Sign Out
                  </button>
                </>
              ) : (
                <button onClick={() => setShowSignInForm(true)} className="topnav-right bg-black text-white hover:bg-teal-500 hover:text-white py-2 px-4 rounded-md mx-2 inline-block">
                  Sign In
                </button>
              )}
            </div>
            <CartIcon />
          </div>
        </nav>
      </div>
      {showSignInForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md w-full max-w-md relative">
            <button onClick={() => setShowSignInForm(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              X
            </button>
            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}
            <form onSubmit={handleSignIn}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
              </div>
              <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded" type="submit">
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
