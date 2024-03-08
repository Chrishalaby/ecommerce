import { Product } from '@Modules/admin/components/new-product/shared/product.model';

export interface PostProductProps {
  product: Product;
}

export interface PatchProductProps {
  id: number;
  productUpdate: Partial<Product>;
}

export interface GetProductProps {
  id: number;
}

export interface DeleteProductProps {
  id: number;
}

export interface DeleteProductSuccessProps {
  id: number;
}

export interface GetProductSuccessProps {
  product: Product;
}

export interface GetProductListSuccessProps {
  products: Product[];
}
