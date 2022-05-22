import Image from 'next/image';
import { useRouter } from 'next/router';

import useAsync from '@hooks/useAsync';
import BrandServices from '@services/BrandServices';

const BrandCard = () => {

  const router = useRouter();
  const { data, error } = useAsync(() => BrandServices.getShowingBrand());

  return (
    <>
      {error ? (
        <p className="flex justify-center align-middle items-center m-auto text-xl text-red-500">
          <span> {error}</span>
        </p>
      ) : (
        <>
          {data.map((products, i) => (
            <div
              key={i}
              onClick={() =>
                router.push(
                  `/search?Brand=${products.name}`
                )
              }
              className="group box-border overflow-hidden flex rounded-full shadow-lg pe-0 flex-col items-center bg-white relative">
              <div
                className="relative flex justify-center w-full cursor-pointer"
              >
                <Image
                  src={products.icon}
                  width={160}
                  height={160}
                  alt={products.name}
                  className="object-cover transition duration-150 ease-linear transform group-hover:scale-105"
                />
              </div>
              <div className="w-full px-3 lg:px-4 pb-4 overflow-hidden">
                <div className="relative mb-1">
                  <h2 className="text-heading truncate mb-0 block text-sm font-medium text-gray-600">
                    <span className="line-clamp-2 text-center">{products.name}</span>
                  </h2>
                </div>
              </div>
            </div>
          ))
          }
        </>
      )}
    </>
  );
};

export default BrandCard;
