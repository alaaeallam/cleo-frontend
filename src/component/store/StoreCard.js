import React from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';

import useAsync from '@hooks/useAsync';
import StoreServices from '@services/StoreServices';

const StoreCard = () => {

    const { data, error } = useAsync(() => StoreServices.getShowingStore());
    const router = useRouter();

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
                                    `/search?Store=${products.name}`
                                )
                            }
                            className="group box-border overflow-hidden flex rounded-lg shadow-lg pe-0 flex-col items-center bg-white relative">
                            <div
                                className="relative mt-4 flex justify-center w-full cursor-pointer"
                            >
                                <Image
                                    src={products.icon}
                                    width={160}
                                    height={160}
                                    alt={products.name}
                                    className="object-cover rounded-xl transition duration-150 ease-linear transform group-hover:scale-105"
                                />
                            </div>
                            <div className="w-full px-3 lg:px-4 pb-4 mt-2 overflow-hidden">
                                <div className="relative mb-1">
                                    <h2 className="text-heading truncate mb-0 block text-sm font-medium text-gray-600">
                                        <span className="line-clamp-2 text-center hover:text-orange-500 cursor-pointer">{products.name}</span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </>
            )}
        </>
    )
}

export default StoreCard