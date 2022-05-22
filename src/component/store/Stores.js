import React from 'react'
import { useRouter } from 'next/router';
import useAsync from '@hooks/useAsync';
import Image from 'next/image';
import StoreServices from '@services/StoreServices';

const Stores = () => {

    const { data, error } = useAsync(() => StoreServices.getShowingStore());
    const router = useRouter();

    return (
        <>
            {error ? (
                <p className="flex justify-center align-middle items-center m-auto text-xl text-red-500">
                    <span> {error}</span>
                </p>
            ) : (
                data.map((store, i) => (
                    <div
                        key={i}
                        onClick={() =>
                            router.push(
                                `/search?Store=${store.name}`
                            )
                        }
                        className="coupon coupon-home cursor-pointer mx-6 my-5 block md:flex lg:flex md:justify-between lg:justify-between items-center bg-white rounded-md shadow"
                    >
                        <div className="tengah py-2 px-3 flex items-center justify-items-start">
                            <figure>
                                <Image
                                    src={store.icon}
                                    alt={store.name}
                                    width={120}
                                    height={120}
                                    className="rounded-full"
                                />
                            </figure>
                        </div>
                        <div className="md:border-l-2 lg:border-l-2 border-dotted lg:w-1/2 md:w-1/3 relative px-4">
                            <div className="info flex items-center">
                                <div className="w-full">
                                    <div className="flex items-center font-serif">
                                        <h6 className="pl-1 text-base font-medium text-gray-600">
                                            {store.name}
                                        </h6>
                                    </div>
                                    <h6 className="pl-1 font-serif text-sm text-gray-700 leading-6 font-semibold mb-2">
                                        {store.city}
                                    </h6>
                                    <h6 className="pl-1 font-serif text-sm text-gray-700 leading-6 font-semibold mb-2">
                                        {store.address}
                                    </h6>
                                    <h6 className="pl-1 font-serif text-sm text-gray-700 leading-6 font-semibold mb-2">
                                        {store.phone}
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                ))}
        </>
    )
}

export default Stores