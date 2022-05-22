import requests from './httpServices';

const BrandServices = {
  getShowingBrand() {
    return requests.get('/brand/show');
  },
};

export default BrandServices;
