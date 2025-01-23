'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import supabase from '../utils/supabase';
import ImageKit from 'imagekit';

const Form = ({ type, submitting, handleSubmit }) => {
  const [post, setPost] = useState({
    photo: null,
    photoName: '',
    priceDetails: '',
  });

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLICKEY,
  privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATEKEY,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URLENDPOINT,
});

  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const validateForm = () => {
    const errors = {};
    if (!post.photoName) errors.photoName = 'Photo name is required';
    if (!post.priceDetails) errors.priceDetails = 'Price details are required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setSelectedFile(selectedFile);
    console.log('Selected file:', selectedFile);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      console.log('Creating new post...');
  
      // Upload image to ImageKit
      const imageData = await imagekit.upload({
        file: selectedFile,
        fileName: selectedFile.name,
      });
  
      // Update post state with uploaded image data
      setPost((prevPost) => ({ ...prevPost, photo: imageData }));
  
      // Get the optimized image URLs from ImageKit
      const optimizedImageUrlSmall = `${imageData.url}?tr=w-300,h-400,q-80`;
      const optimizedImageUrlMedium = `${imageData.url}?tr=w-500,h-600,q-80`;
      const optimizedImageUrlLarge = `${imageData.url}?tr=w-800,h-1000,q-80`;
  
      // Download the optimized images from ImageKit
      const imageResponseSmall = await fetch(optimizedImageUrlSmall);
      const imageBlobSmall = await imageResponseSmall.blob();
      const fileSmall = new File([imageBlobSmall], `${imageData.name.split('.').slice(0, -1).join('.')}-small.jpg`, {
        type: imageBlobSmall.type,
      });
  
      const imageResponseMedium = await fetch(optimizedImageUrlMedium);
      const imageBlobMedium = await imageResponseMedium.blob();
      const fileMedium = new File([imageBlobMedium], `${imageData.name.split('.').slice(0, -1).join('.')}-medium.jpg`, {
        type: imageBlobMedium.type,
      });
  
      const imageResponseLarge = await fetch(optimizedImageUrlLarge);
      const imageBlobLarge = await imageResponseLarge.blob();
      const fileLarge = new File([imageBlobLarge], `${imageData.name.split('.').slice(0, -1).join('.')}-large.jpg`, {
        type: imageBlobLarge.type,
      });
  
      // Upload files to Supabase
      const { data: smallData, error: smallError } = await supabase.storage
        .from('photos')
        .upload(`${imageData.name.split('.').slice(0, -1).join('.')}-small.jpg`, fileSmall, {
          upsert: true,
          contentType: 'application/octet-stream',
        });
  
      const { data: mediumData, error: mediumError } = await supabase.storage
        .from('photos')
        .upload(`${imageData.name.split('.').slice(0, -1).join('.')}-medium.jpg`, fileMedium, {
          upsert: true,
          contentType: 'application/octet-stream',
        });
  
      const { data: largeData, error: largeError } = await supabase.storage
        .from('photos')
        .upload(`${imageData.name.split('.').slice(0, -1).join('.')}-large.jpg`, fileLarge, {
          upsert: true,
          contentType: 'application/octet-stream',
        });
  
      if (smallError || mediumError || largeError) {
        console.error('Error uploading file:', smallError || mediumError || largeError);
        return;
      }
      console.log('File uploaded:', smallData, mediumData, largeData);
  
      // Store photo metadata in Supabase
      const { data: metaData, error: metaError } = await supabase
        .from('photos')
        .insert([
          {
            created_at: new Date(),
            photo_name: post.photoName,
            price_details: post.priceDetails,
            photo_url_small: `${smallData.path}`,
            photo_url_medium: `${mediumData.path}`,
            photo_url_large: `${largeData.path}`,
          },
        ]);
      if (metaError) {
        console.error('Error storing photo metadata:', metaError);
        return;
      }
  
      console.log('Photo metadata stored:', metaData);
      alert('Photo uploaded successfully!');
      // Refresh page
      window.location.reload();
  
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };   

  return (
    <section className="w-full max-w-full flex-start flex-col w3-display-container">
      <h1>
        <span className="w3-display-container w3-margin-left w3-cursive w3-xxxlarge">
          {type} Post
        </span>
      </h1>
      <form onSubmit={handleFormSubmit} className="w3-margin w3-padding-48 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span className="w3-margin-top font-satoshi font-semibold text-base text-gray-700">
            Upload Photo
          </span>
          <input
            type="file"
            onChange={handleFileChange}
            name="photo"
            required
            className="form_input"
          />
          {selectedFile && <p>Selected file: {selectedFile.name}</p>}
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Photo Name
          </span>
          <input
            value={post.photoName}
            onChange={handleInputChange}
            name="photoName"
            placeholder="Enter photo name"
            required
            className="form_input"
          />
          {errors.photoName && <p className="text-red-500">{errors.photoName}</p>}
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base">
            Price Details
          </span>
          <textarea
            value={post.priceDetails}
            onChange={handleInputChange}
            name="priceDetails"
            placeholder="Enter price details"
            required
            className="form_textarea"
          />
          {errors.priceDetails && <p className="text-red-500">{errors.priceDetails}</p>}
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 w3-cursive w3-button">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            style={{ backgroundColor: '#FFA07A' }}
            className="w3-button w3-cursive w3-black w3-text-white w3-round-large"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
