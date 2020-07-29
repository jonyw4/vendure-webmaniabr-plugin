import { CustomFields } from '@vendure/core';
import Product from './Product';
import Order from './Order';
import Address from './Address';

const CustomFields: CustomFields = {
  Product,
  Order,
  Address
};

export default CustomFields;
