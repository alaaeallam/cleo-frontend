import Image from 'next/image';
import { useRouter } from 'next/router';
const CatProdCard = ({ product }) => {
  const router = useRouter();

  return (
    <>
      <div
        onClick={() =>
          router.push(
            `/search?Category=${product.category
              .toLowerCase()
              .replace('&', '')
              .split(' ')
              .join('-')}`
          )
        }
        className="group box-border border-solid border-2 border-emerald-500 overflow-hidden flex rounded-lg shadow-sm pe-0 flex-col items-center bg-white relative">
        <div
          className="relative flex justify-center w-full cursor-pointer"
        >
          <Image
            src={product.icon}
            width={160}
            height={160}
            alt={product.category}
            className="object-cover transition duration-150 ease-linear transform group-hover:scale-105"
          />
        </div>
        <div className="w-full px-3 lg:px-4 pb-4 overflow-hidden">
          <div className="relative mb-1">
            <h2 className="text-heading truncate mb-0 block text-sm font-medium text-gray-600">
              <span className="line-clamp-2 ">{product.category}</span>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default CatProdCard;
