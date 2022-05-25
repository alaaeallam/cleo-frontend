import useSessionstorage from '@rooks/use-sessionstorage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";

//internal import
import Layout from 'src/layout/Layout';
import Banner from '@component/banner/Banner';
import CardTwo from '@component/cta-card/CardTwo';
import OfferCard from '@component/offer/OfferCard';
import StickyCart from '@component/cart/StickyCart';
import ProductServices from '@services/ProductServices';
import ProductCard from '@component/product/ProductCard';
import CatProdCard from '@component/category/CatProdCard';
import BrandCard from '@component/brand/BrandCard';
import MainCarousel from '@component/carousel/MainCarousel';
import FeatureCategory from '@component/category/FeatureCategory';
import CategoryServices from '@services/CategoryServices';
import BrandServices from '@services/BrandServices';
import useAsync from '@hooks/useAsync';
import useAsyncs from '@hooks/useAsyncs';

const Home = ({ products, popularProducts, discountProducts }) => {
  const [value, set] = useSessionstorage('products', products);
  const { data, error } = useAsync(() => CategoryServices.getShowingCategory());
  const { datas, errors } = useAsyncs(() => BrandServices.getShowingBrand());
  const { t } = useTranslation()

  return (
    <>
      <Layout>
        <div className="min-h-screen">
          <StickyCart />
          <div className="bg-white">
            <div className="mx-auto py-5 max-w-screen-2xl px-3 sm:px-10">
              <div className="flex w-full">
                <div className="flex-shrink-0 xl:pr-6 lg:block w-full lg:w-3/5">
                  <MainCarousel />
                </div>
                <div className="w-full hidden lg:flex">
                  <OfferCard />
                </div>
              </div>
              <div className="bg-orange-100 px-10 py-6 rounded-lg mt-6 hidden lg:block">
                <Banner />
              </div>
            </div>
          </div>

          {/* feature category's */}
          <div className="bg-gray-100 lg:py-16 py-10">
            <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
              <div className="mb-10 flex justify-center">
                <div className="text-center w-full lg:w-2/5">
                  <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                    {t('home:fc1')}
                  </h2>
                  <p className="text-base font-sans text-gray-600 leading-6">
                    {t('home:fc2')}
                  </p>
                </div>
              </div>
              <FeatureCategory />
            </div>
          </div>

          {/* popular products */}
          <div className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
            <div className="mb-10 flex justify-center">
              <div className="text-center w-full lg:w-2/5">
                <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                  {t('home:pp1')}
                </h2>
                <p className="text-base font-sans text-gray-600 leading-6">
                  {t('home:pp2')}
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                  {popularProducts?.slice(0, 18).map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* promotional banner card */}
          <div className="block mx-auto max-w-screen-2xl">
            <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
              <div className="lg:p-16 p-6 bg-emerald-500 shadow-sm border rounded-lg">
                <CardTwo />
              </div>
            </div>
          </div>

          {/* discounted products */}
          <div
            id="discount"
            className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10"
          >
            <div className="mb-10 flex justify-center">
              <div className="text-center w-full lg:w-2/5">
                <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                  {t('home:dp1')}
                </h2>
                <p className="text-base font-sans text-gray-600 leading-6">
                  {t('home:dp2')}
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                  {discountProducts?.slice(0, 18).map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* category products */}
          {error ? (
            <p className="flex justify-center align-middle items-center m-auto text-xl text-red-500">
              <span> {error}</span>
            </p>
          ) : (
            <div className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
              <div className="mb-10 flex justify-center">
                <div className="text-center w-full lg:w-2/5">
                  <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                    {t('home:cp1')}
                  </h2>
                  <p className="text-base font-sans text-gray-600 leading-6">
                    {t('home:cp2')}
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-full">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                    {data?.slice(0, 10).map((product) => (
                      <CatProdCard key={product._id} product={product} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* brands products */}
          {error ? (
            <p className="flex justify-center align-middle items-center m-auto text-xl text-red-500">
              <span> {errors}</span>
            </p>
          ) : (
            <div className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
              <div className="mb-10 flex justify-center">
                <div className="text-center w-full lg:w-2/5">
                  <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                  {t('home:bp1')}
                  </h2>
                  <p className="text-base font-sans text-gray-600 leading-6">
                  {t('home:bp2')}
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-full">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                    {datas.map((products) => (
                      <BrandCard key={products._id} products={products} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </Layout>
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  const products = await ProductServices.getShowingProducts();

  const popularProducts = products.filter((p) => p.discount === 0);
  const discountProducts = products.filter((p) => p.discount >= 5);

  return {
    props: {
      products: products,
      popularProducts: popularProducts.slice(0, 50),
      discountProducts: discountProducts,
      ...(await serverSideTranslations(locale, ['home', 'common', 'navbarpromo', 'about']))
    },
    revalidate: 60,
  };
};

export default Home;
