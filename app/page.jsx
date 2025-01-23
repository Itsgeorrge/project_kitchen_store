import React from "react"
import Image from 'next/image';
import 'w3-css';
import Feed from "../components/Feed";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { CartProvider } from '../components/Cart';


const Home = () => {
  return (
    <CartProvider>
      <div className="w3-colors.">
        <div className="blur-image">
          <Image src="/assets/images/households2.jpg" alt='Home Image' width={1920} height={540} style={{ width: '100%', height: '60vh', objectFit:'cover' }} className="rounded" />       
        </div>
        <Nav/>
        <p className="text-3xl sm:text-5xl md:text-4xl lg:text-6xl font-bold text-white absolute top-4 left-2 font-lato z-0"> Kitchen Store </p>
        <p className="text-3xl md:text-2xl lg:text-4xl font-bold text-white absolute top-1/4 left-1/2 transform -translate-x-1/2 font-f40 text-center z-0"> Your trusted one stop kitchenware Store </p>
        <div className="next-section" style={{ marginTop: '-50vh', paddingTop: '50vh' }}>
          <Feed/>
          <Footer />
        </div>
      </div>
    </CartProvider>
  )
}

export default Home;
