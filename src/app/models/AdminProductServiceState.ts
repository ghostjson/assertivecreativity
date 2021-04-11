import { FormGroup } from '@angular/forms';
import { Category } from './Category';
import { CustomProduct, ProductVariant, StockProduct } from './Product';

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
  activeVariantConfig?: ProductVariant;
  activeVariantForm?: FormGroup;
  activeVariantIndex?: number;
}
