import { FormGroup } from '@angular/forms';
import { Category } from './Category';
import { CustomProduct, ProductAttribute, StockProduct } from './Product';

export interface AdminProductServiceState {
  activeProduct: ActiveProductState;
  stockProducts: StockProduct[];
  stockProductCategories: Category[];
  customProducts: CustomProduct[];
  customProductCategories: Category[];
  featuredProducts: (StockProduct | CustomProduct)[];
}

export interface ActiveProductState {
  productConfig?: CustomProduct | StockProduct;
  productForm?: FormGroup;
  activeAttrConfig?: ProductAttribute;
  activeAttrForm?: FormGroup;
  activeAttrIndex?: number;
}
