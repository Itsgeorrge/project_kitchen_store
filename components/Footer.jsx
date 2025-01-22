import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faInstagram, faFacebook, faWhatsapp);

const Footer = () => {
  return (
        <footer className="w-full bg-gray-900 text-white p-4 mt-4">
          <div className="container mx-auto p-4 ">
            <div className="flex flex-wrap justify-center">
              <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                <h5 className="text-xl font-bold mb-2">Kitchen Store</h5>
                <p className="text-gray-400">Your one-stop shop for all kitchen needs</p>
              </div>
              <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                <h5 className="text-xl font-bold mb-2">Quick Links</h5>
                <ul className="list-none mb-0">
                  <li className="mb-2">
                    <a href="/" className="text-gray-400 hover:text-white">Home</a>
                  </li>
                  <li className="mb-2">
                    <a href="/how-to" className="text-gray-400 hover:text-white">How To</a>
                  </li>
                  <li className="mb-2">
                    <a href="/about-us" className="text-gray-400 hover:text-white">About Us</a>
                  </li>
                  <li className="mb-2">
                    <a href="contact" className="text-gray-400 hover:text-white">Contact</a>
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                <h5 className="text-xl font-bold mb-2">Follow Us</h5>
                <div className="flex mb-4">
                  <a href="https://www.instagram.com/kitchen_store_mw/" className="mr-4 text-gray-400 hover:text-white">
                  <FontAwesomeIcon icon={faInstagram} style={{ fontSize: '24px', color: 'white' }} />
                  </a>
                  <a href="#" className="mr-4 text-gray-400 hover:text-white">
                  <FontAwesomeIcon icon={faFacebook} style={{ fontSize: '24px', color: 'white' }}/>
                  </a>
                  <a href="https://wa.me/265888325584" className="mr-4 text-gray-400 hover:text-white">
                    <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: '24px', color: 'white' }} />
                  </a>
                </div>
               <div className="flex justify-between">
                  <p className="w-1/2 mr-2">
                  +265888325584
                    </p>
                  <p   className="w-1/2 p-2 mr-2">
                  kitchenstoremw@gmail.com
                   </p>
                </div> 
              </div>
            </div>
            <div className="text-center text-gray-400 text-sm">
              &copy; 2025 Kitchen Store. Powered by <p className='underline'>Smart Studios</p>
            </div>
            <div className="text-center text-gray-400 text-sm mt-2">
          <p>
            Notice: This website is for advertising purposes only. All information provided is subject to change without notice.
          </p>
        </div>
      </div>
    </footer>
  );
};


    export default Footer;
