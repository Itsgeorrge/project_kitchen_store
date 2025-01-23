import Nav2 from '../../components/Nav2';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Footer from '../../components/Footer';
library.add(faInstagram, faFacebook, faWhatsapp);

const AboutUs = () => {
  return (
    <div>
      <div className="mb-4 fixed top-0 left-0 right-0 z-50">
  <Nav2 />
    </div>
      <div className="container mx-auto p-4 mt-4">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-lg mb-4">
          We are an online store offering all sorts of kitchenware products. Our mission is to provide high-quality products to our customers at affordable prices.
        </p>
        <h2 className="text-2xl font-bold mb-2">Our Terms</h2>
        <ol className="list-disc pl-4 mb-4">
          <li>We send anywhere within Malawi.</li>
          <li>A half deposit payment is required in order to confirm an order.</li>
          <li>We accept various payment methods, including mobile payments and online banking.</li>
        </ol>
        <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
<div className="flex flex-wrap mb-4">
  <a href="https://www.instagram.com/kitchen_store_mw/" className="mr-4 text-gray-400 hover:text-white">
    <FontAwesomeIcon icon={faInstagram} style={{ fontSize: '30px', color: 'black' }} />
  </a>
  <a href="#" className="mr-4 text-gray-400 hover:text-white">
    <FontAwesomeIcon icon={faFacebook} style={{ fontSize: '30px', color: 'black' }}/>
  </a>
  <a href="https://wa.me/265888325584" className="mr-4 text-gray-400 hover:text-white">
    <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: '30px', color: 'black' }} />
  </a>
  <div className="w-full mt-4">
    <p className='font-bold underline'>Note:</p>
    <p>This website is for advertisement purposes only. We do not sell products directly through this website. For more information, please contact us through WhatsApp</p>
   
  </div>
</div>

      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;

