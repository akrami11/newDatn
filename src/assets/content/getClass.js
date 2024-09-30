import User from '~/assets/db/tables/user';
import Customer from '~/assets/db/tables/customer';
import Bill from '~/assets/db/tables/bill';
import Order from '~/assets/db/tables/order';
import LightNovel from '~/assets/db/tables/lightnovel';
import Product from '~/assets/db/tables/product';
import Productor from '~/assets/db/tables/productor';
const getClass = (page, data) => {
  switch (page) {
    case 'user':
      if (data) {
        return new User(data);
      } else return new User();
    case 'customer':
      if (data) {
        return new Customer(data);
      } else return new Customer();
    case 'bill':
      if (data) {
        return new Bill(data);
      } else return new Bill();
    case 'order':
      if (data) {
        return new Order(data);
      } else return new Order();
    case 'lightnovel':
      if (data) {
        return new LightNovel(data);
      } else return new LightNovel();
    case 'product':
      if (data) {
        return new Product(data);
      } else return new Product();
    case 'productor':
      if (data) {
        return new Productor(data);
      } else return new Productor();
    // case 'civilID':
    //   if (level >= 2) return false;
    //   else return true;
    // case 'salary':
    //   if (level >= 2) return false;
    //   else return true;
    // case 'shift':
    //   if (level >= 2) return false;
    //   else return true;
    default:
      return null;
  }
};
export default getClass;
