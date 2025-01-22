import React from 'react';
import Image from 'next/image';

const NotConnected = () => {
  return (
    <div className="text-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Oops!</h2>
      <p className="text-lg">Looks like you are not connected to the internet.</p>
      <Image
        src="/assets/icons/error.png"
        alt="cloud"
        width={100}
        height={100}
        className="mx-auto"
      />
    </div>
  );
};

export default NotConnected;

