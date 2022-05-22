//internal import
import Layout from '@layout/Layout';
import Stores from '@component/store/Stores';
import PageHeader from '@component/header/PageHeader';

const Store = () => {
    return (
        <Layout title="Offer" description="this is discount page">
            <PageHeader title="Shop By Store Products" />
            <div className="mx-auto max-w-screen-2xl px-4 py-10 lg:py-20 sm:px-10">
                <div className="grid gap-2 grid-cols-1 xl:grid-cols-2">
                    <Stores />
                </div>
            </div>
        </Layout>
    );
};

export default Store