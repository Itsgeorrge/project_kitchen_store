import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HowTo = () => {
  return (
    <div>
      <Image
        src="/assets/images/households.jpg"
        alt="Home Image"
        width={1920}
        height={1080}
        style={{ objectFit: 'cover' }}
        className="w-full h-screen object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center text-center">
        <div className="bg-white bg-opacity-50 p-4 rounded">
          <p className="text-lg font-bold mb-4">
            Videos that demonstrate how to use some products
          </p>
          <p className="text-gray-500">Coming soon</p>
          <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowTo;

