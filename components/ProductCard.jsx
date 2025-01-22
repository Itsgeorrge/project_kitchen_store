"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import supabase from '@utils/supabase';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from './Cart';
import 'lazysizes';

const ProductCard = ({ post, handleEdit }) => {
  console.log('Post object:', post);
  const router = useRouter();
  const pathName = usePathname();
  const [session, setSession] = useState(null);
  const { addToCart } = useCart();

  // animation
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const handleAddToWishlist = () => {
    setAddedToWishlist(true);
    setTimeout(() => {
      setAddedToWishlist(false);
    }, 1500);
  };
  const handleAddToCart = () => {
    addToCart(post);
  };

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error getting user:', error);
        setSession(null);
      } else if (data) {
        setSession(data);
      } else {
        setSession(null);
      }
    };
    getUser();
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleDelete = async (id) => {
    if (typeof id !== 'number') {
      console.error('Invalid id:', id);
      return;
    }
    try {
      // Delete the photo metadata from Supabase database
      const { data, error } = await supabase
        .from('photos')
        .delete()
        .eq('id', id);
      if (error) {
        throw error;
      }
      window.location.reload();
      console.log('Photo metadata deleted:', data);
      // Delete the photo from Supabase storage
      const { data: storageData, error: storageError } = await supabase.storage
        .from('photos')
        .remove([`${id}.jpg`]);
      if (storageError) {
        throw storageError;
      }
      console.log('Photo deleted:', storageData);
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const checkUserExists = async (email) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();
      if (error) {
        throw error;
      }
      return data ? true : false;
    } catch (error) {
      console.error('Error checking user existence:', error);
      return false;
    }
  };

  const photoUrl = `https://rrfluqecctrhzkcxpsbt.supabase.co/storage/v1/object/public/photos/${post.photo_url_small}`;

  // console.log('Photo URL:', photoUrl);

  if (!photoUrl) {
    console.error('Photo URL is empty or null');
    return null;
  }
  const publicUrl = `https://rrfluqecctrhzkcxpsbt.supabase.co/storage/v1/object/public/photos/${post.photo_url_small}`;

  // console.log('Public URL:', publicUrl);

  return (
    <div className="card">
    <picture>
      <source
        data-srcset={`https://rrfluqecctrhzkcxpsbt.supabase.co/storage/v1/object/public/photos/${post.photo_url_small}`}
        media="(max-width: 768px)"
        className="lazyload"
      />
      <source
        data-srcset={`https://rrfluqecctrhzkcxpsbt.supabase.co/storage/v1/object/public/photos/${post.photo_url_medium}`}
        media="(max-width: 1200px)"
        className="lazyload"
      />
      <img
        data-src={`https://rrfluqecctrhzkcxpsbt.supabase.co/storage/v1/object/public/photos/${post.photo_url_large}`}
        alt={post.photo_name}
        className="lazyload"
      />
    </picture>

      <h1 className="mt-4 w3-xxlarge font-sans">{post.photo_name}</h1>
      <p className="price mt-4 font-hero">MK{post.price_details}</p>
      <button className="mt-4 card_button rounded font-hero" onClick={(e) => {
        e.preventDefault();
        handleAddToCart();
        handleAddToWishlist();
      }}
      >
        Add to
 Wishlist
      </button>
      {addedToWishlist && (
        <p className="text-green-500 font-bold animate-fade-in-out">
          <span>Added to Wishlist</span>
        </p>
      )}
      {session?.user && (
        <div>
          <p className="mt-4 edit-delete-btns font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}
          >
            Edit
          </p>
          <p className="mt-4 edit-delete-btns font-inter text-sm orange_gradient cursor-pointer" onClick={() => handleDelete(post._id)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
