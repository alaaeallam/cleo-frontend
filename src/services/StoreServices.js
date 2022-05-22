import requests from './httpServices';

const StoreServices = {
    getShowingStore() {
        return requests.get('/store/show');
    },
};

export default StoreServices;