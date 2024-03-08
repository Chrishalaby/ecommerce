import { Product } from '@Modules/admin/components/new-product/shared/product.model';

export interface ProductState {
  productPending: boolean;
  product: Product | null;
  productes: Product[];
}
