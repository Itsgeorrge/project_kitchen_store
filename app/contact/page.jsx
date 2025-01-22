'use client';
import React, { useState } from 'react';
import Nav2 from '@/components/Nav2';
import supabase from '@/utils/supabase';
import Footer from '@/components/Footer';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!name) errors.name = 'Name is required';
    if (!email) errors.email = 'Email is required';
    if (!message) errors.message = 'Message is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([{ name, email, message }]);
      if (error) {
        console.error(error);
      } else {
        console.log(data);
        alert('Message sent!');
        // Reset the form fields
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div>
    <div className="mb-4 fixed top-0 left-0 right-0 z-50">
  <Nav2 />
    </div>

      <section id="contact" className="py-20 bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-10">Contact</h1>
        <div className="max-w-md mx-auto bg-white p-8 rounded">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                rows={5}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
              />
            </div>
            <button type='submit' 
            disabled={submitting}
              className="w3-button bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send Message
            </button>
          </form>
        </div>
        <div className="max-w-md mx-auto mt-10">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <ul>
            <li className="mb-4">
              <i className="fas fa-map-marker-alt mr-2" />
              <span>Blantyre, Malawi</span>
            </li>
            <li className="mb-4">
              <i className="fas fa-phone mr-2" />
              <span>(+265) 888325584</span>
            </li>
            <li className="mb-4">
              <i className="fas fa-envelope mr-2" />
              <span>kitchenstoremw@gmail.com</span>
            </li>
          </ul>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Contact;

