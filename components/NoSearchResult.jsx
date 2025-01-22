import Image from 'next/image';

const NoSearchResults = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-15">
   <h2 className="text-2xl font-bold mb-4 text-center pr-4">Oops, seems like we don't have that Product</h2>
    <Image 
      src="/assets/images/empty.png" 
      alt="Magnifying Glass" 
      width={500} 
      height={100} />
    </div>
  );
};

export default NoSearchResults;
